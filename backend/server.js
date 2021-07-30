import express from 'express';
import dotenv from 'dotenv';
 import config from './config.js';
// import db from './config.js';
 import mongoose from 'mongoose';
 import path from 'path';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import localStorage from 'localStorage'
import Axios from 'axios'
import moment from 'moment';
import MongoData from 'mongodb';

var Schema = mongoose.Schema;
// dotenv.config();
var MongoClient = MongoData.MongoClient;
 const mongodbUrl= config.MONGODB_URL;
mongoose.Promise = global.Promise;

// var db = 
// MongoClient.connect("mongodb+srv://developer:developer@cluster0.jxhzj.mongodb.net/wms", { useNewUrlParser: true , useUnifiedTopology: true, promiseLibrary: global.Promise } , function(err, db){
//    if(err){ console.log('Failed to connect to ' + db); }
//    //else{ console.log('Connected to ' + db, ' + ', response); }
//    else{ console.log('Connected to ' + db); }
// });

var url = "mongodb+srv://developer:developer@cluster0.jxhzj.mongodb.net/wms?authSource=admin&replicaSet=atlas-ded6sd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };

//  console.log("I am mongodb", db);
mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	promiseLibrary: global.Promise,
	//useCreateIndex:true,
	autoIndex: false, // Don't build indexes
	//useMongoClient: true,
// 	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
// 	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0
}).catch(error => console.log(error.reason));

console.log("Test data ",mongoose.collection);

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to WMS Api application." });
});


const navcams = new Schema({
    SchemeCode: { type: String },
    ISINDivPayoutISINGrowth: { type: String },
    ISINDivReinvestment: { type: String },
    SchemeName: { type: String ,required: true},
    NetAssetValue: { type: Number },
    Date: { type: Date },
}, { versionKey: false });


const productdata = new Schema({
    id: { type: String },
    product_master_diffgr_id: { type: String },
    msdata_rowOrder: { type: String },
    AMC_CODE: { type: String },
    PRODUCT_CODE: { type: String },
    PRODUCT_LONG_NAME: { type: String },
    SYSTEMATIC_FREQUENCIES:{ type: String },
    SIP_DATES: { type: String },
    STP_DATES: { type: String },
    SWP_DATES: { type: String },
    PURCHASE_ALLOWED: { type: String },
    SWITCH_ALLOWED: { type: String },
    REDEMPTION_ALLOWED: { type: String },
    SIP_ALLOWED: { type: String },
    STP_ALLOWED: { type: String },
    SWP_ALLOWED: { type: String },
    REINVEST_TAG: { type: String },
    PRODUCT_CATEGORY: { type: String },
    ISIN: { type: String },
    LAST_MODIFIED_DATE: { type: String },
    ACTIVE_FLAG: { type: String },
    ASSET_CLASS: { type: String },
    SUB_FUND_CODE: { type: String },
    PLAN_TYPE: { type: String },
    INSURANCE_ENABLED: { type: String },
    RTACODE: { type: String },
    NFO_ENABLED: { type: String },
    NFO_CLOSE_DATE: { type: String },
    NFO_SIP_EFFECTIVE_DATE: { type: String },
    ALLOW_FREEDOM_SIP: { type: String },
    ALLOW_FREEDOM_SWP: { type: String },
    ALLOW_DONOR: { type: String },
    ALLOW_PAUSE_SIP: { type: String },
    ALLOW_PAUSE_SIP_FREQ: { type: String },
    PAUSE_SIP_MIN_MONTH: { type: String },
    PAUSE_SIP_MAX_MONTH: { type: String },
    PAUSE_SIP_GAP_PERIOD: { type: String },
}, { versionKey: false });

const foliocams = new Schema({
    AMC_CODE: { type: String },
    FOLIOCHK: { type: String },
    INV_NAME: { type: String },
    SCH_NAME: { type: String },
    JNT_NAME1: { type: String },
    JNT_NAME2: { type: String },
    HOLDING_NATURE: { type: String },
    PAN_NO: { type: String },
    JOINT1_PAN: { type: String },
    BANK_NAME: { type: String },
    AC_NO: { type: String },
    NOM_NAME: { type: String },
    NOM2_NAME: { type: String },
    NOM3_NAME: { type: String },
    IFSC_CODE: { type: String },
    PRODUCT: {type: String},
}, { versionKey: false });


const foliokarvy = new Schema({
    FUNDDESC: { type: String },
    ACNO: { type: String },
    INVNAME: { type: String },
    JTNAME1: { type: String },
    JTNAME2: { type: String },
    BNKACNO: { type: String },
    BNAME: { type: String },
    PANGNO: { type: String },
    NOMINEE: { type: String },
    PRCODE: { type: String},
    FUND: { type : String},
    BNKACTYPE : { type: String},
}, { versionKey: false });

const foliofranklin = new Schema({
    BANK_CODE: { type: String },
    IFSC_CODE: { type: String },
    NEFT_CODE: { type: String },
    NOMINEE1: { type: String },
    FOLIO_NO: { type: String },
    INV_NAME: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    BANK_NAME: { type: String },
    ACCNT_NO: { type: String },
    D_BIRTH: { type: String },
    F_NAME: { type: String },
    PHONE_RES: { type: String },
    PANNO1: { type: String },
    COMP_CODE : { type: String },
    AC_TYPE : { type: String },
    KYC_ID :{ type: String },
    HOLDING_T6 : { type: String },
    PBANK_NAME : { type: String },
    PERSONAL_9 : { type: String },
}, { versionKey: false });

const transcams = new Schema({
    AMC_CODE: { type: String },
    FOLIO_NO: { type: String },
    PRODCODE: { type: String },
    SCHEME: { type: String },
    INV_NAME: { type: String }, 
    TRXNNO: {type: String },
    TRADDATE: { type: Date },   
    UNITS: { type: Number },
    AMOUNT: { type: Number },
    TRXN_NATUR: { type: String },
    SCHEME_TYP: { type: String },
    PAN: { type: String },
    TRXN_TYPE_: { type: String },   
    AC_NO: { type: String } ,
    BANK_NAME: { type: String } ,
}, { versionKey: false });

const transkarvy = new Schema({
    FMCODE: { type: String },
    TD_ACNO: { type: String },
    FUNDDESC: { type: String },
    TD_TRNO: { type: String },
    SMCODE: { type: String },
    INVNAME: { type: String },
    TD_TRDT: { type: Date },
    TD_POP: { type: String },
    TD_AMT: { type: Number },
    TD_APPNO: { type: String },
    UNQNO: { type: String },
    TD_NAV: { type: String },
    IHNO: { type: String },
    BRANCHCODE: { type: String },
    TRDESC: { type: String },
    PAN1: { type: String },
    ASSETTYPE:{ type: String},
    TD_UNITS: { type: Number},
    SCHEMEISIN:{ type: String},
    TD_FUND:{ type: String},
    TD_TRTYPE: { type : String},
    NEWUNQNO: {type : String},
}, { versionKey: false });


const transfranklin = new Schema({
    COMP_CODE: { type: String },
    SCHEME_CO0: { type: String },
    SCHEME_NA1: { type: String },
    FOLIO_NO: { type: String },
    TRXN_TYPE: { type: String },
    TRXN_NO: { type: String },
    INVESTOR_2: { type: String },
    TRXN_DATE: { type: Date},
    NAV: { type: Number },
    POP: { type: String },
    UNITS: { type: Number },
    AMOUNT: { type: Number },
    ADDRESS1: { type: String },
    IT_PAN_NO1: { type: String },
    ISIN: { type: String },
    JOINT_NAM1: { type: String },
    JOINT_NAM2: { type: String },
    PLAN_TYPE: { type: String },
    NOMINEE1: { type: String },
    ACCOUNT_16: { type: String },
    PBANK_NAME: { type: String },
    PERSONAL23: { type: String},
}, { versionKey: false });

const members = new Schema({
    memberPan: { type: String },
    adminPan: { type: String },
    memberRelation: { type: String },
}, { versionKey: false });


  var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
  var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
  var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');  
  var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams'); 
  var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');  
  var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
  var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');  
  var family = mongoose.model('familymember', members, 'familymember');
  var data="";var karvydata="";var camsdata="";var frankdata="";var datacon="";
var i=0;var resdata="";var foliokarvydata="";var foliocamsdata="";var foliofranklindata="";
var pipeline="";var pipeline1="";var pipeline2="";var pipeline3="";
var foliokarvydata="";var foliocamsdata="";var foliofranklindata="";
var db;

app.post("/api/portfolio_api_data", function (req, res) {
 	mongoose.connect(mongodbUrl, { useNewUrlParser: true } , function(err, db){
//	MongoClient.connect(mongodbUrl, function(err, db) {
		//db = db.db("wms");
		console.log("db=",db.models);
    var operationsCompleted = 0; let dataarr = []; var user = []; let datascheme = [];
    var doc = ""; var lastarray = []; var newarray = [];
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


        //var db = db.db("wms");
        transc.aggregate(pipeline1, (err, data1) => {
            transk.aggregate(pipeline2, (err, data2) => {
                transf.aggregate(pipeline3, (err, data3) => {
                    //if (err) throw err;
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
                                const secondquery = async function (rta, scheme, pan, folio, name) {
                                    if (rta === "CAMS") {
                                        var rescams = await showcams(scheme, pan, folio, name);
                                        dataarr.push(rescams);
                                    } else if (rta === "KARVY") {
                                        var reskarvy = await showkarvy(scheme, pan, folio, name);
                                        datascheme.push(folio);
                               
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
                                    var unit = 0; var amount = 0; var days = 0; var date1 = ""; var date2 = ""; var arrunit = [];
                                    var arrpurchase = []; var sum1 = []; var sum2 = []; var arrdays = []; var alldays = []; var navrate = 0;
                                    var temp1, temp2 = 0; var temp3 = 0; var temp4 = 0; var cnav = 0; var temp222 = 0; var finalarr = [];
                                    var temp44 = 0;

                                    dataarr = dataarr.sort((a, b) => new Date(a.TD_TRDT.split("-").reverse().join("/")).getTime() - new Date(b.TD_TRDT.split("-").reverse().join("/")).getTime());
                                    dataarr = dataarr.sort((a, b) => (a.FOLIO > b.FOLIO) ? 1 : -1);

                                    for (var i = 0; i < dataarr.length; i++) {
                                        var currentval = 0; var balance = 0;

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
                                        console.log(dataarr[i])
                                        if (datascheme.indexOf(dataarr[i].FOLIO) != -1) {
                                            if (dataarr[i].FOLIO === datascheme[datascheme.indexOf(dataarr[i].FOLIO)]) {
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

                                                                arrpurchase[p] = temp4 * parseFloat(dataarr[p].TD_NAV);

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
                                             
                                                balance = parseFloat(unit) + parseFloat(balance);
                                                cnav = dataarr[i].cnav;
                                                currentval = cnav * balance
                                                newarray.push(currentval)
                                            }
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
                                    var sum1all = 0; var sum2all = 0;
                                    for (var kk = 0; kk < sum1.length; kk++) {
                                        sum1all = sum1[kk] + sum1all;
                                    }
                                    for (var kkk = 0; kkk < sum2.length; kkk++) {
                                        sum2all = sum2[kkk] + sum2all;
                                    }

                                    cagr = sum1all / sum2all;
                                    finalarr.push({ purchasecost: Math.round(temp22), currentvalue: Math.round(temp44), cagr: Math.round(cagr) })
                                   
                                    resdata = {
                                        status: 200,
                                        message: "Successfull",
                                        data: cagr
                                    }
                                    resdata.data = finalarr;
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
        })
        //})
    } catch (err) {
        console.log(err)
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
	
// 		MongoClient.connect(config.MONGODB_URL, function(err, db) {
// 			    let cursor = db.collection('trans_karvy').aggregate(pipeline5);
// 				while (cursor.hasNext()) {
// 				doc = cursor.next();
// 				lastarray.push(doc);
// 			    };
// 				return lastarray;
// 			})
          
	  let cursor =mongoose.model('trans_karvy', transkarvy, 'trans_karvy').aggregate(pipeline5);
             while (await cursor.hasNext()) {
               doc = await cursor.next();
              lastarray.push(doc);
	     };
		return lastarray;
	  
        } catch (err) {
            console.log(err)
        }
    };

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
            let cursor = transc.aggregate(pipeline4);
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
            let cursor = transf.aggregate(pipeline6);
            while (await cursor.hasNext()) {
                const doc = await cursor.next();
                //dataarr.push(doc);
                return doc;
            };
        } catch (err) {
            console.log(err)
        }
    };
	});
})



app.post("/api/getAmcListHoldingNatureWise", function (req, res) {
    try {
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if (req.body.pan === ""){
            resdata = {
                status: 400,
                message: 'Please enter pan !',
            }
            res.json(resdata);
            return resdata;
        }else if(!regex.test(req.body.pan)) {
            resdata = {
                status: 400,
                message: 'Please enter valid pan !',
            }
            res.json(resdata);
            return resdata;
        }else if(req.body.holder_nature === "") {
            resdata = {
                status: 400,
                message: 'Please enter holding nature !',
            }
            res.json(resdata);
            return resdata;
         } else{
                if(req.body.holder_nature ==="SI"){
                    pipeline = [//folio_franklin
                        { $match: { PANNO1: req.body.pan,HOLDING_T6:"Single" } },
                        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", COMP_CODE: "$COMP_CODE" } } },
                        { $project: { _id: 0,folio: "$_id.FOLIO_NO",amc_code: "$_id.COMP_CODE" } },
                        { $sort: { amc_code: 1 } },
                    ]
                    pipeline1 = [  //folio_cams
                        { $match: { PAN_NO: req.body.pan ,HOLDING_NA:"SI"} },
                        { $group: { _id: { FOLIOCHK: "$FOLIOCHK", AMC_CODE: "$AMC_CODE" } } },
                        { $project: { _id: 0, folio: "$_id.FOLIOCHK", amc_code: "$_id.AMC_CODE", } },
                        { $sort: { amc_code: 1 } }
                    ]
                    pipeline2 = [ //folio_karvy
                        { $match: { PANGNO: req.body.pan, MODEOFHOLD:"SINGLE" } },
                        { $group: { _id: { ACNO: "$ACNO", FUND: "$FUND" } } },
                        { $project: { _id: 0, folio: "$_id.ACNO", amc_code: "$_id.FUND"  } },
                        { $sort: { amc_code: 1 } }
                    ]  
                    foliof.aggregate(pipeline, (err, newdata) => {
                        folioc.aggregate(pipeline1, (err, newdata1) => {
                            foliok.aggregate(pipeline2, (err, newdata2) => {
                                if (newdata2 != 0 || newdata1 != 0 || newdata != 0 ) {
                                    resdata = {
                                        status: 200,
                                        message: "Successfull",
                                        data: newdata2
                                    };
                               
                                var datacon = newdata.concat(newdata1.concat(newdata2));
                                datacon = datacon
                                    .map(JSON.stringify)
                                    .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                    .filter(function (item, index, arr) {
                                        return arr.indexOf(item, index + 1) === -1;
                                    }) // check if there is any occurence of the item in whole array
                                    .reverse()
                                    .map(JSON.parse);
        
                                for (var i = 0; i < datacon.length; i++) {
                                    //console.log(datacon[i]['amc_code']);
                                    if (datacon[i]['amc_code'] != "" && datacon[i]['folio'] != "" && datacon[i]['scheme'] != "") {
        
                                        resdata.data = datacon[i];
        
                                    }
                                }
                                resdata.data = datacon.sort((a, b) => (a.amc_code > b.amc_code) ? 1 : -1);
                                res.json(resdata);
                                return resdata;
                            }else{
                                resdata = {
                                    status: 400,
                                    message: "Data not found!"
                                };
                                res.json(resdata);
                                return resdata;
                            }
                            });
                        });
                    });
            } else{
                if (req.body.holder_pan1 === ""){
                    resdata = {
                        status: 400,
                        message: 'Please enter joint holder pan!',
                    }
                    res.json(resdata);
                    return resdata;
                }else if(!regex.test(req.body.holder_pan1)) {
                    resdata = {
                        status: 400,
                        message: 'Please enter valid joint holder pan!',
                    }
                    res.json(resdata);
                    return resdata;

                }else{
                    pipeline = [//trans_franklin
                        { $match: {$and: [{ IT_PAN_NO1: req.body.pan},{IT_PAN_NO2:req.body.holder_pan1} ] } },
                        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", COMP_CODE: "$COMP_CODE" } } },
                        { $project: { _id: 0,folio: "$_id.FOLIO_NO",amc_code: "$_id.COMP_CODE" } },
                        { $sort: { amc_code: 1 } },
                    ]
                    pipeline1 = [  //trans_cams
                        { $match: { PAN: req.body.pan } },
                        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", AMC_CODE: "$AMC_CODE" } } },
                        { $project: { _id: 0, folio: "$_id.FOLIO_NO", amc_code: "$_id.AMC_CODE", } },
                        { $sort: { amc_code: 1 } }
                    ]
                    pipeline2 = [ //trans_karvy
                        { $match: {$and: [ { PAN1: req.body.pan},{PAN2:req.body.holder_pan1} ]  } },
                        { $group: { _id: { TD_ACNO: "$TD_ACNO", TD_FUND: "$TD_FUND" } } },
                        { $project: { _id: 0, folio: "$_id.TD_ACNO", amc_code: "$_id.TD_FUND"  } },
                        { $sort: { amc_code: 1 } }
                    ]  
                    transf.aggregate(pipeline, (err, newdata) => {
                        transc.aggregate(pipeline1, (err, newdata1) => {
                            transk.aggregate(pipeline2, (err, newdata2) => {
                                if (newdata2 != 0 || newdata1 != 0 || newdata != 0 ) {
                                    resdata = {
                                        status: 200,
                                        message: "Successfull",
                                        data: newdata2
                                    };
                               
                                var datacon = newdata.concat(newdata1.concat(newdata2));
                                datacon = datacon
                                    .map(JSON.stringify)
                                    .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                    .filter(function (item, index, arr) {
                                        return arr.indexOf(item, index + 1) === -1;
                                    }) // check if there is any occurence of the item in whole array
                                    .reverse()
                                    .map(JSON.parse);
        
                                for (var i = 0; i < datacon.length; i++) {
                                    //console.log(datacon[i]['amc_code']);
                                    if (datacon[i]['amc_code'] != "" && datacon[i]['folio'] != "" && datacon[i]['scheme'] != "") {
        
                                        resdata.data = datacon[i];
        
                                    }
                                }
                                resdata.data = datacon.sort((a, b) => (a.amc_code > b.amc_code) ? 1 : -1);
                                res.json(resdata);
                                return resdata;
                            } else {
                                resdata = {
                                    status: 400,
                                    message: "Data not found!"
                                };
                                res.json(resdata);
                                return resdata;
                            }
                            });
                        });
                    });
                }
            }
           
        }
    } catch (err) {
        console.log(e)
    }
});


app.post("/api/isPANexist", function (req, res) {
    try {
        if (req.body.memberPan === "") {
            resdata = {
                status: 400,
                message: 'Please enter pan',
            }
            res.json(resdata)
            return resdata;
        } else {
            let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
            if (!regex.test(req.body.memberPan)) {
                resdata = {
                    status: 400,
                    message: 'Please enter valid pan',
                }
                res.json(resdata);
                return resdata;
            } else {
                foliok.find({ PANGNO: req.body.memberPan }, { _id: 0, EMAIL: 1 }, function (err, foliokarvydata) {
                    folioc.find({ PAN_NO: req.body.memberPan }, { _id: 0, EMAIL: 1 }, function (err, foliocamsdata) {
                        foliof.find({ PANNO1: req.body.memberPan }, { _id: 0, EMAIL: 1 }, function (err, foliofranklindata) {
                            if (foliokarvydata != "" || foliocamsdata != "" || foliofranklindata != "") {
                                resdata = {
                                    status: 200,
                                    message: 'Successful',
                                    data: foliofranklindata,
                                }
                                datacon = foliokarvydata.concat(foliocamsdata.concat(foliofranklindata));
                                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                    .reverse().map(JSON.parse);

                                res.json(resdata)
                                return resdata;
                            } else {
                                resdata = {
                                    status: 400,
                                    message: 'PAN not found!',
                                }
                                res.json(resdata)
                                return resdata;
                            }
                        });
                    });
                });
            }
        }
    } catch (err) {
        console.log(err)
    }
});

app.post("/api/userProfileMemberList", function (req, res) {
    try{
        var arr1=[];var arr2=[];var arr3=[];
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if(req.body.pan ===""){
            resdata = {
                status: 400,
                message: 'Please enter pan',
            }
            res.json(resdata);
            return resdata;
        }else if(!regex.test(req.body.pan)) {
            resdata = {
                status: 400,
                message: 'Please enter valid pan',
            }
            res.json(resdata);
            return resdata;
        }else{
            family.find({ adminPan:  {$regex : `^${req.body.pan}.*` , $options: 'i' }  },{_id:0,memberPan:1}, function (err, member) {
                if(member!=""){
                    member  = [...new Set(member.map(({memberPan}) => memberPan.toUpperCase()))];
                    arr1.push({PAN:req.body.pan.toUpperCase()});
                    arr2.push({PAN1:req.body.pan.toUpperCase()});
                    arr3.push({IT_PAN_NO1:req.body.pan.toUpperCase()});
                    for(var j=0;j<member.length;j++){     
                    arr1.push({PAN:member[j]}); 
                    arr2.push({PAN1:member[j]}); 
                    arr3.push({IT_PAN_NO1:member[j]});
                    }
                    var strPan = {$or:arr1};
                    var strPan1 = {$or:arr2};
                    var strPan2 = {$or:arr3};
     pipeline = [  ///trans_cams
        { $match: strPan},
        { $group: { _id: {PAN: "$PAN",  INV_NAME: "$INV_NAME", TAX_STATUS:"$TAX_STATUS",} } },
        { $lookup: { from: 'folio_cams', localField: '_id.PAN', foreignField: 'PAN_NO', as: 'detail' } },
        { $unwind: "$detail" },
        { $project: { _id: 0,PAN: "$_id.PAN",  INVNAME: { "$toUpper": ["$_id.INV_NAME"] } ,PER_STATUS:{ "$toUpper": ["$_id.TAX_STATUS" ] },JOINT_NAME1: { "$toUpper": ["$detail.JNT_NAME1"] },JOINT_NAME2: { "$toUpper": ["$detail.JNT_NAME2"] } } },     
    ]
     pipeline1 = [  ///trans_karvy
        { $match: strPan1},
        { $group: { _id: { PAN1: "$PAN1",  INVNAME: "$INVNAME" ,STATUS:"$STATUS" } } },
        { $lookup: { from: 'folio_karvy', localField: '_id.PAN1', foreignField: 'PANGNO', as: 'detail' } },
        { $unwind: "$detail" },
        { $project: { _id: 0,  PAN: "$_id.PAN1", INVNAME: { "$toUpper": ["$_id.INVNAME"] },PER_STATUS:{ "$toUpper": ["$_id.STATUS" ] },JOINT_NAME1: { "$toUpper": ["$detail.JTNAME1"] },JOINT_NAME2: { "$toUpper": ["$detail.JTNAME2"] } } },
       
    ]
     pipeline2 = [  ///trans_franklin
        { $match: strPan2},
        { $group: { _id: { IT_PAN_NO1: "$IT_PAN_NO1", INVESTOR_2:"$INVESTOR_2",SOCIAL_S18:"$SOCIAL_S18",JOINT_NAM1:"$JOINT_NAM1",JOINT_NAM2:"$JOINT_NAM2" } } },
        { $project: { _id: 0,PAN: "$_id.IT_PAN_NO1",  INVNAME: { "$toUpper": ["$_id.INVESTOR_2"] } ,PER_STATUS:{ "$toUpper": ["$_id.SOCIAL_S18"] },JOINT_NAME1:{ "$toUpper": ["$_id.JOINT_NAM1"] },JOINT_NAME2:{ "$toUpper": ["$_id.JOINT_NAM2"] } } },
       
    ]
    
   transc.aggregate(pipeline, (err, camsdata) => {
         transk.aggregate(pipeline1, (err, karvydata) => {
              transf.aggregate(pipeline2, (err, frankdata) => {
                if ( camsdata != 0 || karvydata != 0 || frankdata!= 0) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: camsdata
                    }
                
                var datacon = frankdata.concat(karvydata.concat(camsdata)) ;              
                         for (var i = 0; i < datacon.length; i++) {                                          
                          if (datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" 
                          || datacon[i]['PER_STATUS'] === "ON BEHALF OF MINOR" )  {
                             datacon[i]['PER_STATUS'] = "MINOR";      
                         }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL" || datacon[i]['PER_STATUS'] === "Individual"|| datacon[i]['PER_STATUS'] === "Resident Individual" || datacon[i]['PER_STATUS'] === "RESIDENT INDIVIDUAL" ) {
                             datacon[i]['PER_STATUS'] = "INDIVIDUAL";
                         }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
                            datacon[i]['PER_STATUS'] = "HUF";
                          }
                     }
                     datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                     .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                     .reverse().map(JSON.parse);
                     datacon = Array.from(new Set(datacon));
                     var newdata1 = datacon.map(item=>{
                        return [JSON.stringify(item),item]
                         }); // creates array of array
                         var maparr1 = new Map(newdata1); // create key value pair from array of array
                         datacon = [...maparr1.values()];//converting back to array from mapobject 
                         var filtered = datacon.filter(
                            (temp => a =>
                                (k => !temp[k] && (temp[k] = true))(a.INVNAME + '|' + a.PER_STATUS)
                            )(Object.create(null))
                        );
                    
                     resdata.data = filtered;
                  res.json(resdata);
                return resdata;
            } else {
                resdata = {
                    status: 400,
                    message: 'Data not found',
                }
                res.json(resdata);
                return resdata;
            }
            });
         });
     });
}else{
  pipeline = [  ///trans_cams
        { $match: {PAN:{$regex : `^${req.body.pan}.*` , $options: 'i' } } },
        { $group: { _id: {PAN: "$PAN",  INV_NAME: "$INV_NAME", TAX_STATUS:"$TAX_STATUS",} } },
        { $lookup: { from: 'folio_cams', localField: '_id.PAN', foreignField: 'PAN_NO', as: 'detail' } },
        { $unwind: "$detail" },
        { $project: { _id: 0,PAN: "$_id.PAN",  INVNAME: { "$toUpper": ["$_id.INV_NAME"] } ,PER_STATUS:{ "$toUpper": ["$_id.TAX_STATUS" ] },JOINT_NAME1: { "$toUpper": ["$detail.JNT_NAME1"] },JOINT_NAME2: { "$toUpper": ["$detail.JNT_NAME2"] } } },     
    ]
     pipeline1 = [  ///trans_karvy
        { $match: {PAN1:{$regex : `^${req.body.pan}.*` , $options: 'i' } } },
        { $group: { _id: { PAN1: "$PAN1",  INVNAME: "$INVNAME" ,STATUS:"$STATUS" } } },
        { $lookup: { from: 'folio_karvy', localField: '_id.PAN1', foreignField: 'PANGNO', as: 'detail' } },
        { $unwind: "$detail" },
        { $project: { _id: 0,  PAN: "$_id.PAN1", INVNAME: { "$toUpper": ["$_id.INVNAME"] },PER_STATUS:{ "$toUpper": ["$_id.STATUS" ] },JOINT_NAME1: { "$toUpper": ["$detail.JTNAME1"] },JOINT_NAME2: { "$toUpper": ["$detail.JTNAME2"] } } },
       
    ]
     pipeline2 = [  ///trans_franklin
        { $match: {IT_PAN_NO1:{$regex : `^${req.body.pan}.*` , $options: 'i' } } },
        { $group: { _id: { IT_PAN_NO1: "$IT_PAN_NO1", INVESTOR_2:"$INVESTOR_2",SOCIAL_S18:"$SOCIAL_S18",JOINT_NAM1:"$JOINT_NAM1",JOINT_NAM2:"$JOINT_NAM2" } } },
        { $project: { _id: 0,PAN: "$_id.IT_PAN_NO1",  INVNAME: { "$toUpper": ["$_id.INVESTOR_2"] } ,PER_STATUS:{ "$toUpper": ["$_id.SOCIAL_S18"] },JOINT_NAME1:{ "$toUpper": ["$_id.JOINT_NAM1"] },JOINT_NAME2:{ "$toUpper": ["$_id.JOINT_NAM2"] } } },
       
    ]
    transc.aggregate(pipeline, (err, camsdata) => {
        transk.aggregate(pipeline1, (err, karvydata) => {
             transf.aggregate(pipeline2, (err, frankdata) => {
               if ( camsdata != 0 || karvydata != 0 || frankdata!= 0) {
                   resdata = {
                       status: 200,
                       message: 'Successfull',
                       data: camsdata
                   }
               
               var datacon = frankdata.concat(karvydata.concat(camsdata)) ;              
                        for (var i = 0; i < datacon.length; i++) {                                          
                         if (datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" 
                         || datacon[i]['PER_STATUS'] === "ON BEHALF OF MINOR" )  {
                            datacon[i]['PER_STATUS'] = "MINOR";      
                        }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL" || datacon[i]['PER_STATUS'] === "Individual"|| datacon[i]['PER_STATUS'] === "Resident Individual" || datacon[i]['PER_STATUS'] === "RESIDENT INDIVIDUAL" ) {
                            datacon[i]['PER_STATUS'] = "INDIVIDUAL";
                        }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
                           datacon[i]['PER_STATUS'] = "HUF";
                         }
                    }
                    datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                    datacon = Array.from(new Set(datacon));
                    var newdata1 = datacon.map(item=>{
                       return [JSON.stringify(item),item]
                        }); // creates array of array
                        var maparr1 = new Map(newdata1); // create key value pair from array of array
                        datacon = [...maparr1.values()];//converting back to array from mapobject 
                        var filtered = datacon.filter(
                           (temp => a =>
                               (k => !temp[k] && (temp[k] = true))(a.INVNAME + '|' + a.PER_STATUS)
                           )(Object.create(null))
                       );
                   
                    resdata.data = filtered;
                 res.json(resdata);
               return resdata;
           } else {
            resdata = {
                status: 400,
                message: 'Data not found',
            }
            res.json(resdata);
            return resdata;
           }
           });
        });
    });
}
            });
  }
} catch (err) {
    console.log(err)
}
})

