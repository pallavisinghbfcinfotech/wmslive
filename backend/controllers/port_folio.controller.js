import db from '../config.js';
import async from 'async';
//import promise from 'promise';
import mongoose from 'mongoose';
import moment from 'moment';
import cors from 'cors';
import Axios from 'axios';
//var db = require("../config.js");
// var async = require('async');
// var promise = require("promise");
// var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var moment = require('moment');
// //var Loader = require("../../src/components/Admin/loader.js");

// var cors = require('cors');
// const Axios = require("axios");

var operationsCompleted = 0; let dataarr = []; var user = []; let datascheme = [];
var doc = ""; var lastarray = []; var newarray = [];

const port_folio_data = function (port_folio_data) {

};

  port_folio_data.portfolio = (req, res) => {
    try {
        var resdata = "";
        pipeline1 = [  //trans_cams
            { $match: { PAN: req.body.pan, INV_NAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
            { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", FOLIO_NO: "$FOLIO_NO" } } },
            { $project: { _id: 0, NAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", FOLIO: "$_id.FOLIO_NO", RTA: "CAMS" } }
        ]
        pipeline2 = [  //trans_karvy
            { $match: { PAN1: req.body.pan, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
            { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TD_ACNO: "$TD_ACNO" } } },
            { $project: { _id: 0, NAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", FOLIO: "$_id.TD_ACNO", RTA: "KARVY" } }
        ]
        pipeline3 = [   //trans_franklin
            { $match: { IT_PAN_NO1: req.body.pan, INVESTOR_2: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
            { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", FOLIO_NO: "$FOLIO_NO" } } },
            { $project: { _id: 0, NAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", FOLIO: "$_id.FOLIO_NO", RTA: "FRANKLIN" } }
        ]


        db.collection('trans_cams').aggregate(pipeline1, (err, data1) => {
            db.collection('trans_karvy').aggregate(pipeline2, (err, data2) => {
                db.collection('trans_franklin').aggregate(pipeline3, (err, data3) => {
                    var i = 0;
                    if (data2.length != 0) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            if (data1.length != 0 || data2.length != 0 || data3.length != 0) {
                                resdata = {
                                    status: 200,
                                    message: 'Successfull',
                                    data: data3
                                }
                                let merged = data1.concat(data2.concat(data3));
                                var removeduplicates = Array.from(new Set(merged));
                                datacon = removeduplicates.map(JSON.stringify)
                                    .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                    .filter(function (item, index, arr) {
                                        return arr.indexOf(item, index + 1) === -1;
                                    }) // check if there is any occurence of the item in whole array
                                    .reverse()
                                    .map(JSON.parse);
                                datacon = datacon.filter(
                                    (temp => a =>
                                        (k => !temp[k] && (temp[k] = true))(a.SCHEME + '|' + a.FOLIO)
                                    )(Object.create(null))
                                );
                                let a = [];
                                // for (var ii = 0; ii < datacon.length; ii++) {
                                //   //  if (datascheme.indexOf(datacon[ii].SCHEME) == -1) {
                                //         datascheme.push(datacon[ii].SCHEME);
                                //    // }
                                // }

                                const secondquery = async function (rta, scheme, pan, folio, name) {
                                    if (rta === "CAMS") {
                                        var rescams = await showcams(scheme, pan, folio, name);
                                        dataarr.push(rescams);
                                    } else if (rta === "KARVY") {
                                        var reskarvy = await showkarvy(scheme, pan, folio, name);
                                        datascheme.push(scheme);
                                        // dataarr.push(reskarvy);

                                        dataarr = reskarvy;


                                    } else {
                                        var resfrank = await showfranklin(scheme, pan, folio, name);
                                        dataarr.push(resfrank);
                                    }

                                }

                                const maindatacall = async function () {

                                    for (var i = 0; i < datacon.length; i++) {
                                        await secondquery(datacon[i].RTA, datacon[i].SCHEME, datacon[i].PAN, datacon[i].FOLIO, datacon[i].NAME);

                                    }
                                    //console.log("scheme",dataarr)

                                    var unit = 0; var amount = 0; var days = 0; var date1 = ""; var date2 = ""; var arrunit = [];
                                    var arrpurchase = []; var sum1 = []; var sum2 = []; var arrdays = []; var alldays = []; var navrate = 0;
                                    var temp1, temp2 = 0; var temp3 = 0; var temp4 = 0;  var cnav = 0;var temp222=0;var finalarr=[];
                                    var temp44=0;

                                    dataarr = dataarr.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime());
                                    dataarr = dataarr.sort((a, b) => (a.SCHEME > b.SCHEME) ? 1 : -1);
                                    console.log(dataarr)
                                   // if(dataarr !=0)
                                    for (var i = 0; i < dataarr.length; i++) {
                                        var currentval = 0;var balance = 0;
                                        if (dataarr[i]['NATURE'] === "Redemption" || dataarr[i]['NATURE'] === "RED" ||
                                            dataarr[i]['NATURE'] === "SIPR" || dataarr[i]['NATURE'] === "Full Redemption" ||
                                            dataarr[i]['NATURE'] === "Partial Redemption" || dataarr[i]['NATURE'] === "Lateral Shift Out" ||
                                            dataarr[i]['NATURE'] === "Switchout" || dataarr[i]['NATURE'] === "Transfer-Out" ||
                                            dataarr[i]['NATURE'] === "Transmission Out" || dataarr[i]['NATURE'] === "Switch Over Out" ||
                                            dataarr[i]['NATURE'] === "LTOP" || dataarr[i]['NATURE'] === "LTOF" || dataarr[i]['NATURE'] === "FULR" ||
                                            dataarr[i]['NATURE'] === "Partial Switch Out" || dataarr[i]['NATURE'] === "Full Switch Out" ||
                                            dataarr[i]['NATURE'] === "IPOR" || dataarr[i]['NATURE'] === "FUL" ||
                                            dataarr[i]['NATURE'] === "STPO" || dataarr[i]['NATURE'] === "SWOF" ||
                                            dataarr[i]['NATURE'] === "SWD") {
                                            dataarr[i]['NATURE'] = "Switch Out";
                                        }
                                        if (dataarr[i]['NATURE'].match(/Systematic Investment.*/) ||
                                        dataarr[i]['NATURE'] === "SIN" ||
                                        dataarr[i]['NATURE'].match(/Systematic - Instalment.*/) ||
                                        dataarr[i]['NATURE'].match(/Systematic - To.*/) ||
                                        dataarr[i]['NATURE'].match(/Systematic-NSE.*/) ||
                                        dataarr[i]['NATURE'].match(/Systematic Physical.*/) ||
                                        dataarr[i]['NATURE'].match(/Systematic.*/) ||
                                        dataarr[i]['NATURE'].match(/Systematic-Normal.*/) ||
                                        dataarr[i]['NATURE'].match(/Systematic (ECS).*/)) {
                                            dataarr[i]['NATURE'] = "SIP";
                                    }
                                    if (dataarr[i]['NATURE'] === "ADDPUR" || dataarr[i]['NATURE'] === "Additional Purchase" || dataarr[i]['NATURE'] === "NEW" || dataarr[i]['NATURE'] === "ADD") {
                                        dataarr[i]['NATURE'] = "Purchase";
                                    }
                                    if (dataarr[i]['NATURE'] === "Switch In" || dataarr[i]['NATURE'] === "LTIA" || 
                                    dataarr[i]['NATURE'] === "LTIN") {
                                        dataarr[i]['NATURE'] = "Switch In";
                                    }
                                           if (datascheme.indexOf(dataarr[i].SCHEME) != -1) {
                                                if (Math.sign(dataarr[i].UNITS) != -1) {
                                                    if (dataarr[i].NATURE === "Switch Out")
                                                        for (var jj = 0; jj < arrunit.length; jj++) {

                                                            if (arrunit[jj] === 0)
                                                                arrunit.shift();
                                                            if (arrpurchase[jj] === 0)
                                                                arrpurchase.shift();
                                                            if (arrdays[jj] === 0)
                                                                arrdays.shift();
                                                            if (alldays[jj] === 0)
                                                                alldays.shift();
                                                            if (sum1[jj] === 0)
                                                                sum1.shift();
                                                            if (sum2[jj] === 0)
                                                                sum2.shift();
                                                        }
                                                }

                                                if (dataarr[i].NATURE != 'Switch Out' && dataarr[i].UNITS != 0) {

                                                    unit = dataarr[i].UNITS
                                                    amount = dataarr[i].AMOUNT;
                                                    var date = dataarr[i].TD_TRDT;
                                                    var navdate = dataarr[i].navdate;

                                                    var d = new Date(date.split("-").reverse().join("-"));
                                                    var dd = d.getDate();
                                                    var mm = d.getMonth() + 1;
                                                    var yy = d.getFullYear();
                                                    var newdate = mm + "/" + dd + "/" + yy;


                                                    var navd = new Date(navdate);
                                                    var navdd = navd.getDate();
                                                    var navmm = navd.getMonth() + 1;
                                                    var navyy = navd.getFullYear();
                                                    var newnavdate = navmm + "/" + navdd + "/" + navyy;
                                                    date1 = new Date(newdate);
                                                    date2 = new Date(newnavdate);
                                                    days = moment(date2).diff(moment(date1), 'days');
                                                    arrunit.push(dataarr[i].UNITS);
                                                    arrpurchase.push(dataarr[i].UNITS * dataarr[i].TD_NAV);
                                                    //sum1(purchase cost*days*cagr)
                                                    if (days === 0) {
                                                        sum1.push(0);
                                                        arrdays.push(0);
                                                        alldays.push(0);
                                                        sum2.push(0);
                                                    } else {
                                                        arrdays.push(parseFloat(days) * dataarr[i].UNITS * parseFloat(dataarr[i].TD_NAV));
                                                        alldays.push(parseFloat(days));
                                                        //   console.log("rrrr=",arrdays,days,(res2.data[n].UNITS * parseFloat(res2.data[n].TD_NAV)),res2.data[n].SCHEME);
                                                        
                                                        sum1.push(parseFloat(dataarr[i].UNITS * dataarr[i].TD_NAV) * parseFloat(days) * parseFloat((parseFloat(Math.pow(parseFloat((dataarr[i].cnav * dataarr[i].UNITS) / (dataarr[i].UNITS * dataarr[i].TD_NAV)), parseFloat(1 / parseFloat(days / 365)))) - 1) * 100));
                                                        sum2.push(parseFloat(dataarr[i].UNITS * dataarr[i].TD_NAV) * parseFloat(days));
                                                    }

                                                    temp1 = dataarr[i].UNITS;
                                                    temp2 = temp1 + temp2;
                                                    navrate = dataarr[i].TD_NAV;

                                                } else {

                                                    unit = "-" + dataarr[i].UNITS
                                                    amount = "-" + dataarr[i].AMOUNT
                                                    if (temp4 != "") {
                                                        arrunit.splice(0, 0, temp4);
                                                    }
                                                    temp2 = dataarr[i].UNITS;

                                                    for (var p = 0; p < arrunit.length; p++) {
                                                        temp3 = arrunit[p];
                                                        rowval = p;
                                                        arrunit[p] = 0;
                                                        if (temp2 > temp3) {
                                                            arrpurchase[p] = 0;
                                                            arrdays[p] = 0;
                                                            alldays[p] = 0;
                                                            sum1[p] = 0;
                                                            sum2[p] = 0;
                                                            temp2 = parseFloat(temp2) - parseFloat(temp3);
                                                        } else {
                                                            temp4 = temp3 - temp2;
                                                            var len = dataarr.length - 1;
                                                            if (dataarr[len].NATURE === "SIP" || dataarr[len].NATURE === "Purchase" || dataarr[len].NATURE === "Switch In") {
                                                                arrpurchase[p] = temp4 * parseFloat(dataarr[p].TD_NAV);
                                                                // console.log("ggg=",arrpurchase[p],res2.data[p].SCHEME)
                                                                if (arrdays[p] === 0 || arrdays[p] === "undefined" || isNaN(arrdays[p])) {
                                                                    arrdays[p] = 0;
                                                                    alldays[p] = 0;
                                                                    sum1[p] = 0;
                                                                    sum2[p] = 0;
                                                                } else {
                                                                    arrdays[p] = parseFloat(alldays[p]) * parseFloat(temp4) * parseFloat(dataarr[p].TD_NAV);
                                                                    sum1[p] = parseFloat(temp4 * parseFloat(dataarr[p].TD_NAV)) * parseFloat(alldays[p]) * parseFloat((parseFloat(Math.pow(parseFloat((dataarr[p].cnav * temp4) / (temp4 * parseFloat(dataarr[p].TD_NAV))), parseFloat(1 / parseFloat(alldays[p] / 365)))) - 1) * 100);
                                                                    sum2[p] = parseFloat(temp4 * parseFloat(dataarr[p].TD_NAV)) * parseFloat(alldays[p]);
                                                                }
                                                            } else {

                                                                arrpurchase[p] = temp4 * parseFloat(navrate);

                                                                if (arrdays[p] === 0 || arrdays[p] === "undefined" || isNaN(arrdays[p])) {
                                                                    arrdays[p] = 0;
                                                                    alldays[p] = 0;
                                                                    sum1[p] = 0;
                                                                    sum2[p] = 0;
                                                                } else {
                                                                    arrdays[p] = parseFloat(alldays[p]) * temp4 * parseFloat(dataarr[p].TD_NAV);
                                                                    sum1[p] = parseFloat(temp4 * parseFloat(dataarr[p].TD_NAV)) * parseFloat(alldays[p]) * parseFloat((parseFloat(Math.pow(parseFloat((dataarr[p].cnav * temp4) / (temp4 * parseFloat(dataarr[p].TD_NAV))), parseFloat(1 / parseFloat(alldays[p] / 365)))) - 1) * 100);
                                                                    sum2[p] = parseFloat(temp4 * parseFloat(dataarr[p].TD_NAV)) * parseFloat(alldays[p])
                                                                }
                                                            }
                                                            
                                                            break;
                                                        }
                                                    }
                                                }
                                                  console.log("hhh=",arrpurchase[i],dataarr[i].SCHEME)
                                                balance = parseFloat(unit) + parseFloat(balance);
                                                cnav = dataarr[i].cnav;
                                                currentval = cnav * balance
                                                newarray.push(currentval)
                                                
                                               // console.log("cwwwwv=",currentval)
                                            }
                                            
                                            
                                    }
                                   
                                    temp22 = 0;      

                                    for (var p = 0; p < newarray.length; p++) {
                                        temp44 = newarray[p] + temp44;
                                         }
                                    for (var k = 0; k < arrpurchase.length; k++) {
                                      temp33 = Math.round(arrpurchase[k]);
                                      temp22 = temp33 + temp22;
                                      temp222 = Math.round(arrdays[k]) + temp222;
                                      
                                   
                                    }
                                    var sum1all =0;var sum2all=0;
                                     for (var kk = 0; kk < sum1.length; kk++) {
                                      sum1all = sum1[kk] + sum1all;
                                       }
                                       for (var kkk = 0; kkk < sum2.length; kkk++) {
                                        sum2all = sum2[kkk] + sum2all;
                                         }

                                         cagr=sum1all/sum2all;
                                         finalarr.push({purchasevalue:temp22,currentvalue:temp44,cagr:cagr})
                                    console.log("purchase=",finalarr)
                                    resdata = {
                                        status: 200,
                                        message: "Successfull",
                                        data: cagr
                                    }
                                    resdata.data =finalarr;
                                 res.json(resdata);
                                }

                                maindatacall();




                            } else {
                                resdata = {
                                    status: 400,
                                    message: 'Data not found',
                                }
                            }
                        }
                    }
                });
            });
        });
    } catch (err) {
        console.log(err)
    }
}

async function showkarvy(scheme, pan, folio, name) {
    try {
        const pipeline5 = [  //trans_karvy    "TD_TRTYPE":{$not: /^SINR.*/
            { $match: { FUNDDESC: scheme, PAN1: pan, TD_ACNO: folio, INVNAME: { $regex: `^${name}.*`, $options: 'i' } } },
            { $group: { _id: { TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_NAV: "$TD_NAV", TD_TRTYPE: "$TD_TRTYPE", NAVDATE: "$NAVDATE", SCHEMEISIN: "$SCHEMEISIN" }, TD_UNITS: { $sum: "$TD_UNITS" }, TD_AMT: { $sum: "$TD_AMT" } } },
            { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
            { $unwind: "$nav" },
            { $project: { _id: 0, FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", TD_NAV: "$_id.TD_NAV", NATURE: "$_id.TD_TRTYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.NAVDATE" } }, ISIN: "$_id.SCHEMEISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: { $sum: "$TD_UNITS" }, AMOUNT: { $sum: "$TD_AMT" } } },
            { $sort: { TD_TRDT: -1 } }
        ]

        let cursor = db.collection('trans_karvy').aggregate(pipeline5);
        while (await cursor.hasNext()) {
            doc = await cursor.next();

            lastarray.push(doc);

        };
        return lastarray;
        // console.log("dataarr=",dataarr.length)
        // db.collection('trans_karvy').aggregate(pipeline5, (err, karvy) => {
        //     console.log("karvy=",karvy)
        //     return karvy;
        // });
    } catch (err) {
        console.log(err)
    }
};

// function randomSleep(ms, seed = 10) {
//     ms = ms * Math.random() * seed;
//     return new Promise((resolve, reject) => setTimeout(resolve, ms));
// }
async function showcams(scheme, pan, folio, name) {
    try {
        pipeline4 = [  //trans_cams
            { $match: { SCHEME: scheme, PAN: pan, FOLIO_NO: folio, INV_NAME: { $regex: `^${name}.*`, $options: 'i' } } },
            { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", PURPRICE: "$PURPRICE", TRXN_TYPE_: "$TRXN_TYPE_", TRADDATE: "$TRADDATE", AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $substr: ["$PRODCODE", { $strLenCP: "$AMC_CODE" }, -1] } }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
            {
                $lookup:
                {
                    from: "products",
                    let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$PRODUCT_CODE", "$$ccc"] },
                                            { $eq: ["$AMC_CODE", "$$amc"] }
                                        ]
                                }
                            }
                        },
                        { $project: { _id: 0 } }
                    ],
                    as: "products"
                }
            },

            { $unwind: "$products" },
            { $group: { _id: { FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", PURPRICE: "$_id.PURPRICE", TRXN_TYPE_: "$_id.TRXN_TYPE_", TRADDATE: "$_id.TRADDATE", ISIN: "$products.ISIN" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
            { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
            { $unwind: "$nav" },
            { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", TD_NAV: "$_id.PURPRICE", NATURE: "$_id.TRXN_TYPE_", TD_TRDT: { $dateToString: { format: "%m/%d/%Y", date: "$_id.TRADDATE" } }, ISIN: "$products.ISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
            { $sort: { TD_TRDT: -1 } }
        ]
        let cursor = db.collection('trans_cams').aggregate(pipeline4);
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            //dataarr.push(doc);
            return doc;
        };
    } catch (err) {
        console.log(err)
    }
};



async function showfranklin(scheme, pan, folio, name) {
    try {
        pipeline6 = [  //trans_franklin  
            { $match: { SCHEME_NA1: scheme, IT_PAN_NO1: pan, FOLIO_NO: folio, INVESTOR_2: { $regex: `^${name}.*`, $options: 'i' } } },
            { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", NAV: "$NAV", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", ISIN: "$ISIN" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
            { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
            { $unwind: "$nav" },
            { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", TD_NAV: "$_id.NAV", NATURE: "$_id.TRXN_TYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, ISIN: "$_id.ISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
            { $sort: { TD_TRDT: -1 } }
        ]
        let cursor = db.collection('trans_franklin').aggregate(pipeline6);
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            //dataarr.push(doc);
            return doc;
        };
    } catch (err) {
        console.log(err)
    }
};

module.exports = port_folio_data;