app.post("/api/getfolio", function (req, res) {
    try{
        var perstatus = req.body.per_status;
        var statusvalue ="Minor";
        if(perstatus.toLowerCase() === statusvalue.toLowerCase()){

    pipeline1 = [  //folio_cams
        { $match:{  GUARD_PAN:req.body.pan,INV_NAME:{$regex : `^${req.body.name}.*` , $options: 'i' } } },
        { $group: { _id: { FOLIOCHK: "$FOLIOCHK", AMC_CODE:"$AMC_CODE" } } },
        { $project: { _id: 0, amc_code: "$_id.AMC_CODE" , folio:"$_id.FOLIOCHK"  } },
        { $sort: {amc_code:1}}
    ]
    pipeline2 = [  //trans_karvy
        { $match:{ GUARDPANNO:req.body.pan,INVNAME:{$regex : `^${req.body.name}.*` , $options: 'i' }} },
        { $group: { _id: { ACNO: "$ACNO", FUND:"$FUND" } } },
        { $project: { _id: 0, amc_code: "$_id.FUND" , folio:"$_id.ACNO"  } },
        { $sort: {amc_code:1}}
    ]
    pipeline3 = [  //trans_franklin
        { $match:{ GUARDIAN20:req.body.pan,INV_NAME:{$regex : `^${req.body.name}.*` , $options: 'i' }} },
        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", COMP_CODE:"$COMP_CODE" } } },
        { $project: { _id: 0, amc_code: "$_id.COMP_CODE" , folio:"$_id.FOLIO_NO"  } },
        { $sort: {amc_code:1}}
    ]
    folioc.aggregate(pipeline1, (err, camsdata) => {
        foliok.aggregate(pipeline2, (err, karvydata) => {
            foliof.aggregate(pipeline3, (err, frankdata) => {
      if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
            resdata = {
                status: 200,
                message: 'Successful',
                data:frankdata
            }
         var datacon = frankdata.concat(karvydata.concat(camsdata));
         var removeduplicates = Array.from(new Set(datacon));
         datacon = removeduplicates.map(JSON.stringify)
             .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
             .filter(function (item, index, arr) {
                 return arr.indexOf(item, index + 1) === -1;
             }) // check if there is any occurence of the item in whole array
             .reverse()
             .map(JSON.parse);
             resdata.data = datacon.sort((a, b) => (a.amc_code > b.amc_code) ? 1 : -1);
         res.send(resdata);
         return resdata;
     }else{
        resdata = {
            status: 400,
            message: 'Data not found',
        }
        res.send(resdata);
        return resdata;
     }
 });
});
});
}else{
    pipeline1 = [  //trans_cams
        { $match:{  PAN:req.body.pan,INV_NAME:{$regex : `^${req.body.name}.*` , $options: 'i' } } },
        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", AMC_CODE:"$AMC_CODE" } } },
        { $project: { _id: 0, amc_code: "$_id.AMC_CODE" , folio:"$_id.FOLIO_NO"  } },
        { $sort: {amc_code:1}}
    ]
    pipeline2 = [  //trans_karvy
        { $match:{ PAN1:req.body.pan,INVNAME:{$regex : `^${req.body.name}.*` , $options: 'i' }} },
        { $group: { _id: { TD_ACNO: "$TD_ACNO", TD_FUND:"$TD_FUND" } } },
        { $project: { _id: 0, amc_code: "$_id.TD_FUND" , folio:"$_id.TD_ACNO"  } },
        { $sort: {amc_code:1}}
    ]
    pipeline3 = [  //trans_franklin
        { $match:{ IT_PAN_NO1:req.body.pan,INVESTOR_2:{$regex : `^${req.body.name}.*` , $options: 'i' }} },
        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", COMP_CODE:"$COMP_CODE" } } },
        { $project: { _id: 0, amc_code: "$_id.COMP_CODE" , folio:"$_id.FOLIO_NO"  } },
        { $sort: {amc_code:1}}
    ]
    transc.aggregate(pipeline1, (err, camsdata) => {
        transk.aggregate(pipeline2, (err, karvydata) => {
            transf.aggregate(pipeline3, (err, frankdata) => {
      if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
        resdata = {
            status: 200,
            message: 'Successful',
            data:frankdata
        }
         var datacon = frankdata.concat(karvydata.concat(camsdata))
         var removeduplicates = Array.from(new Set(datacon));
         datacon = removeduplicates.map(JSON.stringify)
             .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
             .filter(function (item, index, arr) {
                 return arr.indexOf(item, index + 1) === -1;
             }) // check if there is any occurence of the item in whole array
             .reverse()
             .map(JSON.parse);
             resdata.data = datacon.sort((a, b) => (a.amc_code > b.amc_code) ? 1 : -1);
         res.send(resdata);
         return resdata;
     }else{
        resdata = {
            status: 400,
            message: 'Data not found',
        }
        res.send(resdata);
        return resdata;
     }
 });
});
});

 }
} catch (err) {
    console.log(err)
}
})



app.post("/api/PANVerification", function (req, res) {
    try {
	    let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if(req.body.memberPan === "" ) {
            resdata = {
                status: 400,
                message: 'Please enter pan',
            }
            res.json(resdata)
            return resdata;
        } else if(!regex.test(req.body.memberPan)) {
                resdata = {
                    status: 400,
                    message: 'Please enter valid pan',
                }
                res.json(resdata);
                return resdata;
            }else{
		   family.find({ memberPan: req.body.memberPan }).distinct("memberPan", function (err, memberdata) {
                    if(memberdata.length === 0){
         foliok.find({ PANGNO: req.body.memberPan }, { _id: 0, EMAIL: 1, Name: "$INVNAME",Phone:"$MOBILE" }, function (err, foliokarvydata) {
                    folioc.find({ PAN_NO: req.body.memberPan }, { _id: 0, EMAIL: 1, Name: "$INV_NAME",Phone:"$MOBILE_NO" }, function (err, foliocamsdata) {
                        foliof.find({ PANNO1: req.body.memberPan }, { _id: 0, EMAIL: 1, Name: "$INV_NAME",Phone:"$PHONE_RES" }, function (err, foliofranklindata) {
                    if(foliokarvydata !="" || foliocamsdata !="" || foliofranklindata !="") {
                        resdata = {
                            status: 200,
                            message: 'Successful',
                            data:foliofranklindata,
                        }
                        datacon = foliokarvydata.concat(foliocamsdata.concat(foliofranklindata));
                        datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                        var digits = '0123456789';
                        let OTP = '';
                        for (let k = 0; k < 6; k++ ) {
                            OTP += digits[Math.floor(Math.random() * 10)];
                        }
                        
                        localStorage.setItem('otp', OTP);
                        localStorage.setItem('memberPan', req.body.memberPan );
			      var name =datacon[0].Name;
			    var phone= datacon[0].Phone;
// 				 for(var j=0;j<datacon.length;j++){
//                                     datacon[j].EMAIL = datacon[j].EMAIL.toUpperCase();
//                                     datacon[j].Name = datacon[j].Name.toUpperCase();
//                                 }
// 			    datacon = datacon.filter(
//                                     (temp => a =>
//                                         (k => !temp[k] && (temp[k] = true))(a.EMAIL + '|'+ a.Phone)
//                                     )(Object.create(null))
//                                 );
                             //var name= datacon[0].Name;
                      //  for(var j=0;j<datacon.length;j++){
                            //datacon[j].Phone=datacon[j].Phone;
// 				datacon[j].EMAIL = datacon[j].EMAIL.toUpperCase();
// 				datacon[j].Name = datacon[j].Name.toUpperCase();
                                    Axios.get("http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=bfccapital&Password=obmh6034OB&SenderID=BFCCAP&EntityID=1201160224111799498&TemplateID=1207162512411734505&Phno=" +phone+ "&Msg=Dear "+name+", Your Verification OTP is: "+OTP+". Please do not share this OTP with anyone. BFC Capital.",
                                ).then(function (result) {
                                    console.log('SMS send successfully',phone);
                                });
                     //   }
                       resdata.data  = [...new Set(datacon.map(({EMAIL}) => EMAIL.toLowerCase()))]
                        //resdata.data = datacon;
                        for(var j=0;j<resdata.data.length;j++){
                            var toemail = resdata.data[j];
                         var transporter = nodemailer.createTransport({ 
                           host: 'mail.bfccapital.com',
                            port: 465,
                            secure: true, 
                            auth: {
                              user: "customersupport@bfccapital.com",
                              pass: "customersupport@123"
                            }
                          }); 
                          transporter.verify(function (error, success) {
                            if (error) {
                              console.log("Error");
                            } else {
                              console.log("Server is ready to take our messages!");
                            }
                          });
  
                        let mailOptions = {
                        //    from: "customersupport@bfccapital.com",
			      from: {
				    name: 'BFC Capital',
				    address: 'customersupport@bfccapital.com'
			     },
                            to: toemail,
                            cc: "pallavisinghbfcinfotech@gmail.com",
                            subject: "Mapping of Family Member's Folio(s)",
                            html: "Dear "+name+",<br><br>Your Family Member has requested to link your Mutual Fund Investment Folio(s) to his/her portfolio.You can authorize the same by sharing the OTP- <b>"+OTP+"</b> with your family member. <br>Note - By accepting this request, your family member can view your investment folios and initiate transactions on your behalf and such transactions will be processed only after your approval subject to your payment confirmation or OTP confirmation wherever applicable.<br>In case you need any clarification, please contact us on 9506031502 or you can also email to customersupport@bfccapital.com, quoting your PAN, mobile no. and your query.<br><br>Thanks & Regards<br>Team BFC Capital"
                          }
                          transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                        }
                        res.json(resdata)
                        return resdata;
                    }else{
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                        res.json(resdata)
                        return resdata;
                    }
                 });
            });
       });           
		 } else{
                resdata = {
                    status: 400,
                    message: 'Member pan Already exists',
                }
                res.json(resdata)
                return resdata;
            }
		    });
    }
    } catch (err) {
        console.log(err)
    }
});

app.post("/api/verifiyPanOtpAddFamily", function (req, res) {
    try {
        if (req.body.adminPan === "") {
            resdata = {
                status: 400,
                message: 'Please enter admin pan!',
            }
            res.json(resdata);
            return resdata;
        } else if (req.body.memberPan === "") {
            resdata = {
                status: 400,
                message: 'Please enter member pan!',
            }
            res.json(resdata);
		return resdata;
        }else if (req.body.memberRelation === "") {
            resdata = {
                status: 400,
                message: 'Please enter member relation!',
            }
            res.json(resdata);
            return resdata;
         } else if (req.body.otp === "") {
            resdata = {
                status: 400,
                message: 'Please enter otp!',
            }
            res.json(resdata);
            return resdata;
        } else if (req.body.memberPan === req.body.adminPan) {
            resdata = {
                status: 400,
                message: 'Admin Pan & Family member Pan must not be same!',
            }
            res.json(resdata);
		return resdata
        }else {
            var memberdata="";
                 var OTP = localStorage.getItem('otp');
                 var memberPan = localStorage.getItem('memberPan'); 
                 if(memberPan!= req.body.memberPan){
                    resdata = {
                        status: 400,
                        message: 'Member Pan not match!',
                    }
                    res.json(resdata);
                    return resdata;
                    
                }if(OTP!= req.body.otp){
                    resdata = {
                        status: 400,
                        message: 'OTP not matched!',
                    }
                    res.json(resdata);
                    return resdata;
                }else{
                    try {
                     //   for (i = 0; i < req.body.length; i++) {
                            var mod = new family({memberPan:memberPan,adminPan:req.body.adminPan,memberRelation:req.body.memberRelation});
                            family.find({ memberPan: req.body.memberPan , adminPan:req.body.adminPan },{_id:0}, function (err, memberdata) {
                                if(memberdata !=""){
                                    resdata = {
                                        status: 400,
                                        message: 'Family member already exist!',
                                    }
                                    res.json(resdata)
                                    return resdata;
                                }else{
                                    mod.save(function (err, data) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log("insert successfully");
                                        }
                                    });
                                    resdata = {
                                        status: 200,
                                        message: 'insert successfully',
                                    }
                                    res.json(resdata)
                                    return resdata;
                                }
                            });
                    } catch (err) {
                        console.log(err)
                    }
                 }            
        }
        
    } catch (err) {
        console.log(err)
    }
});

// app.post("/api/getfoliodetail", function (req, res) {     
// 	try{
// 		 var prodcode = req.body.amc_code+req.body.prodcode;
//                     const pipeline3 = [  //trans_cams
//                         {$match : {"FOLIO_NO":req.body.folio,"AMC_CODE":req.body.amc_code,"PRODCODE":prodcode}}, 
//                         {$group : {_id : {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} } ,UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"}  }}},
//                         {$lookup:
//                         {
//                         from: "products",
//                         let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
//                         pipeline: [
//                             { $match:
//                                 { $expr:
//                                     { $and:
//                                     [
//                                         { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
//                                         { $eq: [ "$AMC_CODE", "$$amc" ] }
//                                     ]
//                                     }
//                                 }
//                             },
//                             { $project: {  _id: 0 } }
//                         ],
//                         as: "products"
//                         }},
//                         { $unwind: "$products"},
//                         {$group :{ _id: {INV_NAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO", products:"$products.ISIN" } , UNITS:{$sum:"$_id.UNITS"}, AMOUNT:{$sum:"$_id.AMOUNT"} } },
//                         {$lookup: { from: 'cams_nav',localField: '_id.products',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
//                         { $unwind: "$nav"},                                                                                                                                                        
//                         {$project:  {_id:0 , INVNAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",products:"$products.ISIN", cnav:"$nav.NetAssetValue"  ,navdate:{ $dateToString: { format: "%d-%m-%Y", date: "$nav.Date" } } , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
//                     ]
//                     const pipeline11 = [  //folio_karvy
//                         {$match : {"ACNO":req.body.folio}}, 
//                         {$group :{_id :  {INVNAME:"$INVNAME",BNAME:"$BNAME",BNKACNO:"$BNKACNO",NOMINEE:"$NOMINEE",JTNAME2:"$JTNAME2",JTNAME1:"$JTNAME1"} }}, 
//                         {$project:{_id:0,INVNAME:"$_id.INVNAME", BANK_NAME:"$_id.BNAME",AC_NO:"$_id.BNKACNO",NOMINEE:"$_id.NOMINEE",JTNAME2:"$_id.JTNAME2",JTNAME1:"$_id.JTNAME1"}}
//                    ]  
//                    const pipeline33 = [  //folio_cams
//                     {$match : {"FOLIOCHK":req.body.folio}}, 
//                     {$group :{_id :  {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO",NOM_NAME:"$NOM_NAME",JNT_NAME1:"$JNT_NAME1",JNT_NAME2:"$JNT_NAME2"} }}, 
//                     {$project:{_id:0,INVNAME:"$_id.INV_NAME", BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",NOMINEE:"$_id.NOM_NAME",JTNAME1:"$_id.JNT_NAME1",JTNAME2:"$_id.JNT_NAME2"}}
//                ]    
//                 const pipeline1=[  //trans_karvy
//                         {$match : {"TD_ACNO":req.body.folio,"SCHEMEISIN":req.body.isin}}, 
//                         {$group :{_id : {INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
//                         {$group :{_id:{ INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
//                         {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
//                             { $unwind: "$nav"},
//                         {$project:  {_id:0, INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue" ,navdate:{ $dateToString: { format: "%d-%m-%Y", date: "$nav.Date" } }  , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
//                     ] 
//                     const pipeline2=[  //trans_franklin
//                         {$match : {"FOLIO_NO":req.body.folio,"ISIN":req.body.isin}}, 
//                         {$group :{_id : {INVESTOR_2:"$INVESTOR_2",ISIN:"$ISIN",NOMINEE1:"$NOMINEE1",PBANK_NAME:"$PBANK_NAME",PERSONAL23:"$PERSONAL23",JOINT_NAM2:"$JOINT_NAM2",JOINT_NAM1:"$JOINT_NAM1",cnav:"$nav.NetAssetValue"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"} }},
//                         {$group :{_id:{ INVESTOR_2:"$_id.INVESTOR_2",ISIN:"$_id.ISIN",NOMINEE1:"$_id.NOMINEE1",PBANK_NAME:"$_id.PBANK_NAME",PERSONAL23:"$_id.PERSONAL23",JOINT_NAM2:"$_id.JOINT_NAM2",JOINT_NAM1:"$_id.JOINT_NAM1",cnav:"$nav.NetAssetValue"}, UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }},
//                         {$lookup: { from: 'cams_nav',localField: '_id.ISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
//                         { $unwind: "$nav"},
//                         {$project:  {_id:0, INVNAME:"$_id.INVESTOR_2",SCHEMEISIN:"$_id.ISIN",NOMINEE:"$_id.NOMINEE1",BANK_NAME:"$_id.PBANK_NAME",AC_NO:"$_id.PERSONAL23",JTNAME2:"$_id.JOINT_NAM2",JTNAME1:"$_id.JOINT_NAM1", cnav:"$nav.NetAssetValue",navdate:{ $dateToString: { format: "%d-%m-%Y", date: "$nav.Date" } }   , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
//                 ] 
//                 var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
//                     var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
//                      var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');  
//                      var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');   
//                     var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
//                     transc.aggregate(pipeline3, (err, newdata3) => {
//                         folioc.aggregate(pipeline33, (err, newdata33) => {
//                             transk.aggregate(pipeline1, (err, newdata1) => {
//                                 foliok.aggregate(pipeline11, (err, newdata11) => {
//                                 transf.aggregate(pipeline2, (err, newdata2) => {
//                                     if (
//                                         newdata2 != 0 ||
//                                         newdata1 != 0 ||
//                                         newdata3 != 0 ||
//                                         newdata33 != 0 ||
//                                         newdata11 != 0
//                                     ) {
//                                         resdata = {
//                                         status: 200,
//                                         message: "Successfull",
//                                         data: newdata2
//                                         };
//                                     } else {
//                                         resdata = {
//                                         status: 400,
//                                         message: "Data not found"
//                                         };
//                                     }
//                                   let merged3 =  newdata3.map((items, j) => Object.assign({}, items, newdata33[j]));
//                                   let merged1 =  newdata1.map((items, j) => Object.assign({}, items, newdata11[j]));
//                                     var datacon = merged3.concat(merged1.concat(newdata2));
//                                     datacon = datacon
//                                         .map(JSON.stringify)
//                                         .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                                         .filter(function(item, index, arr) {
//                                         return arr.indexOf(item, index + 1) === -1;
//                                         }) // check if there is any occurence of the item in whole array
//                                         .reverse()
//                                         .map(JSON.parse);
//                                     resdata.data = datacon;
//                                     //console.log("res="+JSON.stringify(resdata))
//                                     res.json(resdata);
//                                     return resdata;
//                                     });  
//                               });
//                             });
//                         });
//                     })
// 		 } catch (err) {
//                     console.log(err)
//                 }
// }) 

app.post("/api/getfoliodetail", function (req, res) {
    var unit = 0; var balance = 0; var currentvalue = 0; var amt = 0; var cnav = 0;
    var prodcode = req.body.amc_code + req.body.prodcode;
    const pipeline1 = [  //trans_cams
        { $match: { "FOLIO_NO": req.body.folio, "AMC_CODE": req.body.amc_code, "PRODCODE": prodcode } },
        { $group: { _id: { INV_NAME: "$INV_NAME", BANK_NAME: "$BANK_NAME", AC_NO: "$AC_NO", AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $reduce: { input: { $split: ["$PRODCODE", "$AMC_CODE"] }, initialValue: "", in: { $concat: ["$$value", "$$this"] } } }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } } },
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
        { $lookup: { from: 'cams_nav', localField: 'products.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
        { $unwind: "$nav" },
        { $lookup: { from: 'folio_cams', localField: '_id.FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
        { $unwind: "$detail" },
        { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", INVNAME: "$_id.INV_NAME", SCHEME: "$_id.SCHEME", NATURE: "$_id.TRXN_TYPE_", navdate: "$_id.TRADDATE", SCHEMEISIN: "$products.ISIN", NOMINEE: "$detail.NOM_NAME", BANK_NAME: "$_id.BANK_NAME", AC_NO: "$_id.AC_NO", JTNAME2: "$detail.JNT_NAME2", JTNAME1: "$detail.JNT_NAME1", cnav: "$nav.NetAssetValue", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
     ]
    const pipeline2 = [  //trans_karvy
        { $match: { "TD_ACNO": req.body.folio, "SCHEMEISIN": req.body.isin } },
        { $group: { _id: { TD_ACNO: "$TD_ACNO", INVNAME: "$INVNAME",FUNDDESC: "$FUNDDESC", TD_TRTYPE: "$TD_TRTYPE",TD_TRDT: "$TD_TRDT",  SCHEMEISIN: "$SCHEMEISIN" }, TD_UNITS: { $sum: "$TD_UNITS" }, TD_AMT: { $sum: "$TD_AMT" } } },
        {
            $lookup:
            {
                from: "cams_nav",
                let: { isin: "$_id.SCHEMEISIN" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $or:
                                    [
                                        { $eq: ["$ISINDivPayoutISINGrowth", "$$isin"] },
                                        { $eq: ["$ISINDivReinvestment", "$$isin"] }
                                    ]
                            }
                        }
                    },
                    { $project: { _id: 0 } }
                ],
                as: "nav"
            }
        },
        { $unwind: "$nav" },
        { $lookup: { from: 'folio_karvy', localField: '_id.TD_ACNO', foreignField: 'ACNO', as: 'detail' } },
        { $unwind: "$detail" },
        { $project: { _id: 0, FOLIO: "$_id.TD_ACNO", INVNAME: "$_id.INVNAME", SCHEME: "$_id.FUNDDESC", NATURE: "$_id.TD_TRTYPE", navdate: "$_id.TD_TRDT", SCHEMEISIN: "$_id.SCHEMEISIN", NOMINEE: "$detail.NOMINEE", BANK_NAME: "$detail.BNAME", AC_NO: "$detail.BNKACNO", JTNAME2: "$detail.JTNAME2", JTNAME1: "$detail.JTNAME1", cnav: "$nav.NetAssetValue", UNITS: { $sum: "$TD_UNITS" }, AMOUNT: { $sum: "$TD_AMT" } } },
     ]
   
    const pipeline3 = [  //trans_franklin
        { $match: { "FOLIO_NO": req.body.folio, "ISIN": req.body.isin } },
        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", INVESTOR_2: "$INVESTOR_2", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", ISIN: "$ISIN", NOMINEE1: "$NOMINEE1", PBANK_NAME: "$PBANK_NAME", PERSONAL23: "$PERSONAL23", JOINT_NAM2: "$JOINT_NAM2", JOINT_NAM1: "$JOINT_NAM1" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
        {
            $lookup:
            {
                from: "cams_nav",
                let: { isin: "$_id.ISIN" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $or:
                                    [
                                        { $eq: ["$ISINDivPayoutISINGrowth", "$$isin"] },
                                        { $eq: ["$ISINDivReinvestment", "$$isin"] }
                                    ]
                            }
                        }
                    },
                    { $project: { _id: 0 } }
                ],
                as: "nav"
            }
        },
        { $unwind: "$nav" },
       { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", INVNAME: "$_id.INVESTOR_2", SCHEME: "$_id.SCHEME_NA1", NATURE: "$_id.TRXN_TYPE", navdate: "$_id.TRXN_DATE", SCHEMEISIN: "$_id.ISIN", NOMINEE: "$_id.NOMINEE1", BANK_NAME: "$_id.PBANK_NAME", AC_NO: "$_id.PERSONAL23", JTNAME2: "$_id.JOINT_NAM2", JTNAME1: "$_id.JOINT_NAM1", cnav: "$nav.NetAssetValue", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
    ]

    transc.aggregate(pipeline1, (err, camsdata) => {
       transk.aggregate(pipeline2, (err, karvydata) => {
            transf.aggregate(pipeline3, (err, frankdata) => {
                                       if (frankdata != 0 || karvydata != 0 || camsdata != 0 ) {
                            resdata = {
                                status: 200,
                                message: "Successfull",
                                data: frankdata
                            };
                       
                        var datacon = camsdata.concat(karvydata.concat(frankdata));
                      
                        datacon = datacon
                            .map(JSON.stringify)
                            .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) {
                                return arr.indexOf(item, index + 1) === -1;
                            }) // check if there is any occurence of the item in whole array
                            .reverse()
                            .map(JSON.parse);
                            for (i = 0; i < datacon.length; i++) {
                                if (datacon[i]['NATURE'] === "RED" || datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
                                    datacon[i]['NATURE'] === "Switch Out" || datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "LTOF" ||
                                    datacon[i]['NATURE'] === "FUL" || datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "CNO" ||
                                    datacon[i]['NATURE'] === "FULR" || datacon[i]['NATURE'] === "Full Redemption" || datacon[i]['NATURE'] === "Partial Switch Out"
                                    || datacon[i]['NATURE'] === "Full Switch Out" || datacon[i]['NATURE'] === "Partial Redemption"
                                    || datacon[i]['NATURE'] === "SWD" || datacon[i]['NATURE'] === "SWOF" || datacon[i]['NATURE'] === "TOCOB") {
                                    unit = "-" + datacon[i].UNITS;
                                } else {
                                    unit = datacon[i].UNITS;
                                }
            
                                balance = parseFloat(unit) + parseFloat(balance);
                                cnav = datacon[i].cnav;
                                
                            }
                            var index = datacon.length - 1;
                            
                            if(balance >0){
                            datacon[index].AMOUNT = Math.round(parseFloat(cnav) * parseFloat(balance));
                            datacon[index].UNITS = balance;
                            }else if(balance.isNaN || cnav != ""){
                            datacon[index].AMOUNT = 0;
                            datacon[index].UNITS = 0;
                             }else{
                            datacon[index].AMOUNT = 0;
                            datacon[index].UNITS = 0;
                            }
               
                resdata.data = [datacon[index]];
            } else {
                resdata = {
                    status: 400,
                    message: "Data not found"
                };
            }
                res.json(resdata);
                return resdata;
                    });
        });
    })
})
app.post("/api/getamclist", function(req, res) { 
	try{
    if(req.body.pan === "" || req.body.pan === undefined || req.body === "" || req.body.pan === null){
                    resdata= {
                        status:400,
                        message:'Data not found',            
                   }
                   res.json(resdata) 
                   return resdata;
                  }else{
                    var pan = req.body.pan;

     const pipeline = [
      //trans_franklin
      { $match: { IT_PAN_NO1: pan } },
      { $group: { _id: { FOLIO_NO: "$FOLIO_NO", COMP_CODE: "$COMP_CODE"  } } },
      {
        $project: {
          _id: 0,
          folio: "$_id.FOLIO_NO",
          amc_code: "$_id.COMP_CODE",
        }       
      },
      {$sort: {amc_code: 1}},
    
    ];

    const pipeline1 = [
      //trans_cams
      { $match: { PAN: pan } },
      { $group: { _id: { FOLIO_NO: "$FOLIO_NO", AMC_CODE: "$AMC_CODE" } } },
      {
        $project: {
          _id: 0,
          folio: "$_id.FOLIO_NO",
          amc_code: "$_id.AMC_CODE",
        }
      },
       {$sort: {amc_code: 1}}
    ];
    const pipeline2 = [
      //trans_karvy
      { $match: { PAN1: pan } },
      { $group: { _id: { TD_ACNO: "$TD_ACNO", TD_FUND: "$TD_FUND" } } },
      {
        $project: {
          _id: 0,
          folio: "$_id.TD_ACNO",
          amc_code: "$_id.TD_FUND",
        }
      },
       {$sort: {amc_code: 1}}
    ];
    transf.aggregate(pipeline, (err, newdata) => {
      transc.aggregate(pipeline1, (err, newdata1) => {
        transk.aggregate(pipeline2, (err, newdata2) => {
          if (
            newdata2.length != 0 ||
            newdata1.length != 0 ||
            newdata.length != 0
          ) {
            resdata = {
              status: 200,
              message: "Successfull",
              data: newdata2
            };
          } else {
            resdata = {
              status: 400,
              message: "Data not found"
            };
          }
          var datacon = newdata.concat(newdata1.concat(newdata2));
          datacon = datacon
            .map(JSON.stringify)
            .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
            .filter(function(item, index, arr) {
              return arr.indexOf(item, index + 1) === -1;
            }) // check if there is any occurence of the item in whole array
            .reverse()
            .map(JSON.parse);
           
            for(var i=0; i<datacon.length; i++){
                if(datacon[i]['amc_code'] != "" &&  datacon[i]['folio'] != "" &&  datacon[i]['scheme'] != "" ){                 
                    resdata.data = datacon[i];             
                }
            }
		resdata.data = datacon.sort((a, b) => (a.amc_code > b.amc_code) ? 1 : -1);
          res.json(resdata);
          return resdata;
        });
      });
    });
                  }
                } catch (err) {
                    console.log(err)
                }
});


// app.post("/api/gettaxsavinguserwise", function (req, res) {
//     try{
//     var yer = req.body.fromyear;
//     var secyer = req.body.toyear;
//     yer = yer + "-04-01";
//     secyer = secyer + "-03-31"
//     var pan = req.body.pan;

//     var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
//     var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
//     var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
//      if(req.body.pan != "" && req.body.name != ""){
//         const pipeline = [  ///trans_cams
//         { $match: { $and: [{ SCHEME: /Tax/ }, { PAN: pan },{ INV_NAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { TRXN_NATUR: { $not: /^Redemption.*/ } },{ TRXN_NATUR: { $not: /^Gross Dividend.*/ } },  { TRXN_NATUR: { $not: /^Dividend Paid.*/ } }, { TRXN_NATUR: { $not: /^Switchout.*/ } }, { TRXN_NATUR: { $not: /^Transfer-Out.*/ } }, { TRXN_NATUR: { $not: /^Lateral Shift Out.*/ } },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//         { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
//         { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }} },
//         { $sort: { TRADDATE: -1 } }
//     ]
//     const pipeline1 = [  ///trans_karvy                                             
//         { $match: { $and: [{ FUNDDESC: /Tax/ }, { PAN1: pan },{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ,{ TRDESC: { $not: /^Redemption.*/ } },{ TRDESC: { $not: /^Rejection.*/ } },{ TRDESC: { $not: /^Gross Dividend.*/ } },{ TRDESC: { $not: /^Switch Over Out.*/ } },  { TRDESC: { $not: /^Dividend Paid.*/ } }, { TRXN_NATURE: { $not: /^Switchout.*/ } }, { TRXN_NATURE: { $not: /^Transfer-Out.*/ } }, { TRXN_NATURE: { $not: /^Lateral Shift Out.*/ } },{ TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
//         { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
//         { $project: { _id: 0, INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
//         { $sort: { TRADDATE: -1 } }
//     ]
//     const pipeline2 = [  ///trans_franklin
//         { $match: { $and: [{ SCHEME_NA1: /Tax/ }, { IT_PAN_NO1: pan }, { INVESTOR_2: {$regex : `^${req.body.name}.*` , $options: 'i' } },{ TRXN_TYPE: { $not: /^SIPR.*/ } },{ TRXN_TYPE: { $not: /^TO.*/ } },{ TRXN_TYPE: { $not: /^DP.*/ } },{ TRXN_TYPE: { $not: /^RED.*/ } },{ TRXN_TYPE: { $not: /^REDR.*/ } },{ TRXN_TYPE: { $not: /^Gross Dividend.*/ } }, { TRXN_TYPE: { $not: /^Dividend Paid.*/ } }, { TRXN_TYPE: { $not: /^SWOF.*/ } }, { TRXN_TYPE: { $not: /^Transfer-Out.*/ } }, { TRXN_TYPE: { $not: /^Lateral Shift Out.*/ } } , { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }  ] } },
//         { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE"  } } },
//         { $project: { _id: 0, INVNAME: "$INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
//         { $sort: { TRADDATE: -1 } }
//     ]
//         transc.aggregate(pipeline, (err, camsdata) => {
//             transk.aggregate(pipeline1, (err, karvydata) => {
//                 transf.aggregate(pipeline2, (err, frankdata) => {
//                     if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
//                         resdata = {
//                             status: 200,
//                             message: 'Successfull',
//                             data: frankdata
//                         }
//                     } else {
//                         resdata = {
//                             status: 400,
//                             message: 'Data not found',
//                         }
//                     }
//                     var datacon = frankdata.concat(karvydata.concat(camsdata))
//                     datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                         .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                         .reverse().map(JSON.parse);
//                      for (var i = 0; i < datacon.length; i++) {
//                             if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
//                                 datacon[i]['TRXN_NATUR'] = "SIP";
//                             } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
//                                 datacon[i]['TRXN_NATUR'] = "SIPR";
//                             } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
//                                 datacon[i]['TRXN_NATUR'] = "STP";
//                             }
//                         }
//                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
//                     res.json(resdata)
//                     return resdata
//                 });
//             });
//         });
//     }else{
//         resdata = {
//             status: 400,
//             message: 'Data not found',
//         }
//     }
// } catch (err) {
//     console.log(err)
// }
// });

app.post("/api/gettaxsavinguserwise", function (req, res) {
    try{
        var member="";var guardpan1=[];var guardpan2=[];
        var arr1=[];var arr2=[];var arr3=[];var alldata=[];var arrFolio=[];var arrName=[];
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if(req.body.fromyear ===""){
            resdata = {
                status: 400,
                message: 'Please enter from year',
            }
            res.json(resdata);
            return resdata;
        }else if(req.body.toyear ===""){
            resdata = {
                status: 400,
                message: 'Please enter to year',
            }
            res.json(resdata);
            return resdata;
        }else if(req.body.pan ===""){
            resdata = {
                status: 400,
                message: 'Please enter pan',
            }
            res.json(resdata);
            return resdata;
        }else if(!regex.test(req.body.pan)) {
            resdata = {
                status: 400,
                message: 'Please enter valid pan',
            }
            res.json(resdata);
            return resdata;
        }else{
            var yer = req.body.fromyear;
            var secyer = req.body.toyear;
            yer = yer + "-04-01";
            secyer = secyer + "-03-31"
            family.find({ adminPan:  {$regex : `^${req.body.pan}.*` , $options: 'i' }  },{_id:0,memberPan:1}, function (err, member) {
                if(member!=""){
                    member  = [...new Set(member.map(({memberPan}) => memberPan.toUpperCase()))];
                    guardpan1.push({GUARD_PAN:req.body.pan.toUpperCase()});
                    guardpan2.push({GUARDPANNO:req.body.pan.toUpperCase()});
                    arr1.push({PAN:req.body.pan.toUpperCase()});
                    arr2.push({PAN1:req.body.pan.toUpperCase()});
                    arr3.push({IT_PAN_NO1:req.body.pan.toUpperCase()});
                    for(var j=0;j<member.length;j++){     
                    guardpan1.push({GUARD_PAN:member[j]}); 
                    guardpan2.push({GUARDPANNO:member[j]});
                    arr1.push({PAN:member[j]});
                    arr2.push({PAN1:req.body.pan.toUpperCase()});
                    arr3.push({IT_PAN_NO1:req.body.pan.toUpperCase()});
                    }
                    var strPan1 = {$or:guardpan1};
                    var strPan2 = {$or:guardpan2};
                    folioc.find(strPan1).distinct("FOLIOCHK", function (err, member1) {
                      foliok.find(strPan2).distinct("ACNO", function (err, member2) {
                      var alldata = member1.concat(member2);   
                            for(var j=0;j<alldata.length;j++){     
                                arr1.push({FOLIO_NO:alldata[j]});
                                arr2.push({TD_ACNO:alldata[j]});
                                arr3.push({FOLIO_NO:alldata[j]});
                                }
                             var strFolio = {$or:arr1};
                             var strFolio1 = {$or:arr2};
                             var strFolio2 = {$or:arr3};
       pipeline = [  ///trans_cams
            { $match: { $and:  [strFolio, {SCHEME: /Tax/ }, { TRXN_NATUR: { $not: /^Lateral Shift Out.*/ } } , { TRXN_NATUR: { $not: /^Redemption.*/ } } , { TRXN_NATUR: { $not: /^Gross Dividend.*/ } },  { TRXN_NATUR: { $not: /^Dividend Paid.*/ } }, { TRXN_NATUR: { $not: /^Switchout.*/ } }, { TRXN_NATUR: { $not: /^Transfer-Out.*/ } } , { AMOUNT: { $gte: 0 } },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
            { $group: { _id: { TAX_STATUS:"$TAX_STATUS",TRXNNO:"$TRXNNO",INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0,PER_STATUS:"$_id.TAX_STATUS",TRXNNO:"$_id.TRXNNO", INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }} },
            { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
            { $sort: { TRADDATE: -1 } }
    ]
       pipeline1 = [  ///trans_karvy                                             
             { $match: { $and: [strFolio1, { $or: [ { FUNDDESC: /TAX/ }, { FUNDDESC: /Tax Saver/ }, { FUNDDESC: /Long Term Equity Fund/ }, { FUNDDESC: /IDBI Equity Advantage Fund/ }, { FUNDDESC: /Sundaram Diversified Equity Fund/ }] }, { TD_AMT: { $gte: 0 } }, { TRDESC: { $not: /^Consolidation Out.*/ } }, { TRDESC: { $not: /^Redemption.*/ } }, { TRDESC: { $not: /^Rejection.*/ } }, { TRDESC: { $not: /^Gross Dividend.*/ } }, { TRDESC: { $not: /^Switch Over Out.*/ } }, { TRDESC: { $not: /^Dividend Paid.*/ } }, { TRDESC: { $not: /^Switchout.*/ } }, { TRDESC: { $not: /^Transfer-Out.*/ } }, { TRDESC: { $not: /^Lateral Shift Out.*/ } }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { STATUS:"$STATUS",TD_TRNO:"$TD_TRNO",INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0,PER_STATUS:"$_id.STATUS", TRXNNO:"$_id.TD_TRNO", INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
            { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
            { $sort: { TRADDATE: -1 } }
    ]
       pipeline2 = [  ///trans_franklin
          { $match: { $and: [strFolio2, { SCHEME_NA1: /TAX/ }, { SCHEME_NA1: /Taxshield/ }, { AMOUNT: { $gte: 0 } }, { TRXN_TYPE: { $not: /^SIPR.*/ } }, { TRXN_TYPE: { $not: /^TO.*/ } }, { TRXN_TYPE: { $not: /^DP.*/ } }, { TRXN_TYPE: { $not: /^RED.*/ } }, { TRXN_TYPE: { $not: /^REDR.*/ } }, { TRXN_TYPE: { $not: /^Gross Dividend.*/ } }, { TRXN_TYPE: { $not: /^Dividend Paid.*/ } }, { TRXN_TYPE: { $not: /^SWOF.*/ } }, { TRXN_TYPE: { $not: /^Transfer-Out.*/ } }, { TRXN_TYPE: { $not: /^Lateral Shift Out.*/ } }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
            { $group: { _id: {  SOCIAL_S18:"$SOCIAL_S18",TRXN_NO:"$TRXN_NO", INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE"  } } },
            { $project: { _id: 0,PER_STATUS:"$_id.SOCIAL_S18",TRXNNO:"$_id.TRXN_NO", INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
            { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: { detail: 0 ,_id:0,TAX_STATUS:0,FOLIO_NO:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
            { $sort: { TRADDATE: -1 } }
    ]
        transc.aggregate(pipeline, (err, camsdata) => {
             transk.aggregate(pipeline1, (err, karvydata) => {
                transf.aggregate(pipeline2, (err, frankdata) => {
                    if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                      resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: frankdata
                        }
                   
                    var datacon = frankdata.concat(karvydata.concat(camsdata))
                    
                   datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                        var newdata1 = datacon.map(item=>{
                            return [JSON.stringify(item),item]
                             }); // creates array of array
                        var maparr1 = new Map(newdata1); // create key value pair from array of array
                        datacon = [...maparr1.values()];//converting back to array from mapobject 
                     datacon = datacon.map(function(obj) {
                       if(obj['GUARDIANN0']){
                           obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                           obj['GUARD_PAN'] = obj['GUARDPANNO'];
                            // Delete old key
                                 delete obj['GUARDIANN0'];
                                 delete obj['GUARDPANNO'];
                       }else if((obj['GUARDIANN0']) === ""){
                               obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                               obj['GUARD_PAN'] = obj['GUARDPANNO'];
                               delete obj['GUARDIANN0'];
                               delete obj['GUARDPANNO'];
                           }
                       if(obj['GUARDIAN20'] === ""){
                           obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                            // Delete old key
                           delete obj['GUARDIAN20'];
                       }else if((obj['GUARDIAN20']) === ""){
                           obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                           delete obj['GUARDIAN20'];
                       }
                           return obj;
                       });

                        for (var i = 0; i < datacon.length; i++) {
                            if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
                                datacon[i]['TRXN_NATUR'] = "SIP";
                            } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
                                datacon[i]['TRXN_NATUR'] = "SIPR";
                            } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
                                datacon[i]['TRXN_NATUR'] = "STP";
                            } if (datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "Fresh Purchase") {
                                datacon[i]['TRXN_NATUR'] = "Purchase";
                            }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
                               datacon[i]['TRXN_NATUR'] === "ADDPUR") {
                               datacon[i]['TRXN_NATUR'] = "Add. Purchase";
                           }if(datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || datacon[i]['TRXN_NATUR'] === "NFO Purchase" || 
                               datacon[i]['TRXN_NATUR'] === "Initial Allotment" || datacon[i]['TRXN_NATUR'] === "NEWPUR" ) {
                               datacon[i]['TRXN_NATUR'] = "Purchase";
                           }if(datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
                                || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
                                || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
                                datacon[i]['TRXN_NATUR'] = "Switch In";
                            }if(datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" )  {
                                datacon[i]['PER_STATUS'] = "Minor"; 
				datacon[i]['PAN'] = ""; 
                            }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL") {
                                 datacon[i]['PER_STATUS'] = "Individual";
                            }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
                                datacon[i]['PER_STATUS'] = "HUF";
                           }
                        }
                        resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime());
                        res.json(resdata);
                       return resdata;
                    } else{
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                        res.json(resdata);
                       return resdata;
                       }
                       
                    });
                });
             });
           });
       });
           }else{
            pipeline = [  ///trans_cams
            { $match: { $and:  [ { PAN: req.body.pan }, { SCHEME: /Tax/ },{ AMOUNT: { $gte: 0 } },{ TRXN_NATUR: { $not: /^Lateral Shift Out.*/ } } ,{ TRXN_NATUR: { $not: /^Redemption.*/ } } , { TRXN_NATUR: { $not: /^Gross Dividend.*/ } },  { TRXN_NATUR: { $not: /^Dividend Paid.*/ } }, { TRXN_NATUR: { $not: /^Switchout.*/ } }, { TRXN_NATUR: { $not: /^Transfer-Out.*/ } },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
            //{ $match: { $and:  [ { TRXN_NATUR: { $not: /^Lateral Shift Out.*/ } } ,{SCHEME: /Tax/ }, { TRXN_NATUR: { $not: /^Redemption.*/ } } , { TRXN_NATUR: { $not: /^Gross Dividend.*/ } },  { TRXN_NATUR: { $not: /^Dividend Paid.*/ } }, { TRXN_NATUR: { $not: /^Switchout.*/ } }, { TRXN_NATUR: { $not: /^Transfer-Out.*/ } },]},{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
            { $group: { _id: { TAX_STATUS:"$TAX_STATUS",TRXNNO:"$TRXNNO",INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0,PER_STATUS:"$_id.TAX_STATUS",TRXNNO:"$_id.TRXNNO", INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }} },
            { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
            { $sort: { TRADDATE: -1 } }
    ]
       pipeline1 = [  ///trans_karvy                                             
             { $match: { $and: [{ PAN1: req.body.pan }, { $or: [{ FUNDDESC: /TAX/ }, { FUNDDESC: /Tax/ }, { FUNDDESC: /Tax Saver/ }, { FUNDDESC: /Long Term Equity Fund/ }, { FUNDDESC: /IDBI Equity Advantage Fund/ }, { FUNDDESC: /Sundaram Diversified Equity Fund/ }] }, { TD_AMT: { $gte: 0 } }, { TRDESC: { $not: /^Consolidation Out.*/ } }, { TRDESC: { $not: /^Redemption.*/ } }, { TRDESC: { $not: /^Rejection.*/ } }, { TRDESC: { $not: /^Gross Dividend.*/ } }, { TRDESC: { $not: /^Switch Over Out.*/ } }, { TRDESC: { $not: /^Dividend Paid.*/ } }, { TRDESC: { $not: /^Switchout.*/ } }, { TRDESC: { $not: /^Transfer-Out.*/ } }, { TRDESC: { $not: /^Lateral Shift Out.*/ } }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { STATUS:"$STATUS",TD_TRNO:"$TD_TRNO",INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0,PER_STATUS:"$_id.STATUS", TRXNNO:"$_id.TD_TRNO", INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
            { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
            { $sort: { TRADDATE: -1 } }
    ]
       pipeline2 = [  ///trans_franklin
           { $match: { $and: [{ IT_PAN_NO1: req.body.pan }, { $or: [{ SCHEME_NA1: /TAX/ }, { SCHEME_NA1: /Taxshield/ }] },  { AMOUNT: { $gte: 0 } }, { TRXN_TYPE: { $not: /^SIPR.*/ } }, { TRXN_TYPE: { $not: /^TO.*/ } }, { TRXN_TYPE: { $not: /^DP.*/ } }, { TRXN_TYPE: { $not: /^RED.*/ } }, { TRXN_TYPE: { $not: /^REDR.*/ } }, { TRXN_TYPE: { $not: /^Gross Dividend.*/ } }, { TRXN_TYPE: { $not: /^Dividend Paid.*/ } }, { TRXN_TYPE: { $not: /^SWOF.*/ } }, { TRXN_TYPE: { $not: /^Transfer-Out.*/ } }, { TRXN_TYPE: { $not: /^Lateral Shift Out.*/ } }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
            { $group: { _id: {  SOCIAL_S18:"$SOCIAL_S18",TRXN_NO:"$TRXN_NO", INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE"  } } },
            { $project: { _id: 0,PER_STATUS:"$_id.SOCIAL_S18",TRXNNO:"$_id.TRXN_NO", INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
            { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: { detail: 0 ,_id:0,TAX_STATUS:0,FOLIO_NO:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
            { $sort: { TRADDATE: -1 } }
    ]
    transc.aggregate(pipeline, (err, camsdata) => {
        transk.aggregate(pipeline1, (err, karvydata) => {
           transf.aggregate(pipeline2, (err, frankdata) => {
               if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                 resdata = {
                       status: 200,
                       message: 'Successfull',
                       data: frankdata
                   }
              
               var datacon = frankdata.concat(karvydata.concat(camsdata));
               
              datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                   .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                   .reverse().map(JSON.parse);
                   var newdata1 = datacon.map(item=>{
                       return [JSON.stringify(item),item]
                        }); // creates array of array
                   var maparr1 = new Map(newdata1); // create key value pair from array of array
                   datacon = [...maparr1.values()];//converting back to array from mapobject 
                datacon = datacon.map(function(obj) {
                  if(obj['GUARDIANN0']){
                      obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                      obj['GUARD_PAN'] = obj['GUARDPANNO'];
                       // Delete old key
                            delete obj['GUARDIANN0'];
                            delete obj['GUARDPANNO'];
                  }else if((obj['GUARDIANN0']) === ""){
                          obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                          obj['GUARD_PAN'] = obj['GUARDPANNO'];
                          delete obj['GUARDIANN0'];
                          delete obj['GUARDPANNO'];
                      }
                  if(obj['GUARDIAN20']){
                      obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                       // Delete old key
                      delete obj['GUARDIAN20'];
                  }else if((obj['GUARDIAN20']) === ""){
                      obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                      delete obj['GUARDIAN20'];
                  }
                      return obj;
                  });

                   for (var i = 0; i < datacon.length; i++) {
                       if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
                           datacon[i]['TRXN_NATUR'] = "SIP";
                       } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
                           datacon[i]['TRXN_NATUR'] = "SIPR";
                       } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
                           datacon[i]['TRXN_NATUR'] = "STP";
                       } if (datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "Fresh Purchase") {
                           datacon[i]['TRXN_NATUR'] = "Purchase";
                       }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
                          datacon[i]['TRXN_NATUR'] === "ADDPUR") {
                          datacon[i]['TRXN_NATUR'] = "Add. Purchase";
                      }if(datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || datacon[i]['TRXN_NATUR'] === "NFO Purchase" || 
                          datacon[i]['TRXN_NATUR'] === "Initial Allotment" || datacon[i]['TRXN_NATUR'] === "NEWPUR" ) {
                          datacon[i]['TRXN_NATUR'] = "Purchase";
                      }if(datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
                           || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
                           || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
                           datacon[i]['TRXN_NATUR'] = "Switch In";
                       }if(datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" )  {
                           datacon[i]['PER_STATUS'] = "Minor";   
			   datacon[i]['PAN'] = "";   
                       }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL") {
                            datacon[i]['PER_STATUS'] = "Individual";
                       }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
                           datacon[i]['PER_STATUS'] = "HUF";
                      }
                   }
                   resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime());
                   res.json(resdata);
                  return resdata;
                } else{
                    resdata = {
                        status: 400,
                        message: 'Data not found',
                    }
                    res.json(resdata);
                   return resdata;
                   }
                  
               });
           });
        });
              }       
           });
       }
   } catch (err) {
       console.log(err)
   }
   })

// app.post("/api/gettaxsavinguserwise", function (req, res) {
//     try{
//     var yer = req.body.fromyear;
//     var secyer = req.body.toyear;
//     yer = yer + "-04-01";
//     secyer = secyer + "-03-31"
//     var pan = req.body.pan;
//    if(req.body.pan != "" && req.body.name != ""){
//     pipeline = [  ///trans_cams
//         { $match: { $and: [{ SCHEME: /Tax/ }, { PAN: pan },{ INV_NAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { AMOUNT: { $gte: 0 } },{ TRXN_NATUR: { $not: /^Redemption.*/ } } , { TRXN_NATUR: { $not: /^Gross Dividend.*/ } },  { TRXN_NATUR: { $not: /^Dividend Paid.*/ } }, { TRXN_NATUR: { $not: /^Switchout.*/ } }, { TRXN_NATUR: { $not: /^Transfer-Out.*/ } }, { TRXN_NATUR: { $not: /^Lateral Shift Out.*/ } },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//         { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
//         { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }} },
//         { $sort: { TRADDATE: -1 } }
//     ]
//        pipeline1 = [  ///trans_karvy                                             
//         { $match: { $and: [{ FUNDDESC: /TAX/ }, { PAN1: pan },{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } , { TD_AMT: { $gte: 0 } } ,{ TRDESC: { $not: /^Consolidation Out.*/ } },{ TRDESC: { $not: /^Redemption.*/ } },{ TRDESC: { $not: /^Rejection.*/ } },{ TRDESC: { $not: /^Gross Dividend.*/ } },{ TRDESC: { $not: /^Switch Over Out.*/ } },  { TRDESC: { $not: /^Dividend Paid.*/ } }, { TRDESC: { $not: /^Switchout.*/ } }, { TRDESC: { $not: /^Transfer-Out.*/ } }, { TRDESC: { $not: /^Lateral Shift Out.*/ } },{ TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } } ] } },
//         { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
//         { $project: { _id: 0, INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
//         { $sort: { TRADDATE: -1 } }
//     ]
//        pipeline2 = [  ///trans_franklin
//         { $match: { $and: [{ SCHEME_NA1: /TAX/ }, { IT_PAN_NO1: pan }, { INVESTOR_2: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { AMOUNT: { $gte: 0 } } , { TRXN_TYPE: { $not: /^SIPR.*/ } },{ TRXN_TYPE: { $not: /^TO.*/ } },{ TRXN_TYPE: { $not: /^DP.*/ } },{ TRXN_TYPE: { $not: /^RED.*/ } },{ TRXN_TYPE: { $not: /^REDR.*/ } },{ TRXN_TYPE: { $not: /^Gross Dividend.*/ } }, { TRXN_TYPE: { $not: /^Dividend Paid.*/ } }, { TRXN_TYPE: { $not: /^SWOF.*/ } }, { TRXN_TYPE: { $not: /^Transfer-Out.*/ } }, { TRXN_TYPE: { $not: /^Lateral Shift Out.*/ } } , { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }  ] } },
//         { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE"  } } },
//         { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
//         { $sort: { TRADDATE: -1 } }
//     ]
//   }
//         transc.aggregate(pipeline, (err, camsdata) => {
//              transk.aggregate(pipeline1, (err, karvydata) => {
//                 transf.aggregate(pipeline2, (err, frankdata) => {
//                     if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
//                       resdata = {
//                             status: 200,
//                             message: 'Successfull',
//                             data: frankdata
//                         }
//                     } else {
//                         resdata = {
//                             status: 400,
//                             message: 'Data not found',
//                         }
//                     }
//                     var datacon = frankdata.concat(karvydata.concat(camsdata))
//                    datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                         .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                         .reverse().map(JSON.parse);
//                         for (var i = 0; i < datacon.length; i++) {
//                             if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
//                                 datacon[i]['TRXN_NATUR'] = "SIP";
//                             } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
//                                 datacon[i]['TRXN_NATUR'] = "SIPR";
//                             } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
//                                 datacon[i]['TRXN_NATUR'] = "STP";
//                             } if (datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "Fresh Purchase") {
//                                 datacon[i]['TRXN_NATUR'] = "Purchase";
//                             }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
//                             datacon[i]['TRXN_NATUR'] === "ADDPUR") {
//                                datacon[i]['TRXN_NATUR'] = "Add. Purchase";
//                            }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || datacon[i]['TRXN_NATUR'] === "NFO Purchase" || 
//                            datacon[i]['TRXN_NATUR'] === "Initial Allotment" || datacon[i]['TRXN_NATUR'] === "NEWPUR" ) {
//                                datacon[i]['TRXN_NATUR'] = "Purchase";
//                            }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
//                            || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
//                            || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
//                                datacon[i]['TRXN_NATUR'] = "Switch In";
//                            }
//                         }
//                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
//                     res.json(resdata)
//                     return resdata
//                 });
//              });
//          });
// } catch (err) {
//     console.log(err)
// }
// });

// app.post("/api/getsipstpuserwise", function (req, res) {
//     try{
//     var mon = parseInt(req.body.month);
//     var yer = parseInt(req.body.year);

//     var pan = req.body.pan;
//     if(req.body.pan != "" && req.body.name != ""){
//         const pipeline = [  ///trans_cams
//             { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT",TAX_STATUS:"$TAX_STATUS" ,TRADDATE: "$TRADDATE" } } },
//             { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR",  FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT" ,TAX_STATUS:"$_id.TAX_STATUS", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: pan }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'si' } } , { TRXN_NATUR: /Systematic/ } ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//         const pipeline1 = [  ///trans_karvy
//             { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC",  TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT",STATUS:"$STATUS", TD_TRDT: "$TD_TRDT" } } },
//             { $project: { _id: 0, INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC",STATUS:"$_id.STATUS" ,AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: pan } ,{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'si' } } , { TRXN_NATUR: /Systematic/ }  ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//         const pipeline2 = [  ///trans_franklin
//             { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1",SOCIAL_S18:"$SOCIAL_S18", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
//             { $project: { _id: 0, INVNAME: "$INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1",SOCIAL_S18:"$_id.SOCIAL_S18", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: pan } , { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'si' } }    ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]

//         transc.aggregate(pipeline, (err, camsdata) => {
//             transk.aggregate(pipeline1, (err, karvydata) => {
//                 transf.aggregate(pipeline2, (err, frankdata) => {
//                     if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
//                         resdata = {
//                             status: 200,
//                             message: 'Successfull',
//                             data: frankdata
//                         }
//                     } else {
//                         resdata = {
//                             status: 400,
//                             message: 'Data not found',
//                         }
//                     }
//                     datacon = frankdata.concat(karvydata.concat(camsdata))
//                     datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                         .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                         .reverse().map(JSON.parse);
//                     for (var i = 0; i < datacon.length; i++) {
//                         if (datacon[i]['TRXN_NATUR'].match(/Systematic.*/)) {
//                             datacon[i]['TRXN_NATUR'] = "SIP";
//                         }
//                         if ((Math.sign(datacon[i]['AMOUNT']) === -1)) {
//                             datacon[i]['TRXN_NATUR'] = "SIPR";
//                         }
//                         if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
//                             datacon[i]['TRXN_NATUR'] = "STP";
//                         }
//                     }
//                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
//                     res.json(resdata)
//                     return resdata
//                 });
//             });
//         });
//     }else{
//         resdata = {
//             status: 400,
//             message: 'Data not found',
//         }
//         res.json(resdata)
//          return resdata
//     }
// } catch (err) {
//     console.log(err)
// }
// })

app.post("/api/getsipstpuserwise", function (req, res) {
    try{
        var member="";
        var guardpan1=[];var guardpan2=[];
        var arr1=[];var arr2=[];var arr3=[];var alldata=[];var arrFolio=[];var arrName=[];
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if(req.body.month ===""){
            resdata = {
                status: 400,
                message: 'Please enter month',
            }
            res.json(resdata);
            return resdata;
        }else if(req.body.year ===""){
            resdata = {
                status: 400,
                message: 'Please enter year',
            }
            res.json(resdata);
            return resdata;
        }else if(req.body.pan ===""){
            resdata = {
                status: 400,
                message: 'Please enter pan',
            }
            res.json(resdata);
            return resdata;
        }else if(!regex.test(req.body.pan)) {
            resdata = {
                status: 400,
                message: 'Please enter valid pan',
            }
            res.json(resdata);
            return resdata;
        }else{
            var mon = parseInt(req.body.month);
            var yer = parseInt(req.body.year);
            family.find({ adminPan:  {$regex : `^${req.body.pan}.*` , $options: 'i' }  },{_id:0,memberPan:1}, function (err, member) {
                if(member!=""){
                    member  = [...new Set(member.map(({memberPan}) => memberPan.toUpperCase()))];
                    guardpan1.push({GUARD_PAN:req.body.pan.toUpperCase()});
                    guardpan2.push({GUARDPANNO:req.body.pan.toUpperCase()});
                    arr1.push({PAN:req.body.pan.toUpperCase()});
                    for(var j=0;j<member.length;j++){     
                    guardpan1.push({GUARD_PAN:member[j]}); 
                    guardpan2.push({GUARDPANNO:member[j]});
                    arr1.push({PAN:member[j]});
                    }
                    var strPan1 = {$or:guardpan1};
                    var strPan2 = {$or:guardpan2};
                    folioc.find(strPan1).distinct("FOLIOCHK", function (err, member1) {
                      foliok.find(strPan2).distinct("ACNO", function (err, member2) {
                      var alldata = member1.concat(member2);   
                            for(var j=0;j<alldata.length;j++){     
                                arr1.push({FOLIO_NO:alldata[j]});
                                }
                                var strFolio = {$or:arr1};

                        pipeline = [  ///trans_cams
                            { $group: { _id: {  TAX_STATUS:"$TAX_STATUS",TRXNNO:"$TRXNNO",INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT" ,TRADDATE: "$TRADDATE" } } },
                            { $project: { _id: 0,PER_STATUS:"$_id.TAX_STATUS", TRXNNO:"$_id.TRXNNO", INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR",  FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT" , TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
                            { $match: { $and: [{ month: mon }, { year: yer }, strFolio , { TRXN_NATUR: /Systematic/ } ] } },
                            { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
                            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                            { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
                            { $sort: { TRADDATE: -1 } }                      
                        ]
                         pipeline1 = [  ///trans_karvy
                            { $group: { _id: { STATUS:"$STATUS",TD_TRNO:"$TD_TRNO",INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC",  TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
                            { $project: { _id: 0, PER_STATUS:"$_id.STATUS", TRXNNO:"$_id.TD_TRNO", INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC" ,AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
                            { $match: { $and: [{ month: mon }, { year: yer }, strFolio , { TRXN_NATUR: /Systematic/ }  ] } },
                            { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
                            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                            { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
                            { $sort: { TRADDATE: -1 } }
                        ]
                         pipeline2 = [  ///trans_franklin
                            { $group: { _id: {SOCIAL_S18:"$SOCIAL_S18",TRXN_NO:"$TRXN_NO", INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
                            { $project: { _id: 0,PER_STATUS:"$_id.SOCIAL_S18",TRXNNO:"$_id.TRXN_NO", INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
                            { $match: { $and: [{ month: mon }, { year: yer }, strFolio , { TRXN_NATUR: /SIP/ } ] } },
                            { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
                            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                            { $project: { detail: 0 ,_id:0,TAX_STATUS:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
                            { $sort: { TRADDATE: -1 } }
                        ]
                         transc.aggregate(pipeline, (err, camsdata) => {
                            transk.aggregate(pipeline1, (err, karvydata) => {
                                transf.aggregate(pipeline2, (err, frankdata) => {
                                    if (frankdata != 0 || karvydata != 0 || camsdata != 0) {
                                        resdata = {
                                            status: 200,
                                            message: 'Successfull',
                                            data: frankdata
                                        }
                                        datacon = frankdata.concat(karvydata.concat(camsdata));
                                       
                                        datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                            .reverse().map(JSON.parse);
                                            datacon = Array.from(new Set(datacon));
                                            var newdata1 = datacon.map(item=>{
                                                return [JSON.stringify(item),item]
                                                 }); // creates array of array
                                                 var maparr1 = new Map(newdata1); // create key value pair from array of array
                                                 datacon = [...maparr1.values()];//converting back to array from mapobject 
                                                 
                                                 datacon = datacon.map(function(obj) {
                                                    if(obj['GUARDIANN0']){
                                                        obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                                                        obj['GUARD_PAN'] = obj['GUARDPANNO'];
                                                         // Delete old key
                                                              delete obj['GUARDIANN0'];
                                                              delete obj['GUARDPANNO'];
                                                    }else if((obj['GUARDIANN0']) === ""){
                                                            obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                                                            obj['GUARD_PAN'] = obj['GUARDPANNO'];
                                                            delete obj['GUARDIANN0'];
                                                            delete obj['GUARDPANNO'];
                                                        }
                                                    if(obj['GUARDIAN20']){
                                                        obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                                                         // Delete old key
                                                        delete obj['GUARDIAN20'];
                                                    }else if((obj['GUARDIAN20']) === ""){
                                                        obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                                                        delete obj['GUARDIAN20'];
                                                    }
                                                        return obj;
                                                    
                                                    });
                                        for (var i = 0; i < datacon.length; i++) {
                                                if (datacon[i]['TRXN_NATUR'].match(/^Systematic/)) {
                                                    datacon[i]['TRXN_NATUR'] = "SIP";
                                                }
                                                if(Math.sign(datacon[i]['AMOUNT']) === -1){
                                                    datacon[i]['TRXN_NATUR'] = "SIPR";
                                                }
                                                if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
                                                    datacon[i]['TRXN_NATUR'] = "STP";
                                                }if (datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" )  {
                                                    datacon[i]['PER_STATUS'] = "Minor";   
						    datacon[i]['PAN'] = "";  
                                                 }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL" || datacon[i]['PER_STATUS'] === "Resident Individual") {
                                                         datacon[i]['PER_STATUS'] = "Individual";
                                               }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
                                                         datacon[i]['PER_STATUS'] = "HUF";
                                               }
                                            }                 
                                            resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime());
                                            res.json(resdata);
                                           return resdata;
                                           } else{
                                            resdata = {
                                                status: 400,
                                                message: 'Data not found',
                                            }
                                            res.json(resdata);
                                           return resdata;
                                           }
                                           
                                        });
                                    });
                                 });
                               });
                           });
                               }else{
                                //console.log("fff",allPan);
                                pipeline = [  ///trans_cams
                                    { $group: { _id: {  TAX_STATUS:"$TAX_STATUS",TRXNNO:"$TRXNNO",INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT" ,TRADDATE: "$TRADDATE" } } },
                                    { $project: { _id: 0,PER_STATUS:"$_id.TAX_STATUS", TRXNNO:"$_id.TRXNNO", INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR",  FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT" , TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
                                    { $match: { $and: [{ month: mon }, { year: yer }, {PAN:req.body.pan}, { TRXN_NATUR: /Systematic/ } ] } },
                                    { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
                                    { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                                    { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
                                    { $sort: { TRADDATE: -1 } }                      
                                ]
                                 pipeline1 = [  ///trans_karvy
                                    { $group: { _id: { STATUS:"$STATUS",TD_TRNO:"$TD_TRNO",INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC",  TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
                                    { $project: { _id: 0, PER_STATUS:"$_id.STATUS", TRXNNO:"$_id.TD_TRNO", INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC" ,AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
                                    { $match: { $and: [{ month: mon }, { year: yer },{PAN:req.body.pan}, { TRXN_NATUR: /Systematic/ }  ] } },
                                    { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
                                    { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                                    { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
                                    { $sort: { TRADDATE: -1 } }
                                ]
                                 pipeline2 = [  ///trans_franklin
                                    { $group: { _id: {SOCIAL_S18:"$SOCIAL_S18",TRXN_NO:"$TRXN_NO", INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
                                    { $project: { _id: 0,PER_STATUS:"$_id.SOCIAL_S18",TRXNNO:"$_id.TRXN_NO", INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
                                    { $match: { $and: [{ month: mon }, { year: yer },{PAN:req.body.pan} , { TRXN_NATUR: /SIP/ } ] } },
                                    { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
                                    { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                                    { $project: { detail: 0 ,_id:0,TAX_STATUS:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
                                    { $sort: { TRADDATE: -1 } }
                                ]
                        
                                transc.aggregate(pipeline, (err, camsdata) => {
                                    transk.aggregate(pipeline1, (err, karvydata) => {
                                        transf.aggregate(pipeline2, (err, frankdata) => {
                                            if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                                                resdata = {
                                                    status: 200,
                                                    message: 'Successfull',
                                                    data: frankdata
                                                }
                                           
                                            datacon = frankdata.concat(karvydata.concat(camsdata))
                                            datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                                .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                                .reverse().map(JSON.parse);
                                            for (var i = 0; i < datacon.length; i++) {
                                                if (datacon[i]['TRXN_NATUR'].match(/Systematic.*/)) {
                                                    datacon[i]['TRXN_NATUR'] = "SIP";
                                                }
                                                if ((Math.sign(datacon[i]['AMOUNT']) === -1)) {
                                                    datacon[i]['TRXN_NATUR'] = "SIPR";
                                                }
                                                if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
                                                    datacon[i]['TRXN_NATUR'] = "STP";
                                                }
                                            }
                                            resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                                            res.json(resdata)
                                            return resdata;
                                        } else {
                                            resdata = {
                                                status: 400,
                                                message: 'Data not found',
                                            }
                                        }
                                        });
                                    });
                                });
                                  }       
                               });
                           }
                       } catch (err) {
                           console.log(err)
                       }
                       })

// app.post("/api/getdividendscheme", function (req, res) {
//     try{
//     var yer = req.body.fromyear;
//     var secyer = req.body.toyear;
//     yer = yer + "-04-01";
//     secyer = secyer + "-03-31"
//     if(req.body.pan != "" && req.body.name != ""){
//     const pipeline = [  ///trans_cams                                                     
//         { $match: { $and: [{ TRXN_NATUR: /Div/ }, { SCHEME: req.body.scheme },{ INV_NAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { PAN: req.body.pan }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//         { $group: { _id: { INV_NAME: "$INV_NAME", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
//         { $project: { _id: 0, INVNAME: "$_id.INV_NAME", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } } } },
//     ]
//     const pipeline1 = [  ///trans_karvy
//         { $match: { $and: [{ TRDESC: /Div/ }, { FUNDDESC: req.body.scheme },{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } , { PAN1: req.body.pan }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//         { $group: { _id: { INVNAME: "$INVNAME", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
//         { $project: { _id: 0, INVNAME: "$_id.INVNAME", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
//     ]
//     const pipeline2 = [  ///trans_franklin
//         { $match: { $and: [{ TRXN_TYPE: /Div/ }, { SCHEME_NA1: req.body.scheme },{ INVESTOR_2: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { IT_PAN_NO1: req.body.pan }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//         { $group: { _id: { INVESTOR_2: "$INVESTOR_2", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
//         { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
//     ]

//     transc.aggregate(pipeline, (err, camsdata) => {
//         transk.aggregate(pipeline1, (err, karvydata) => {
//             transf.aggregate(pipeline2, (err, frankdata) => {
//                 if (camsdata != 0 || karvydata != 0 || frankdata != 0) {
//                     resdata = {
//                         status: 200,
//                         message: 'Successfull',
//                         data: frankdata
//                     }
//                 } else {
//                     resdata = {
//                         status: 400,
//                         message: 'Data not found',
//                     }
//                 }
//                 var datacon = frankdata.concat(karvydata.concat(camsdata))
//                 datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                     .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                     .reverse().map(JSON.parse);
//                 for (var i = 0; i < datacon.length; i++) {
//                     if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
//                         datacon[i]['TRXN_NATUR'] = "Dividend Payout";
//                     } if (datacon[i]['TRXN_NATUR'].match(/Div. Rei.*/) || datacon[i]['TRXN_NATUR'].match(/Dividend Reinvest*/)) {
//                         datacon[i]['TRXN_NATUR'] = "Div. Reinv.";
//                     } if (datacon[i]['TRXN_NATUR'].match(/Dividend Paid*/)) {
//                         datacon[i]['TRXN_NATUR'] = "Div. Paid";
//                     }
//                 }
//                 resdata.data = datacon;
//                 resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
//                 res.json(resdata)
//                 return resdata
//             });
//         });
//     });
// }else{
//     resdata = {
//         status: 400,
//         message: 'Data not found',
//     }
// 	 res.json(resdata)
//          return resdata
// }
// } catch (err) {
//     console.log(err)
// }
// });

app.post("/api/getdividendscheme", function (req, res) {
    try{
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if(req.body.fromyear ===""){
            resdata = {
                status: 400,
                message: 'Please enter from year',
            }           
        }else if(req.body.toyear ===""){
            resdata = {
                status: 400,
                message: 'Please enter to year',
            }
        }else if(req.body.pan ===""){
            resdata = {
                status: 400,
                message: 'Please enter pan',
            }
        }else if(!regex.test(req.body.pan)) {
            resdata = {
                status: 400,
                message: 'Please enter valid pan',
            }
        }else if(req.body.scheme ===""){
                resdata = {
                    status: 400,
                    message: 'Please enter scheme',
                }
        } else{
            
    var yer = req.body.fromyear;
    var secyer = req.body.toyear;
    yer = yer + "-04-01";
    secyer = secyer + "-03-31"
//    if(req.body.pan != "" ){
    const pipeline = [  ///trans_cams                                                     
        { $match: { $and: [{ TRXN_NATUR: /Div/ }, { SCHEME: req.body.scheme },{ PAN: req.body.pan }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { INV_NAME: "$INV_NAME", SCHEME: "$SCHEME", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
        { $project: { _id: 0, INVNAME: "$_id.INV_NAME", SCHEME: "$_id.SCHEME", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } } } },
    ]
    const pipeline1 = [  ///trans_karvy
        { $match: { $and: [{ TRDESC: /Div/ }, { FUNDDESC: req.body.scheme }, { PAN1: req.body.pan }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { INVNAME: "$INVNAME", FUNDDESC: "$FUNDDESC", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
        { $project: { _id: 0, INVNAME: "$_id.INVNAME", SCHEME: "$_id.FUNDDESC", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } } } },
    ]
    const pipeline2 = [  ///trans_franklin
        { $match: { $and: [{ $or: [{ TRXN_TYPE: /DIR/ }, { TRXN_TYPE: /DP/ }] }, { SCHEME_NA1: req.body.scheme }, { IT_PAN_NO1: req.body.pan }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
        { $group: { _id: { INVESTOR_2: "$INVESTOR_2", SCHEME_NA1: "$SCHEME_NA1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
        { $project: { _id: 0, INVNAME: "$_id.INVESTOR_2", SCHEME: "$_id.SCHEME_NA1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } } } },
    ]
    transc.aggregate(pipeline, (err, camsdata) => {
        transk.aggregate(pipeline1, (err, karvydata) => {
            transf.aggregate(pipeline2, (err, frankdata) => {
                if (camsdata != 0 || karvydata != 0 || frankdata != 0) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: frankdata
                    }
                    var datacon = frankdata.concat(karvydata.concat(camsdata));

                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                    .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                    .reverse().map(JSON.parse);
                for (var i = 0; i < datacon.length; i++) {
                    if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
                        datacon[i]['TRXN_NATUR'] = "Dividend Payout";
                    } if (datacon[i]['TRXN_NATUR'].match(/Div. Rei.*/) || datacon[i]['TRXN_NATUR'].match(/Dividend Reinvest*/)) {
                        datacon[i]['TRXN_NATUR'] = "Div. Reinv.";
                    } if (datacon[i]['TRXN_NATUR'].match(/Dividend Paid*/)) {
                        datacon[i]['TRXN_NATUR'] = "Div. Paid";
                    }
                }
                //resdata.data = datacon;
                resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                res.json(resdata)
                return resdata
                } else {
                    resdata = {
                        status: 400,
                        message: 'Data not found',
                    }
                }
                
            });
        });
    });
        }
} catch (err) {
    console.log(err)
}
});
// app.post("/api/getdividend1", function (req, res) {
//     try{
//     var yer = req.body.fromyear;
//     var secyer = req.body.toyear;
//     yer = yer + "-04-01";
//     secyer = secyer + "-03-31"
//    if(req.body.pan != "" && req.body.name != ""){
//     const pipeline = [  ///trans_cams                                                     
//         { $match: { $and: [{ TRXN_NATUR: /Div/ }, { PAN: req.body.pan }, { INV_NAME: {$regex : `^${req.body.name}.*` , $options: 'i' } },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//         { $group: { _id: { SCHEME: "$SCHEME", INV_NAME: "$INV_NAME" }, AMOUNT: { $sum: "$AMOUNT" } } },
//         { $project: { _id: 0, SCHEME: "$_id.SCHEME", INVNAME: "$_id.INV_NAME", AMOUNT: { $sum: "$AMOUNT" } } },
//     ]
//     const pipeline1 = [  ///trans_karvy
//         { $match: { $and: [{ TRDESC: /Div/ }, { PAN1: req.body.pan },{ INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//         { $group: { _id: { FUNDDESC: "$FUNDDESC", INVNAME: "$INVNAME" }, TD_AMT: { $sum: "$TD_AMT" } } },
//         { $project: { _id: 0, SCHEME: "$_id.FUNDDESC", INVNAME: "$_id.INVNAME", AMOUNT: { $sum: "$TD_AMT" } } },
//     ]
//     const pipeline2 = [  ///trans_franklin
//         { $match: { $and: [{ TRXN_TYPE: /Div/ }, { IT_PAN_NO1: req.body.pan },{ INVESTOR_2: {$regex : `^${req.body.name}.*` , $options: 'i' } }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//         { $group: { _id: { SCHEME_NA1: "$SCHEME_NA1", INVESTOR_2: "$INVESTOR_2" }, AMOUNT: { $sum: "$AMOUNT" } } },
//         { $project: { _id: 0, SCHEME: "$_id.SCHEME_NA1", INVNAME: "$_id.INVESTOR_2", AMOUNT: { $sum: "$AMOUNT" } } },

//     ]

//     transc.aggregate(pipeline, (err, newdata) => {
//         transk.aggregate(pipeline1, (err, newdata1) => {
//             transf.aggregate(pipeline2, (err, newdata2) => {
//                 if (newdata != 0 || newdata1 != 0 || newdata2 != 0) {
//                     resdata = {
//                         status: 200,
//                         message: 'Successfull',
//                         data: newdata2
//                     }
//                 } else {
//                     resdata = {
//                         status: 400,
//                         message: 'Data not found',
//                     }
//                 }
//                 var datacon = newdata2.concat(newdata1.concat(newdata))
//                 datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                     .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                     .reverse().map(JSON.parse);
//                 resdata.data = datacon;
//                 res.json(resdata)
//                 return resdata
//             });
//         });
//     })
// }else{
//     resdata = {
//         status: 400,
//         message: 'Data not found',
//     }
// 	 res.json(resdata)
//          return resdata
// }
// } catch (err) {
//     console.log(err)
// }
// });

// app.post("/api/getdividend2", function (req, res) {
//     try{
//         var member="";
//         var arr1=[];var arr2=[];var arr3=[];var alldata=[];var arrFolio=[];var arrName=[];
//         let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
//         if(req.body.fromyear ===""){
//             resdata = {
//                 status: 400,
//                 message: 'Please enter from year',
//             }
            
//         }else if(req.body.toyear ===""){
//             resdata = {
//                 status: 400,
//                 message: 'Please enter to year',
//             }
//         }else if(req.body.pan ===""){
//             resdata = {
//                 status: 400,
//                 message: 'Please enter pan',
//             }
//         }else if(!regex.test(req.body.pan)) {
//             resdata = {
//                 status: 400,
//                 message: 'Please enter valid pan',
//             }
//         }else{
            
//             var yer = req.body.fromyear;
//             var secyer = req.body.toyear;
//             yer = yer + "-04-01";
//             secyer = secyer + "-03-31"

//             family.find({ adminPan:  {$regex : `^${req.body.pan}.*` , $options: 'i' }  },{_id:0,memberPan:1}, function (err, member) {
//                 if(member!=""){
//                     member  = [...new Set(member.map(({memberPan}) => memberPan.toUpperCase()))];
//                     arr1.push({PAN:req.body.pan.toUpperCase()});
//                     arr2.push({GUARD_PAN:req.body.pan.toUpperCase()});
//                     arr3.push({GUARDPANNO:req.body.pan.toUpperCase()});
//                     for(var j=0;j<member.length;j++){     
//                     arr1.push({PAN:member[j]}); 
//                     arr2.push({GUARD_PAN:member[j]});
//                     arr3.push({GUARDPANNO:member[j]});
//                     }
//                     var strPan2 = {$or:arr2};
//                     var strPan3 = {$or:arr3};

//                     folioc.find(strPan2).distinct("FOLIOCHK", function (err, member1) {
//                       foliok.find(strPan3).distinct("ACNO", function (err, member2) {
//                       var alldata = member1.concat(member2);   
//                             for(var j=0;j<alldata.length;j++){     
//                                 arr1.push({FOLIO_NO:alldata[j]});
//                                 arr2.push({TD_ACNO:alldata[j]});
//                                 arr3.push({FOLIO_NO:alldata[j]});
//                                 }
//                              var strFolio = {$or:arr1};
//                              var strFolio1 = {$or:arr2};
//                              var strFolio2 = {$or:arr3};
                            
//     const pipeline = [  ///trans_cams                                                     
//             { $match: { $and: [strFolio,{ TRXN_NATUR: /Div/ },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//             { $group: { _id: { PAN:"$PAN", TAX_STATUS:"$TAX_STATUS",SCHEME: "$SCHEME",FOLIO_NO:"$FOLIO_NO", INV_NAME: "$INV_NAME" }, AMOUNT: { $sum: "$AMOUNT" } } },
//             { $project: { _id: 0,PAN:"$_id.PAN", PER_STATUS:"$_id.TAX_STATUS",SCHEME: "$_id.SCHEME",FOLIO_NO:"$_id.FOLIO_NO", INVNAME: "$_id.INV_NAME", AMOUNT: { $sum: "$AMOUNT" } } },
//             { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
//             { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
//             { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
//             { $sort: { TRADDATE: -1 } }
//     ]
//     const pipeline1 = [  ///trans_karvy
//             { $match: { $and: [ strFolio1, { TRDESC: /Div/ }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//             { $group: { _id: { PAN1:"$PAN1",STATUS:"$STATUS",FUNDDESC: "$FUNDDESC", TD_ACNO:"$TD_ACNO",INVNAME: "$INVNAME" }, TD_AMT: { $sum: "$TD_AMT" } } },
//             { $project: { _id: 0,PAN:"$_id.PAN1",PER_STATUS:"$_id.STATUS", SCHEME: "$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO", INVNAME: "$_id.INVNAME", AMOUNT: { $sum: "$TD_AMT" } } },
//             { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
//             { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
//             { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
//             { $sort: { TRADDATE: -1 } }
//     ]
//     const pipeline2 = [  ///trans_franklin
//             { $match: { $and: [strFolio2, { $or: [{ TRXN_TYPE: /DIR/ }, { TRXN_TYPE: /DP/ }] }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//             { $group: { _id: { IT_PAN_NO1:"$IT_PAN_NO1",SOCIAL_S18:"$SOCIAL_S18",SCHEME_NA1: "$SCHEME_NA1",FOLIO_NO:"$FOLIO_NO", INVESTOR_2: "$INVESTOR_2" }, AMOUNT: { $sum: "$AMOUNT" } } },
//             { $project: { _id: 0,PAN:"$_id.IT_PAN_NO1",PER_STATUS:"$_id.SOCIAL_S18", SCHEME: "$_id.SCHEME_NA1", FOLIO_NO:"$_id.FOLIO_NO",INVNAME: "$_id.INVESTOR_2", AMOUNT: { $sum: "$AMOUNT" } } },
//             { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
//             { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
//             { $project: { detail: 0 ,_id:0,TAX_STATUS:0,FOLIO_NO:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
//             { $sort: { TRADDATE: -1 } }
//     ]

//     transc.aggregate(pipeline, (err, camsdata) => {
//         transk.aggregate(pipeline1, (err, karvydata) => {
//             transf.aggregate(pipeline2, (err, frankdata) => {
//                 if (camsdata != 0 || karvydata != 0 || frankdata != 0) {
//                     resdata = {
//                         status: 200,
//                         message: 'Successfull',
//                         data: frankdata
//                     }
               
//                 var datacon = frankdata.concat(karvydata.concat(camsdata))
//                 datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                         .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                         .reverse().map(JSON.parse);
//                         var newdata1 = datacon.map(item=>{
//                             return [JSON.stringify(item),item]
//                              }); // creates array of array
//                         var maparr1 = new Map(newdata1); // create key value pair from array of array
//                         datacon = [...maparr1.values()];//converting back to array from mapobject 
//                      datacon = datacon.map(function(obj) {
//                        if(obj['GUARDIANN0']){
//                            obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
//                            obj['GUARD_PAN'] = obj['GUARDPANNO'];
//                             // Delete old key
//                                  delete obj['GUARDIANN0'];
//                                  delete obj['GUARDPANNO'];
//                        }else if((obj['GUARDIANN0']) === ""){
//                                obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
//                                obj['GUARD_PAN'] = obj['GUARDPANNO'];
//                                delete obj['GUARDIANN0'];
//                                delete obj['GUARDPANNO'];
//                            }
//                        if(obj['GUARDIAN20'] === ""){
//                            obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
//                             // Delete old key
//                            delete obj['GUARDIAN20'];
//                        }else if((obj['GUARDIAN20']) === ""){
//                            obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
//                            delete obj['GUARDIAN20'];
//                        }
//                            return obj;
//                        });
//                        for (var i = 0; i < datacon.length; i++) {
//                        if(datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" )  {
//                         datacon[i]['PER_STATUS'] = "Minor";      
//                     }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL") {
//                          datacon[i]['PER_STATUS'] = "Individual";
//                     }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
//                         datacon[i]['PER_STATUS'] = "HUF";
//                    }
//                 }
//                 resdata.data = datacon;
//                 res.json(resdata);
//                 return resdata;
//                 } else{
//                     resdata = {
//                         status: 400,
//                         message: 'Data Not Found',
//                     }
//                     res.json(resdata);
//                     return resdata;
//                 }
                
//              });
//          });
//       });
//     });
// });
//     }else{     
//              pipeline = [  ///trans_cams                                                                    
//                 { $match: { $and: [{ TRXN_NATUR: /Div/ },{ PAN: req.body.pan }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//                 { $group: { _id: { PAN:"$PAN", TAX_STATUS:"$TAX_STATUS",SCHEME: "$SCHEME",FOLIO_NO:"$FOLIO_NO", INV_NAME: "$INV_NAME" }, AMOUNT: { $sum: "$AMOUNT" } } },
//                 { $project: { _id: 0,PAN:"$_id.PAN", PER_STATUS:"$_id.TAX_STATUS",SCHEME: "$_id.SCHEME",FOLIO_NO:"$_id.FOLIO_NO", INVNAME: "$_id.INV_NAME", AMOUNT: { $sum: "$AMOUNT" } } },
//                 { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
//                 { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
//                 { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
//                 { $sort: { TRADDATE: -1 } }
//             ]
//              pipeline1 = [  ///trans_karvy
//                 { $match: { $and: [{ TRDESC: /Div/ }, { PAN1: req.body.pan }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//                 { $group: { _id: { PAN1:"$PAN1",STATUS:"$STATUS",FUNDDESC: "$FUNDDESC", TD_ACNO:"$TD_ACNO",INVNAME: "$INVNAME" }, TD_AMT: { $sum: "$TD_AMT" } } },
//                 { $project: { _id: 0,PAN:"$_id.PAN1",PER_STATUS:"$_id.STATUS", SCHEME: "$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO", INVNAME: "$_id.INVNAME", AMOUNT: { $sum: "$TD_AMT" } } },
//                 { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
//                 { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
//                 { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
//                 { $sort: { TRADDATE: -1 } }
//             ]
//              pipeline2 = [  ///trans_franklin
//                 { $match: { $and: [ { $or: [{ TRXN_TYPE: /DIR/ }, { TRXN_TYPE: /DP/ }] },{ IT_PAN_NO1: req.body.pan }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
//                 { $group: { _id: { IT_PAN_NO1:"$IT_PAN_NO1",SOCIAL_S18:"$SOCIAL_S18",SCHEME_NA1: "$SCHEME_NA1",FOLIO_NO:"$FOLIO_NO", INVESTOR_2: "$INVESTOR_2" }, AMOUNT: { $sum: "$AMOUNT" } } },
//                 { $project: { _id: 0,PAN:"$_id.IT_PAN_NO1",PER_STATUS:"$_id.SOCIAL_S18", SCHEME: "$_id.SCHEME_NA1", FOLIO_NO:"$_id.FOLIO_NO",INVNAME: "$_id.INVESTOR_2", AMOUNT: { $sum: "$AMOUNT" } } },
//                 { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
//                 { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
//                 { $project: { detail: 0 ,_id:0,TAX_STATUS:0,FOLIO_NO:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
//                 { $sort: { TRADDATE: -1 } }
//             ]       
//             transc.aggregate(pipeline, (err, camsdata) => {
//                 transk.aggregate(pipeline1, (err, karvydata) => {
//                     transf.aggregate(pipeline2, (err, frankdata) => {
//                         if (camsdata != 0 || karvydata != 0 || frankdata != 0) {
//                             resdata = {
//                                 status: 200,
//                                 message: 'Successfull',
//                                 data: frankdata
//                             } 
//                         var datacon = frankdata.concat(karvydata.concat(camsdata))
//                         datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                             .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                             .reverse().map(JSON.parse);
//                         resdata.data = datacon;
//                         res.json(resdata);
//                         return resdata;
//                     }else {
//                         resdata = {
//                             status: 400,
//                             message: 'Data not found',
//                         }
//                         res.json(resdata);
//                         return resdata;
//                     }
//                 });
//             });
//         });
//      }
//  });       
//     }
// } catch (err) {
// console.log(err)
// }
// });

app.post("/api/getdividend", function (req, res) {
    try{
        var member="";
        var guardpan1=[];var guardpan2=[];var alldata=[];var arrFolio=[];var arrName=[];
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if(req.body.fromyear ===""){
            resdata = {
                status: 400,
                message: 'Please enter from year',
            }
            
        }else if(req.body.toyear ===""){
            resdata = {
                status: 400,
                message: 'Please enter to year',
            }
        }else if(req.body.pan ===""){
            resdata = {
                status: 400,
                message: 'Please enter pan',
            }
        }else if(!regex.test(req.body.pan)) {
            resdata = {
                status: 400,
                message: 'Please enter valid pan',
            }
        }else{
            
            var yer = req.body.fromyear;
            var secyer = req.body.toyear;
            yer = yer + "-04-01";
            secyer = secyer + "-03-31"
            var arr1=[];var arr2=[];var arr3=[];
            family.find({ adminPan:  {$regex : `^${req.body.pan}.*` , $options: 'i' }  },{_id:0,memberPan:1}, function (err, member) {
                if(member!=""){
                    member  = [...new Set(member.map(({memberPan}) => memberPan.toUpperCase()))];
                    guardpan1.push({GUARD_PAN:req.body.pan.toUpperCase()});
                    guardpan2.push({GUARDPANNO:req.body.pan.toUpperCase()});
                    arr1.push({PAN:req.body.pan.toUpperCase()});
                    arr2.push({PAN1:req.body.pan.toUpperCase()});
                    arr3.push({IT_PAN_NO1:req.body.pan.toUpperCase()});
                    for(var j=0;j<member.length;j++){     
                        guardpan1.push({GUARD_PAN:member[j]}); 
                        guardpan2.push({GUARDPANNO:member[j]});
                        arr1.push({PAN:member[j]});
                        arr2.push({PAN1:member[j]});
                        arr3.push({IT_PAN_NO1:member[j]});
                    }
                    var strPan1 = {$or:guardpan1};
                    var strPan2 = {$or:guardpan2};
                    
                    //arr1.push({PAN:arr1});
                  
                    folioc.find(strPan1).distinct("FOLIOCHK", function (err, member1) {
                      foliok.find(strPan2).distinct("ACNO", function (err, member2) {
                      var alldata = member1.concat(member2);   
                     
                     
                            for(var j=0;j<alldata.length;j++){     
                                arr1.push({FOLIO_NO:alldata[j]});
                                arr2.push({TD_ACNO:alldata[j]});
                                arr3.push({FOLIO_NO:alldata[j]});
                                }
                               
                             var strFolio = {$or:arr1};
                             var strFolio1 = {$or:arr2};
                             var strFolio2 = {$or:arr3};
                            
     pipeline = [  ///trans_cams                                                     
            { $match: { $and: [strFolio,{ TRXN_NATUR: /Div/ },{ TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { PAN:"$PAN", TAX_STATUS:"$TAX_STATUS",SCHEME: "$SCHEME",FOLIO_NO:"$FOLIO_NO", INV_NAME: "$INV_NAME"  }, AMOUNT: { $sum: "$AMOUNT" } } },
            { $project: { _id: 0,PAN:"$_id.PAN", PER_STATUS:"$_id.TAX_STATUS",SCHEME: "$_id.SCHEME",FOLIO_NO:"$_id.FOLIO_NO", INVNAME: "$_id.INV_NAME", AMOUNT: { $sum: "$AMOUNT"  } } },
            { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
            { $sort: { TRADDATE: -1 } }
    ]
     pipeline1 = [  ///trans_karvy
            { $match: { $and: [ strFolio1, { $or: [{TD_TRTYPE:/DIV/},{TRDESC: /.*Div.*/ } ]}, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { PAN1:"$PAN1",STATUS:"$STATUS",FUNDDESC: "$FUNDDESC", TD_ACNO:"$TD_ACNO",INVNAME: "$INVNAME" }, TD_AMT: { $sum: "$TD_AMT" } } },
            { $project: { _id: 0,PAN:"$_id.PAN1",PER_STATUS:"$_id.STATUS", SCHEME: "$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO", INVNAME: "$_id.INVNAME", AMOUNT: { $sum: "$TD_AMT"  } } },
            { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
            { $sort: { TRADDATE: -1 } }
    ]
     pipeline2 = [  ///trans_franklin
            { $match: { $and: [strFolio2, { $or: [{ TRXN_TYPE: /DIR/ }, { TRXN_TYPE: /DP/ }] }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
            { $group: { _id: { IT_PAN_NO1:"$IT_PAN_NO1",SOCIAL_S18:"$SOCIAL_S18",SCHEME_NA1: "$SCHEME_NA1",FOLIO_NO:"$FOLIO_NO", INVESTOR_2: "$INVESTOR_2" }, AMOUNT: { $sum: "$AMOUNT" } } },
            { $project: { _id: 0,PAN:"$_id.IT_PAN_NO1",PER_STATUS:"$_id.SOCIAL_S18", SCHEME: "$_id.SCHEME_NA1", FOLIO_NO:"$_id.FOLIO_NO",INVNAME: "$_id.INVESTOR_2", AMOUNT: { $sum: "$AMOUNT" } } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
            { $project: { detail: 0 ,_id:0,TAX_STATUS:0,FOLIO_NO:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
            { $sort: { TRADDATE: -1 } }
    ]

    transc.aggregate(pipeline, (err, camsdata) => {
        transk.aggregate(pipeline1, (err, karvydata) => {
            transf.aggregate(pipeline2, (err, frankdata) => {
                if ( karvydata != 0 ) {
                    resdata = {
                        status: 200,
                        message: 'Successfull',
                        data: frankdata
                    }
               
                var datacon = frankdata.concat(karvydata.concat(camsdata));
                //console.log(datacon)
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse);
                        var newdata1 = datacon.map(item=>{
                            return [JSON.stringify(item),item]
                             }); // creates array of array
                        var maparr1 = new Map(newdata1); // create key value pair from array of array
                        datacon = [...maparr1.values()];//converting back to array from mapobject 
                     datacon = datacon.map(function(obj) {
                       if(obj['GUARDIANN0']){
                           obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                           obj['GUARD_PAN'] = obj['GUARDPANNO'];
                            // Delete old key
                                 delete obj['GUARDIANN0'];
                                 delete obj['GUARDPANNO'];
                       }else if((obj['GUARDIANN0']) === ""){
                               obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                               obj['GUARD_PAN'] = obj['GUARDPANNO'];
                               delete obj['GUARDIANN0'];
                               delete obj['GUARDPANNO'];
                           }
                       if(obj['GUARDIAN20'] === ""){
                           obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                            // Delete old key
                           delete obj['GUARDIAN20'];
                       }else if((obj['GUARDIAN20']) === ""){
                           obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                           delete obj['GUARDIAN20'];
                       }
                           return obj;
                       });
                       for (var i = 0; i < datacon.length; i++) {
                       if(datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" )  {
                        datacon[i]['PER_STATUS'] = "Minor";      
			datacon[i]['PAN'] = "";      
                    }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL") {
                         datacon[i]['PER_STATUS'] = "Individual";
                    }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
                        datacon[i]['PER_STATUS'] = "HUF";
                   }
                }
                resdata.data = datacon;
                res.json(resdata);
                return resdata;
                } else{
                    resdata = {
                        status: 400,
                        message: 'Data Not Found',
                    }
                    res.json(resdata);
                    return resdata;
                }
                
              });
          });
      });
    });
});
    }else{     
             pipeline = [  ///trans_cams                                                                    
                { $match: { $and: [{ TRXN_NATUR: /Div/ },{ PAN: req.body.pan }, { TRADDATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                { $group: { _id: { PAN:"$PAN", TAX_STATUS:"$TAX_STATUS",SCHEME: "$SCHEME",FOLIO_NO:"$FOLIO_NO", INV_NAME: "$INV_NAME" }, AMOUNT: { $sum: "$AMOUNT" } } },
                { $project: { _id: 0,PAN:"$_id.PAN", PER_STATUS:"$_id.TAX_STATUS",SCHEME: "$_id.SCHEME",FOLIO_NO:"$_id.FOLIO_NO", INVNAME: "$_id.INV_NAME", AMOUNT: { $sum: "$AMOUNT"  } } },
                { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
                { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
                { $sort: { TRADDATE: -1 } }
            ]
             pipeline1 = [  ///trans_karvy
                { $match: { $and: [{ $or: [{TD_TRTYPE:/DIV/},{TRDESC: /Div/ } ]}, { PAN1: req.body.pan }, { TD_TRDT: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                { $group: { _id: { PAN1:"$PAN1",STATUS:"$STATUS",FUNDDESC: "$FUNDDESC", TD_ACNO:"$TD_ACNO",INVNAME: "$INVNAME" }, TD_AMT: { $sum: "$TD_AMT" } } },
                { $project: { _id: 0,PAN:"$_id.PAN1",PER_STATUS:"$_id.STATUS", SCHEME: "$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO", INVNAME: "$_id.INVNAME", AMOUNT: { $sum: "$TD_AMT"  } } },
                { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
                { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
                { $sort: { TRADDATE: -1 } }
            ]
             pipeline2 = [  ///trans_franklin
                { $match: { $and: [ { $or: [{ TRXN_TYPE: /DIR/ }, { TRXN_TYPE: /DP/ }] },{ IT_PAN_NO1: req.body.pan }, { TRXN_DATE: { $gte: new Date(moment(yer).format("YYYY-MM-DD")), $lt: new Date(moment(secyer).format("YYYY-MM-DD")) } }] } },
                { $group: { _id: { IT_PAN_NO1:"$IT_PAN_NO1",SOCIAL_S18:"$SOCIAL_S18",SCHEME_NA1: "$SCHEME_NA1",FOLIO_NO:"$FOLIO_NO", INVESTOR_2: "$INVESTOR_2" }, AMOUNT: { $sum: "$AMOUNT" } } },
                { $project: { _id: 0,PAN:"$_id.IT_PAN_NO1",PER_STATUS:"$_id.SOCIAL_S18", SCHEME: "$_id.SCHEME_NA1", FOLIO_NO:"$_id.FOLIO_NO",INVNAME: "$_id.INVESTOR_2", AMOUNT: { $sum: "$AMOUNT"  } } },
                { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
                { $project: { detail: 0 ,_id:0,TAX_STATUS:0,FOLIO_NO:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
                { $sort: { TRADDATE: -1 } }
            ]       
            transc.aggregate(pipeline, (err, camsdata) => {
                transk.aggregate(pipeline1, (err, karvydata) => {
                    transf.aggregate(pipeline2, (err, frankdata) => {
                        if (camsdata != 0 || karvydata != 0 || frankdata != 0) {
                            resdata = {
                                status: 200,
                                message: 'Successfull',
                                data: frankdata
                            } 
                        var datacon = frankdata.concat(karvydata.concat(camsdata))
                        datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse);
                        resdata.data = datacon;
                        res.json(resdata);
                        return resdata;
                    }else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                        res.json(resdata);
                        return resdata;
                    }
                });
            });
        });
     }
 });       
    }
} catch (err) {
console.log(err)
}
});


// app.post("/api/gettransactionuserwise1", function (req, res) {
//     try{
//     var mon = parseInt(req.body.month);
//     var yer = parseInt(req.body.year);
//     if(req.body.pan != "" && req.body.name != ""){
//         const pipeline = [  ///trans_cams
//             { $group: { _id: { INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
//             { $project: { _id: 0, INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan } , { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//         const pipeline1 = [  ///trans_karvy
//             { $group: { _id: { INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
//             { $project: { _id: 0, INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//         const pipeline2 = [  ///trans_franklin
//             { $group: { _id: { INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
//             { $project: { _id: 0, INVNAME: "$INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, { PAN: req.body.pan }, { INVNAME: {$regex : `^${req.body.name}.*` , $options: 'i' } } ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]

//         transc.aggregate(pipeline, (err, camsdata) => {
//             transk.aggregate(pipeline1, (err, karvydata) => {
//                 transf.aggregate(pipeline2, (err, frankdata) => {
//                     if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
//                         //   if( newdata != 0){
//                         resdata = {
//                             status: 200,
//                             message: 'Successfull',
//                             data: frankdata
//                         }
//                     } else {
//                         resdata = {
//                             status: 400,
//                             message: 'Data not found',
//                         }
//                     }
//                     var datacon = frankdata.concat(karvydata.concat(camsdata))
//                     datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                         .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                         .reverse().map(JSON.parse);
//                     for (var i = 0; i < datacon.length; i++) {
//                         if (datacon[i]['TRXN_NATUR'] === "Redemption") {
//                             datacon[i]['TRXN_NATUR'] = "RED";
//                         } if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Withdrawal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
//                             datacon[i]['TRXN_NATUR'] = "SIP";
//                         } if (Math.sign(datacon[i]['AMOUNT']) === -1) {
//                             datacon[i]['TRXN_NATUR'] = "SIPR";
//                         } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/)) {
//                             datacon[i]['TRXN_NATUR'] = "STP";
//                         }
//                     }
//                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
//                     res.json(resdata)
//                     return resdata
//                 });
//             });
//         });
//     }else{
//         resdata = {
//             status: 400,
//             message: 'Data not found',
//         }
// 	     res.json(resdata)
//              return resdata
//     }
// } catch (err) {
//     console.log(err)
// }
// })

// app.post("/api/gettransactionuserwise2", function (req, res) {
//     try{
//         var member="";
//         var arr=[];var alldata=[];
//         let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
//         if(req.body.month ===""){
//             resdata = {
//                 status: 400,
//                 message: 'Please enter month',
//             }
            
//         }else if(req.body.year ===""){
//             resdata = {
//                 status: 400,
//                 message: 'Please enter year',
//             }
//         }else if(req.body.pan ===""){
//             resdata = {
//                 status: 400,
//                 message: 'Please enter pan',
//             }
//         }else if(!regex.test(req.body.pan)) {
//             resdata = {
//                 status: 400,
//                 message: 'Please enter valid pan',
//             }
//         }else{
//             var mon = parseInt(req.body.month);
//             var yer = parseInt(req.body.year);
//              family.find({ adminPan:  {$regex : `^${req.body.pan}.*` , $options: 'i' }  },{_id:0,memberPan:1}, function (err, member) {
//                 if(member!=""){
//                     member  = [...new Set(member.map(({memberPan}) => memberPan.toUpperCase()))];
//                     arr.push({PAN:req.body.pan.toUpperCase()});
//                     for(var j=0;j<member.length;j++){     
//                     arr.push({PAN:member[j]}); 
//                     }
//                     var str = {$or:arr};
//          pipeline = [  ///trans_cams
//             { $group: { _id: { TRXNNO:"$TRXNNO",INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
//             { $project: { _id: 0,TRXNNO:"$_id.TRXNNO", INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, str  ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//          pipeline1 = [  ///trans_karvy
//             { $group: { _id: { TD_TRNO:"$TD_TRNO", INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
//             { $project: { _id: 0, TD_TRNO:"$_id.TD_TRNO",INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, str ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//          pipeline2 = [  ///trans_franklin
//             { $group: { _id: { TRXN_NO:"$TRXN_NO", INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
//             { $project: { _id: 0, TRXN_NO:"$_id.TRXN_NO", INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
//             { $match: { $and: [{ month: mon }, { year: yer }, str ] } },
//             { $sort: { TRADDATE: -1 } }
//         ]
//         transc.aggregate(pipeline, (err, camsdata) => {
//             transk.aggregate(pipeline1, (err, karvydata) => {
//                 transf.aggregate(pipeline2, (err, frankdata) => {
//                     if (frankdata != 0 || karvydata != 0 || camsdata != 0) {
//                         resdata = {
//                             status: 200,
//                             message: 'Successfull',
//                             data: frankdata
//                         }
//                         var datacon = frankdata.concat(karvydata.concat(camsdata));
//                         datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                             .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                             .reverse().map(JSON.parse);
//                         for (var i = 0; i < datacon.length; i++) {
//                             if (datacon[i]['TRXN_NATUR'] === "Redemption" || datacon[i]['TRXN_NATUR'] === "FUL" || datacon[i]['TRXN_NATUR'] === "SIPR" || 
//                         datacon[i]['TRXN_NATUR'] === "Full Redemption" || datacon[i]['TRXN_NATUR'] === "Partial Redemption") {
//                             datacon[i]['TRXN_NATUR'] = "RED";
//                         }  if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || 
//                          datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
//                             datacon[i]['TRXN_NATUR'] = "SIP";
//                         } if (datacon[i]['TRXN_NATUR'] === "Systematic Withdrawal") {
//                             datacon[i]['TRXN_NATUR'] = "SWP";
//                         }if (Math.sign(datacon[i]['AMOUNT']) === -1) {
//                             datacon[i]['TRXN_NATUR'] = "SIPR";
//                         } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/) || datacon[i]['TRXN_NATUR'] === "S T P" || datacon[i]['TRXN_NATUR'] === "S T P In") {
//                             datacon[i]['TRXN_NATUR'] = "STP";
//                         }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift Out" || datacon[i]['TRXN_NATUR'] === "Switchout"
//                          || datacon[i]['TRXN_NATUR'] === "Transfer-Out" || datacon[i]['TRXN_NATUR'] === "Transmission Out"
//                           || datacon[i]['TRXN_NATUR'] === "Switch Over Out" || datacon[i]['TRXN_NATUR'] === "LTOP"
//                           || datacon[i]['TRXN_NATUR'] === "LTOF" || datacon[i]['TRXN_NATUR'] === "Partial Switch Out" || 
//                           datacon[i]['TRXN_NATUR'] === "Full Switch Out") {
//                             datacon[i]['TRXN_NATUR'] = "Switch Out";
//                         }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
//                         || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
//                         || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
//                             datacon[i]['TRXN_NATUR'] = "Switch In";
//                         }if (datacon[i]['TRXN_NATUR'] === "Dividend Reinvest" || 
//                         datacon[i]['TRXN_NATUR'] === "Dividend Paid"
//                          || datacon[i]['TRXN_NATUR'] === "Div. Reinvestment") {
//                             datacon[i]['TRXN_NATUR'] = "Dividend";
//                         }if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
//                             datacon[i]['TRXN_NATUR'] = "Dividend Payout";
//                         }if (datacon[i]['TRXN_NATUR'] === "Consolidation In") {
//                             datacon[i]['TRXN_NATUR'] = "Con In";
//                         }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
//                             datacon[i]['TRXN_NATUR'] = "Con Out";
//                         }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
//                             datacon[i]['TRXN_NATUR'] = "Con Out";
//                         }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || 
//                         datacon[i]['TRXN_NATUR'] === "Initial Allotment"
//                         || datacon[i]['TRXN_NATUR'] === "NEWPUR") {
//                             datacon[i]['TRXN_NATUR'] = "Purchase";
//                         }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
//                          datacon[i]['TRXN_NATUR'] === "ADDPUR") {
//                             datacon[i]['TRXN_NATUR'] = "Add. Purchase";
//                         }
//                      }
//                      resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime());
//                      res.json(resdata);
//                     return resdata;
//                     } 
                    
//                  });
//              });
//           });
//         }else{
//             resdata = {
//                 status: 400,
//                 message: 'Data not found',
//             }
//            }       
//         });
//     }
// } catch (err) {
//     console.log(err)
// }
// })

app.post("/api/gettransactionuserwise", function (req, res) {
    try{
        var member="";var guardpan1=[];var guardpan2=[];
        var arr1=[];var arr2=[];var arr3=[];var alldata=[];var arrFolio=[];var arrName=[];
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if(req.body.month ===""){
            resdata = {
                status: 400,
                message: 'Please enter month',
            }
            res.json(resdata);
            return resdata;
        }else if(req.body.year ===""){
            resdata = {
                status: 400,
                message: 'Please enter year',
            }
            res.json(resdata);
            return resdata;
        }else if(req.body.pan ===""){
            resdata = {
                status: 400,
                message: 'Please enter pan',
            }
            res.json(resdata);
            return resdata;
        }else if(!regex.test(req.body.pan)) {
            resdata = {
                status: 400,
                message: 'Please enter valid pan',
            }
            res.json(resdata);
            return resdata;
        }else{
            var mon = parseInt(req.body.month);
            var yer = parseInt(req.body.year);
             family.find({ adminPan:  {$regex : `^${req.body.pan}.*` , $options: 'i' }  },{_id:0,memberPan:1}, function (err, member) {
                if(member!=""){
                    member  = [...new Set(member.map(({memberPan}) => memberPan.toUpperCase()))];
                    guardpan1.push({GUARD_PAN:req.body.pan.toUpperCase()});
                    guardpan2.push({GUARDPANNO:req.body.pan.toUpperCase()});
                    arr1.push({PAN:req.body.pan.toUpperCase()});
                    // arr2.push({PAN1:req.body.pan.toUpperCase()});
                    // arr3.push({IT_PAN_NO1:req.body.pan.toUpperCase()});
                    for(var j=0;j<member.length;j++){     
                    guardpan1.push({GUARD_PAN:member[j]}); 
                    guardpan2.push({GUARDPANNO:member[j]});
                    arr1.push({PAN:member[j]});
                    // arr2.push({PAN1:member[j]});
                    // arr3.push({IT_PAN_NO1:member[j]});
                    }
                    var strPan1 = {$or:guardpan1};
                    var strPan2 = {$or:guardpan2};
                    folioc.find(strPan1).distinct("FOLIOCHK", function (err, member1) {
                      foliok.find(strPan2).distinct("ACNO", function (err, member2) {
                      var alldata = member1.concat(member2);   
                      for(var j=0;j<alldata.length;j++){     
                        arr1.push({FOLIO_NO:alldata[j]});
                        // arr2.push({TD_ACNO:alldata[j]});
                        // arr3.push({FOLIO_NO:alldata[j]});
                        }
                        var strFolio = {$or:arr1};
                        // var strFolio1 = {$or:arr2};
                        // var strFolio2 = {$or:arr3};
        pipeline = [  ///trans_cams
            { $group: { _id: { TAX_STATUS:"$TAX_STATUS",TRXNNO:"$TRXNNO",INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
            { $project: { _id: 0,PER_STATUS:"$_id.TAX_STATUS",TRXNNO:"$_id.TRXNNO", INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer } ,strFolio  ] } },
            { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
            { $sort: { TRADDATE: -1 } }
        ]
         pipeline1 = [  ///trans_karvy
            { $group: { _id: { STATUS:"$STATUS",TD_TRNO:"$TD_TRNO", INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
            { $project: { _id: 0,PER_STATUS:"$_id.STATUS", TRXNNO:"$_id.TD_TRNO",INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
            { $match: { $and: [{ month: mon }, { year: yer }  ,strFolio ] } },
            { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
            { $sort: { TRADDATE: -1 } }
        ]
         pipeline2 = [  ///trans_franklin
            { $group: { _id: { SOCIAL_S18:"$SOCIAL_S18",TRXN_NO:"$TRXN_NO", INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
            { $project: { _id: 0, PER_STATUS:"$_id.SOCIAL_S18",TRXNNO:"$_id.TRXN_NO", INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
            { $match: { $and: [{ month: mon }, { year: yer }  ,strFolio] } },
            { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
            { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
            { $project: { detail: 0 ,_id:0,TAX_STATUS:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
            { $sort: { TRADDATE: -1 } }
        ]
        transc.aggregate(pipeline, (err, camsdata) => {
            transk.aggregate(pipeline1, (err, karvydata) => {
                transf.aggregate(pipeline2, (err, frankdata) => {
                    if (frankdata != 0 || karvydata != 0 || camsdata != 0) {
                        resdata = {
                            status: 200,
                            message: 'Successfull',
                            data: frankdata
                        }
                        var datacon = frankdata.concat(karvydata.concat(camsdata));
                        datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse);
                            var newdata1 = datacon.map(item=>{
                                return [JSON.stringify(item),item]
                                 }); // creates array of array
                                 var maparr1 = new Map(newdata1); // create key value pair from array of array
                                 datacon = [...maparr1.values()];//converting back to array from mapobject 

                              datacon = datacon.map(function(obj) {
                                if(obj['GUARDIANN0']){
                                    obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                                    obj['GUARD_PAN'] = obj['GUARDPANNO'];
                                     // Delete old key
                                          delete obj['GUARDIANN0'];
                                          delete obj['GUARDPANNO'];
                                }else if((obj['GUARDIANN0']) === ""){
                                        obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                                        obj['GUARD_PAN'] = obj['GUARDPANNO'];
                                        delete obj['GUARDIANN0'];
                                        delete obj['GUARDPANNO'];
                                    }
                                if(obj['GUARDIAN20']){
                                    obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                                     // Delete old key
                                    delete obj['GUARDIAN20'];
                                }else if((obj['GUARDIAN20']) === ""){
                                    obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                                    delete obj['GUARDIAN20'];
                                }
                                    return obj;
                                
                                });

                        for (var i = 0; i < datacon.length; i++) {
                            if (datacon[i]['TRXN_NATUR'] === "Redemption" || datacon[i]['TRXN_NATUR'] === "FUL" || datacon[i]['TRXN_NATUR'] === "SIPR" || 
                        datacon[i]['TRXN_NATUR'] === "Full Redemption" || datacon[i]['TRXN_NATUR'] === "Partial Redemption") {
                            datacon[i]['TRXN_NATUR'] = "RED";
                        }  if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || 
                         datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
                            datacon[i]['TRXN_NATUR'] = "SIP";
                        } if (datacon[i]['TRXN_NATUR'] === "Systematic Withdrawal") {
                            datacon[i]['TRXN_NATUR'] = "SWP";
                        }if (Math.sign(datacon[i]['AMOUNT']) === -1) {
                            datacon[i]['TRXN_NATUR'] = "SIPR";
                        } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/) || datacon[i]['TRXN_NATUR'] === "S T P" || datacon[i]['TRXN_NATUR'] === "S T P In") {
                            datacon[i]['TRXN_NATUR'] = "STP";
                        }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift Out" || datacon[i]['TRXN_NATUR'] === "Switchout"
                         || datacon[i]['TRXN_NATUR'] === "Transfer-Out" || datacon[i]['TRXN_NATUR'] === "Transmission Out"
                          || datacon[i]['TRXN_NATUR'] === "Switch Over Out" || datacon[i]['TRXN_NATUR'] === "LTOP"
                          || datacon[i]['TRXN_NATUR'] === "LTOF" || datacon[i]['TRXN_NATUR'] === "Partial Switch Out" || 
                          datacon[i]['TRXN_NATUR'] === "Full Switch Out") {
                            datacon[i]['TRXN_NATUR'] = "Switch Out";
                        }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
                        || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
                        || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
                            datacon[i]['TRXN_NATUR'] = "Switch In";
                        }if (datacon[i]['TRXN_NATUR'] === "Dividend Reinvest" || 
                        datacon[i]['TRXN_NATUR'] === "Dividend Paid"
                         || datacon[i]['TRXN_NATUR'] === "Div. Reinvestment") {
                            datacon[i]['TRXN_NATUR'] = "Dividend";
                        }if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
                            datacon[i]['TRXN_NATUR'] = "Dividend Payout";
                        }if (datacon[i]['TRXN_NATUR'] === "Consolidation In") {
                            datacon[i]['TRXN_NATUR'] = "Con In";
                        }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
                            datacon[i]['TRXN_NATUR'] = "Con Out";
                        }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
                            datacon[i]['TRXN_NATUR'] = "Con Out";
                        }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || 
                            datacon[i]['TRXN_NATUR'] === "Initial Allotment"
                        || datacon[i]['TRXN_NATUR'] === "NEWPUR") {
                            datacon[i]['TRXN_NATUR'] = "Purchase";
                        }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
                         datacon[i]['TRXN_NATUR'] === "ADDPUR") {
                            datacon[i]['TRXN_NATUR'] = "Add. Purchase";
                        }if (datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" )  {
                            datacon[i]['PER_STATUS'] = "Minor";     
		            datacon[i]['PAN'] = "";    
                        }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL" || datacon[i]['PER_STATUS'] === "Resident Individual") {
                           datacon[i]['PER_STATUS'] = "Individual";
                       }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
                         datacon[i]['PER_STATUS'] = "HUF";
                      }
                     }

                     resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime());
                     res.json(resdata);
                    return resdata;
                    }else{
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                            
                        }
                        res.json(resdata);
                       return resdata;
                    }
                    
                 });
             });
          });
        });
    });
        }else{
            pipeline = [  ///trans_cams
                { $group: { _id: { TAX_STATUS:"$TAX_STATUS",TRXNNO:"$TRXNNO",INV_NAME: "$INV_NAME", PAN: "$PAN", TRXN_NATUR: "$TRXN_NATUR", FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", AMOUNT: "$AMOUNT", TRADDATE: "$TRADDATE" } } },
                { $project: { _id: 0,PER_STATUS:"$_id.TAX_STATUS",TRXNNO:"$_id.TRXNNO", INVNAME: "$_id.INV_NAME", PAN: "$_id.PAN", TRXN_NATUR: "$_id.TRXN_NATUR", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRADDATE" } }, month: { $month: ('$_id.TRADDATE') }, year: { $year: ('$_id.TRADDATE') } } },
                { $match: { $and: [{ month: mon }, { year: yer } ,{PAN:req.body.pan}  ] } },
                { $lookup: { from: 'folio_cams', localField: 'FOLIO_NO', foreignField: 'FOLIOCHK', as: 'detail' } },
                { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                { $project: {    detail: 0 ,_id:0,TAX_STATUS:0,FOLIOCHK:0,AC_NO:0,FOLIO_DATE:0,PRODUCT:0,SCH_NAME:0,AMC_CODE:0,BANK_NAME:0,HOLDING_NA:0,IFSC_CODE:0,JNT_NAME1:0,JNT_NAME2:0,JOINT1_PAN:0,NOM2_NAME:0,NOM3_NAME:0,NOM_NAME:0,PRCODE:0,HOLDING_NATURE:0,PAN_NO:0,INV_NAME:0,EMAIL:0} },
                { $sort: { TRADDATE: -1 } }
            ]
             pipeline1 = [  ///trans_karvy
                { $group: { _id: { STATUS:"$STATUS",TD_TRNO:"$TD_TRNO", INVNAME: "$INVNAME", PAN1: "$PAN1", TRDESC: "$TRDESC", TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_AMT: "$TD_AMT", TD_TRDT: "$TD_TRDT" } } },
                { $project: { _id: 0,PER_STATUS:"$_id.STATUS", TRXNNO:"$_id.TD_TRNO",INVNAME: "$_id.INVNAME", PAN: "$_id.PAN1", TRXN_NATUR: "$_id.TRDESC", FOLIO_NO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", AMOUNT: "$_id.TD_AMT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TD_TRDT" } }, month: { $month: ('$_id.TD_TRDT') }, year: { $year: ('$_id.TD_TRDT') } } },
                { $match: { $and: [{ month: mon }, { year: yer }  ,{PAN:req.body.pan} ] } },
                { $lookup: { from: 'folio_karvy', localField: 'FOLIO_NO', foreignField: 'ACNO', as: 'detail' } },
                { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                { $project: { detail: 0 , _id:0,STATUS:0,PRCODE:0,STATUSDESC:0,ACNO:0,BNKACNO:0,BNKACTYPE:0,FUNDDESC:0,NOMINEE:0,MODEOFHOLD:0,JTNAME2:0,FUND:0,EMAIL:0,BNAME:0,PANGNO:0,JTNAME1:0,PAN2:0} },
                { $sort: { TRADDATE: -1 } }
            ]
             pipeline2 = [  ///trans_franklin
                { $group: { _id: { SOCIAL_S18:"$SOCIAL_S18",TRXN_NO:"$TRXN_NO", INVESTOR_2: "$INVESTOR_2", IT_PAN_NO1: "$IT_PAN_NO1", TRXN_TYPE: "$TRXN_TYPE", FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", AMOUNT: "$AMOUNT", TRXN_DATE: "$TRXN_DATE" } } },
                { $project: { _id: 0, PER_STATUS:"$_id.SOCIAL_S18",TRXNNO:"$_id.TRXN_NO", INVNAME: "$_id.INVESTOR_2", PAN: "$_id.IT_PAN_NO1", TRXN_NATUR: "$_id.TRXN_TYPE", FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", AMOUNT: "$_id.AMOUNT", TRADDATE: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, month: { $month: ('$_id.TRXN_DATE') }, year: { $year: ('$_id.TRXN_DATE') } } },
                { $match: { $and: [{ month: mon }, { year: yer }  ,{PAN:req.body.pan}] } },
                { $lookup: { from: 'folio_franklin', localField: 'FOLIO_NO', foreignField: 'FOLIO_NO', as: 'detail' } },
                { $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$detail", 0 ] }, "$$ROOT" ] } } } ,
                { $project: { detail: 0 ,_id:0,TAX_STATUS:0,PERSONAL_9:0,ACCNT_NO:0,AC_TYPE:0,ADDRESS1:0,BANK_CODE:0,BANK_NAME:0,COMP_CODE:0,D_BIRTH:0,EMAIL:0,HOLDING_T6:0,F_NAME:0,IFSC_CODE:0,JOINT_NAM1:0,JOINT_NAM2:0,KYC_ID:0,NEFT_CODE:0,NOMINEE1:0,PBANK_NAME:0,PANNO2:0,PANNO1:0,PHONE_RES:0,SOCIAL_ST7:0} },
                { $sort: { TRADDATE: -1 } }
            ]
    
            transc.aggregate(pipeline, (err, camsdata) => {
                transk.aggregate(pipeline1, (err, karvydata) => {
                    transf.aggregate(pipeline2, (err, frankdata) => {
                        if (frankdata.length != 0 || karvydata.length != 0 || camsdata.length != 0) {
                            resdata = {
                                status: 200,
                                message: 'Successfull',
                                data: frankdata
                            }
                        
                        datacon = frankdata.concat(karvydata.concat(camsdata))
                        datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                            .reverse().map(JSON.parse);

                            datacon = datacon.map(function(obj) {
                            if(obj['GUARDIANN0']){
                                obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                                obj['GUARD_PAN'] = obj['GUARDPANNO'];
                                 // Delete old key
                                      delete obj['GUARDIANN0'];
                                      delete obj['GUARDPANNO'];
                            }else if((obj['GUARDIANN0']) === ""){
                                    obj['GUARD_NAME'] = obj['GUARDIANN0']; // Assign new key
                                    obj['GUARD_PAN'] = obj['GUARDPANNO'];
                                    delete obj['GUARDIANN0'];
                                    delete obj['GUARDPANNO'];
                                }
                            if(obj['GUARDIAN20']){
                                obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                                 // Delete old key
                                delete obj['GUARDIAN20'];
                            }else if((obj['GUARDIAN20']) === ""){
                                obj['GUARD_NAME'] = obj['GUARDIAN20']; // Assign new key
                                delete obj['GUARDIAN20'];
                            }
                                return obj;
                            });
                        for (var i = 0; i < datacon.length; i++) {
                            if (datacon[i]['TRXN_NATUR'] === "Redemption" || datacon[i]['TRXN_NATUR'] === "FUL" || datacon[i]['TRXN_NATUR'] === "SIPR" || 
                            datacon[i]['TRXN_NATUR'] === "Full Redemption" || datacon[i]['TRXN_NATUR'] === "Partial Redemption") {
                                datacon[i]['TRXN_NATUR'] = "RED";
                            }  if (datacon[i]['TRXN_NATUR'].match(/Systematic Investment.*/) || 
                             datacon[i]['TRXN_NATUR'].match(/Systematic - Instalment.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic - To.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-NSE.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic Physical.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic-Normal.*/) || datacon[i]['TRXN_NATUR'].match(/Systematic (ECS).*/)) {
                                datacon[i]['TRXN_NATUR'] = "SIP";
                            } if (datacon[i]['TRXN_NATUR'] === "Systematic Withdrawal") {
                                datacon[i]['TRXN_NATUR'] = "SWP";
                            }if (Math.sign(datacon[i]['AMOUNT']) === -1) {
                                datacon[i]['TRXN_NATUR'] = "SIPR";
                            } if (datacon[i]['TRXN_NATUR'].match(/Systematic - From.*/) || datacon[i]['TRXN_NATUR'] === "S T P" || datacon[i]['TRXN_NATUR'] === "S T P In") {
                                datacon[i]['TRXN_NATUR'] = "STP";
                            }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift Out" || datacon[i]['TRXN_NATUR'] === "Switchout"
                             || datacon[i]['TRXN_NATUR'] === "Transfer-Out" || datacon[i]['TRXN_NATUR'] === "Transmission Out"
                              || datacon[i]['TRXN_NATUR'] === "Switch Over Out" || datacon[i]['TRXN_NATUR'] === "LTOP"
                              || datacon[i]['TRXN_NATUR'] === "LTOF" || datacon[i]['TRXN_NATUR'] === "Partial Switch Out" || 
                              datacon[i]['TRXN_NATUR'] === "Full Switch Out") {
                                datacon[i]['TRXN_NATUR'] = "Switch Out";
                            }if (datacon[i]['TRXN_NATUR'] === "Lateral Shift In" || datacon[i]['TRXN_NATUR'] === "Switch-In" 
                            || datacon[i]['TRXN_NATUR'] === "Transfer-In" || datacon[i]['TRXN_NATUR'] === "Switch Over In" 
                            || datacon[i]['TRXN_NATUR'] === "LTIN" || datacon[i]['TRXN_NATUR'] === "LTIA") {
                                datacon[i]['TRXN_NATUR'] = "Switch In";
                            }if (datacon[i]['TRXN_NATUR'] === "Dividend Reinvest" || 
                            datacon[i]['TRXN_NATUR'] === "Dividend Paid"
                             || datacon[i]['TRXN_NATUR'] === "Div. Reinvestment") {
                                datacon[i]['TRXN_NATUR'] = "Dividend";
                            }if (datacon[i]['TRXN_NATUR'] === "Gross Dividend") {
                                datacon[i]['TRXN_NATUR'] = "Dividend Payout";
                            }if (datacon[i]['TRXN_NATUR'] === "Consolidation In") {
                                datacon[i]['TRXN_NATUR'] = "Con In";
                            }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
                                datacon[i]['TRXN_NATUR'] = "Con Out";
                            }if (datacon[i]['TRXN_NATUR'] === "Consolidation Out") {
                                datacon[i]['TRXN_NATUR'] = "Con Out";
                            }if (datacon[i]['TRXN_NATUR'] === "Purchase" || datacon[i]['TRXN_NATUR'] === "NEW" || 
                                datacon[i]['TRXN_NATUR'] === "Initial Allotment"
                            || datacon[i]['TRXN_NATUR'] === "NEWPUR") {
                                datacon[i]['TRXN_NATUR'] = "Purchase";
                            }if(datacon[i]['TRXN_NATUR'] === "Additional Purchase" || datacon[i]['TRXN_NATUR'] === "ADD" ||
                             datacon[i]['TRXN_NATUR'] === "ADDPUR") {
                                datacon[i]['TRXN_NATUR'] = "Add. Purchase";
                            }if (datacon[i]['PER_STATUS'] === "On Behalf Of Minor" || datacon[i]['PER_STATUS'] === "MINOR" || datacon[i]['PER_STATUS'] === "On Behalf of Minor" )  {
                                datacon[i]['PER_STATUS'] = "Minor";   
				datacon[i]['PAN'] = "";   
                            }if (datacon[i]['PER_STATUS'] === "INDIVIDUAL" || datacon[i]['PER_STATUS'] === "Resident Individual") {
                               datacon[i]['PER_STATUS'] = "Individual";
                           }if (datacon[i]['PER_STATUS'] === "HINDU UNDIVIDED FAMI") {
                             datacon[i]['PER_STATUS'] = "HUF";
                          }
                        }
                        resdata.data = datacon.sort((a, b) => new Date(b.TRADDATE.split("-").reverse().join("/")).getTime() - new Date(a.TRADDATE.split("-").reverse().join("/")).getTime())
                        res.json(resdata)
                        return resdata;
                    } else {
                        resdata = {
                            status: 400,
                            message: 'Data not found',
                        }
                        res.json(resdata)
                        return resdata;
                    }
                    });
                });
            });
           }       
        });
    }
} catch (err) {
    console.log(err)
}
})


   app.post("/api/getschemelist", function (req, res) {
	   try{
        var folio = req.body.folio;;
        const pipeline = [
                {$match : {FOLIO_NO:folio}},
                {$group : {_id : { AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code: { $substr: ["$PRODCODE", { $strLenCP: "$AMC_CODE" }, -1] }  }}},
                {$lookup:
                {
                from: "products",
                let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
                pipeline: [
                    { $match:
                        { $expr:
                            { $and:
                            [
                                { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
                                { $eq: [ "$AMC_CODE", "$$amc" ] }
                            ]
                            }
                        }
                    },
                    { $project: {  _id: 0 } }
                ],
                as: "products"
                }},
                { $unwind: "$products"},
                {$project :{ _id:0 , products:"$products" } },
           ]
        const pipeline1=[  //trans_karvy
            {$match : {TD_ACNO:folio,SCHEMEISIN : {$ne : null}}}, 
            {$group : {_id:{SCHEMEISIN:"$SCHEMEISIN"} }},
            {$lookup: { from: 'products',localField: '_id.SCHEMEISIN',foreignField: 'ISIN',as: 'master' } },
            { $unwind: "$master"},
            {$project:{_id:0,products:"$master" }   },
       ] 
        const pipeline2=[ ///trans_franklin
            {$match : {FOLIO_NO:folio,ISIN : {$ne : null}}}, 
            {$group : {_id:{ISIN:"$ISIN"} }},
            {$lookup: { from: 'products',localField: '_id.ISIN',foreignField: 'ISIN',as: 'master' } },
            { $unwind: "$master"},
            {$project:{_id:0,products:"$master" }   },
      ] 
        transc.aggregate(pipeline, (err, newdata2) => {
           transf.aggregate(pipeline2, (err, newdata1) => {
                transk.aggregate(pipeline1, (err, newdata) => {
                       if(newdata2.length != 0  || newdata1.length != 0 || newdata.length != 0){        
                            resdata= {
                               status:200,
                               message:'Successfull',
                               data:  newdata2
                             }
                           }else{
                               resdata= {
                               status:400,
                               message:'Data not found',            
                          }
                           }
                           var datacon = newdata2.concat(newdata1.concat(newdata))
                           datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                           .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                           .reverse().map(JSON.parse) ;
                            resdata.data = datacon.sort((a, b) => (a.products.PRODUCT_LONG_NAME > b.products.PRODUCT_LONG_NAME) ? 1 : -1);
                           res.json(resdata)  
                           return resdata    
                                   
                  });
               });
  
             });   
             } catch (err) {
                    console.log(err)
                }
        })  

app.get("/api/getfoliolist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    {data:{ email:'sunilguptabfc@gmail.com'}}
      ).then(function(result) {
        //let json = CircularJSON.stringify(result);
        var pan =  result.data.data.User[0].pan_card;
        var datacollection = folio.find({"pan_no":pan}).distinct("foliochk", function (err, newdata) { 
            if(newdata != 0){    
                     resdata= {
                        status:200,
                        message:'Successfull',
                        data:  newdata 
                      }
                    }else{
                     resdata= {
                        status:400,
                        message:'Data not found',            
                   }
                      // res.send(newdata);
                    }
                 //   res.json(resdata)    
                });
        var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
        var datacollection1 = trans.find({"pan":pan}).distinct("folio_no", function (err, newdata) { 
            if(newdata != 0){    
                     resdata1= {
                        status:200,
                        message:'Successfull',
                        data:  newdata 
                      }
                    }else{
                        resdata1= {
                        status:400,
                        message:'Data not found',            
                   }
                      // res.send(newdata);
                    }
                    //res.json(resdata1)
                    var datacon = resdata.data.concat(resdata1.data)
                    var removeduplicates = Array.from(new Set(datacon));
                    resdata.data = removeduplicates
                  //  console.log(datacon)
                  //  console.log(removeduplicates)
                    res.send(resdata)
                
                });
    
            //return resdata
    });
    })

//app.post('/api/port_folio_data', port_folio_data);


app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port= process.env.PORT ||  3000;


app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
  });

app.listen(port, ()=> { console.log("server started at port ",port)})


