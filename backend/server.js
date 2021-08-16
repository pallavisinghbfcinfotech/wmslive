import express from 'express';
import dotenv from 'dotenv';
 import config from './config.js';
 import mongoose from 'mongoose';
 import path from 'path';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import localStorage from 'localStorage'
import Axios from 'axios'
import moment from 'moment';
import timeout from 'connect-timeout';
var Schema = mongoose.Schema;

 const mongodbUrl= config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	promiseLibrary: global.Promise,
	autoIndex: false, // Don't build indexes
	poolSize: 30, // Maintain up to 10 socket connections
	autoReconnect:true,
	socketTimeoutMS:360000,
	connectTimeoutMS:360000,
        // If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0
}).catch(error => console.log(error.reason));

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


// app.post("/api/portfolio_api", function (req, res) {
// 	console.log("detail",req.body);
//  try { 
//  if(req.body.rta === "KARVY"){
// //  const pipeline1 = [  //trans_karvy   
// //                 { $match: { FUNDDESC: req.body.scheme, PAN1: req.body.pan, TD_ACNO: req.body.folio, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
// //                 { $group: { _id: { TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_NAV: "$TD_NAV", TD_TRTYPE: "$TD_TRTYPE", NAVDATE: "$NAVDATE", SCHEMEISIN: "$SCHEMEISIN" , TD_UNITS:"$TD_UNITS" , TD_AMT: "$TD_AMT" } } },
// //                 { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
// //                 { $unwind: "$nav" },
// //                 { $project: { _id: 0, FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", TD_NAV: "$_id.TD_NAV", NATURE: "$_id.TD_TRTYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.NAVDATE" } }, ISIN: "$_id.SCHEMEISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: { $sum: "$TD_UNITS" }, AMOUNT: { $sum: "$TD_AMT" } } },
// //                 { $sort: { TD_TRDT: -1 } }
// //             ]
//   const pipeline1 = [  //trans_karvy   
//     { $match: { FUNDDESC: req.body.scheme, PAN1: req.body.pan, TD_ACNO: req.body.folio, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
//     { $group: { _id: { TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_NAV: "$TD_NAV", TD_TRTYPE: "$TD_TRTYPE", NAVDATE: "$NAVDATE", SCHEMEISIN: "$SCHEMEISIN" , TD_UNITS:"$TD_UNITS" , TD_AMT: "$TD_AMT" } } },
//     { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
//     { $unwind: "$nav" },
//     { $project: { _id: 0, FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", TD_NAV: "$_id.TD_NAV", NATURE: "$_id.TD_TRTYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.NAVDATE" } }, ISIN: "$_id.SCHEMEISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: "$_id.TD_UNITS" , AMOUNT: "$_id.TD_AMT" }  },
//     { $sort: { SCHEME: -1 } }
// 	  ]
// 		 transk.aggregate(pipeline1, (err, karvy) => {
// 		 var datacon = karvy;
// 		 for (var i = 0; i < datacon.length; i++) {
//                                                 if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
//                                                     datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
//                                                     datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
//                                                     datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
//                                                     datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
//                                                     datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
//                                                     datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
//                                                     datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" ||
//                                                     datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "SWOF" ||
//                                                     datacon[i]['NATURE'] === "SWD") {
//                                                     datacon[i]['NATURE'] = "Switch Out";
//                                                 }
// 												 if (datacon[i]['NATURE'].match(/Systematic Investment.*/) ||
//                                                     datacon[i]['NATURE'] === "SIN" ||
//                                                     datacon[i]['NATURE'].match(/Systematic - Instalment.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic - To.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic-NSE.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic Physical.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic-Normal.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
//                                                     datacon[i]['NATURE'] = "SIP";
//                                                 }
//                                                 if (datacon[i]['NATURE'] === "ADDPUR" || datacon[i]['NATURE'] === "Additional Purchase" || datacon[i]['NATURE'] === "NEW" || datacon[i]['NATURE'] === "ADD") {
//                                                     datacon[i]['NATURE'] = "Purchase";
//                                                 }
// 							}
// 			  datacon = datacon.sort((a, b) => (a.SCHEME > b.SCHEME) ? 1 : -1);	
// 			 res.json(datacon);
// 		 });
//  }else if(req.body.rta === "CAMS"){
// //           const pipeline2 = [  //trans_cams
// //                 { $match: { SCHEME: req.body.scheme, PAN: req.body.pan, FOLIO_NO: req.body.folio, INV_NAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
// //                 { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", PURPRICE: "$PURPRICE", TRXN_TYPE_: "$TRXN_TYPE_", TRADDATE: "$TRADDATE", AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $substr: ["$PRODCODE", { $strLenCP: "$AMC_CODE" }, -1] } }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
// //                 {
// //                     $lookup:
// //                     {
// //                         from: "products",
// //                         let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
// //                         pipeline: [
// //                             {
// //                                 $match:
// //                                 {
// //                                     $expr:
// //                                     {
// //                                         $and:
// //                                             [
// //                                                 { $eq: ["$PRODUCT_CODE", "$$ccc"] },
// //                                                 { $eq: ["$AMC_CODE", "$$amc"] }
// //                                             ]
// //                                     }
// //                                 }
// //                             },
// //                             { $project: { _id: 0 } }
// //                         ],
// //                         as: "products"
// //                     }
// //                 },

// //                 { $unwind: "$products" },
// //                 { $group: { _id: { FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", PURPRICE: "$_id.PURPRICE", TRXN_TYPE_: "$_id.TRXN_TYPE_", TRADDATE: "$_id.TRADDATE", ISIN: "$products.ISIN" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
// //                 { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
// //                 { $unwind: "$nav" },
// //                 { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", TD_NAV: "$_id.PURPRICE", NATURE: "$_id.TRXN_TYPE_", TD_TRDT: { $dateToString: { format: "%m/%d/%Y", date: "$_id.TRADDATE" } }, ISIN: "$products.ISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
// //                 { $sort: { TD_TRDT: -1 } }
// //             ]
// 	 const pipeline2 = [  //trans_cams
//     { $match: { SCHEME: req.body.scheme, PAN: req.body.pan, FOLIO_NO: req.body.folio, INV_NAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
//     { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", PURPRICE: "$PURPRICE", TRXN_TYPE_: "$TRXN_TYPE_", TRADDATE: "$TRADDATE", AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $substr: ["$PRODCODE", { $strLenCP: "$AMC_CODE" }, -1] } , UNITS: "$UNITS" , AMOUNT:  "$AMOUNT" }  } },
//     {
//         $lookup:
//         {
//             from: "products",
//             let: { ccc: "$_id.code", amc: "$_id.AMC_CODE" },
//             pipeline: [
//                 {
//                     $match:
//                     {
//                         $expr:
//                         {
//                             $and:
//                                 [
//                                     { $eq: ["$PRODUCT_CODE", "$$ccc"] },
//                                     { $eq: ["$AMC_CODE", "$$amc"] }
//                                 ]
//                         }
//                     }
//                 },
//                 { $project: { _id: 0 } }
//             ],
//             as: "products"
//         }
//     },

//     { $unwind: "$products" },
//     { $group: { _id: { FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", PURPRICE: "$_id.PURPRICE", TRXN_TYPE_: "$_id.TRXN_TYPE_", TRADDATE: "$_id.TRADDATE", ISIN: "$products.ISIN" , UNITS: "$_id.UNITS", AMOUNT: "$_id.AMOUNT" } } },
//     { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
//     { $unwind: "$nav" },
//     { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", TD_NAV: "$_id.PURPRICE", NATURE: "$_id.TRXN_TYPE_", TD_TRDT: { $dateToString: { format: "%m/%d/%Y", date: "$_id.TRADDATE" } }, ISIN: "$products.ISIN", cnav: "$nav.NetAssetValue", navdate:"$nav.Date", UNITS:"$_id.UNITS",AMOUNT: "$_id.AMOUNT"  } },
//     { $sort: { SCHEME: -1 } }
// ]
// 			 transc.aggregate(pipeline2, (err, cams) => {
// 				 var datacon = cams;
// 		 for (var i = 0; i < datacon.length; i++) {
//                                                 if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
//                                                     datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
//                                                     datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
//                                                     datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
//                                                     datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
//                                                     datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
//                                                     datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
//                                                     datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" ||
//                                                     datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "SWOF" ||
//                                                     datacon[i]['NATURE'] === "SWD") {
//                                                     datacon[i]['NATURE'] = "Switch Out";
//                                                 }
// 												 if (datacon[i]['NATURE'].match(/Systematic Investment.*/) ||
//                                                     datacon[i]['NATURE'] === "SIN" ||
//                                                     datacon[i]['NATURE'].match(/Systematic - Instalment.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic - To.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic-NSE.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic Physical.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic-Normal.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
//                                                     datacon[i]['NATURE'] = "SIP";
//                                                 }
//                                                 if (datacon[i]['NATURE'] === "ADDPUR" || datacon[i]['NATURE'] === "Additional Purchase" || datacon[i]['NATURE'] === "NEW" || datacon[i]['NATURE'] === "ADD") {
//                                                     datacon[i]['NATURE'] = "Purchase";
//                                                 }
// 							}
// 				  datacon = datacon.sort((a, b) => (a.SCHEME > b.SCHEME) ? 1 : -1);	
// 			 res.json(datacon);
// 		 });
//           }else{
// //            const pipeline3 = [  //trans_franklin  
// //                 { $match: { SCHEME_NA1: req.body.scheme, IT_PAN_NO1: req.body.pan, FOLIO_NO: req.body.folio, INVESTOR_2: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
// //                 { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", NAV: "$NAV", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", ISIN: "$ISIN" }, UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
// //                 { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
// //                 { $unwind: "$nav" },
// //                 { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", TD_NAV: "$_id.NAV", NATURE: "$_id.TRXN_TYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, ISIN: "$_id.ISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: { $sum: "$UNITS" }, AMOUNT: { $sum: "$AMOUNT" } } },
// //                 { $sort: { TD_TRDT: -1 } }
// //             ]
//   const pipeline3 = [  //trans_franklin  
//     { $match: { SCHEME_NA1: req.body.scheme, IT_PAN_NO1: req.body.pan, FOLIO_NO: req.body.folio, INVESTOR_2: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
//     { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", NAV: "$NAV", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", ISIN: "$ISIN" , UNITS: "$UNITS" , AMOUNT: "$AMOUNT" } } },
//     { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
//     { $unwind: "$nav" },
//     { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", TD_NAV: "$_id.NAV", NATURE: "$_id.TRXN_TYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, ISIN: "$_id.ISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: "$_id.UNITS" , AMOUNT:"$_id.AMOUNT"  } },
//     { $sort: { SCHEME: -1 } }
// ]
// 			 transf.aggregate(pipeline3, (err, franklin) => {
// 				 var datacon = franklin;
// 		 for (var i = 0; i < datacon.length; i++) {
//                                                 if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
//                                                     datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
//                                                     datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
//                                                     datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
//                                                     datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
//                                                     datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
//                                                     datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
//                                                     datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" ||
//                                                     datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "SWOF" ||
//                                                     datacon[i]['NATURE'] === "SWD") {
//                                                     datacon[i]['NATURE'] = "Switch Out";
//                                                 }
// 												 if (datacon[i]['NATURE'].match(/Systematic Investment.*/) ||
//                                                     datacon[i]['NATURE'] === "SIN" ||
//                                                     datacon[i]['NATURE'].match(/Systematic - Instalment.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic - To.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic-NSE.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic Physical.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic-Normal.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
//                                                     datacon[i]['NATURE'] = "SIP";
//                                                 }
//                                                 if (datacon[i]['NATURE'] === "ADDPUR" || datacon[i]['NATURE'] === "Additional Purchase" || datacon[i]['NATURE'] === "NEW" || datacon[i]['NATURE'] === "ADD") {
//                                                     datacon[i]['NATURE'] = "Purchase";
//                                                 }
// 											}
// 				  datacon = datacon.sort((a, b) => (a.SCHEME > b.SCHEME) ? 1 : -1);	
// 			 res.json(datacon);
// 		 });
// 			}
	 
//        } catch (err) {
//                 console.log(err)
//             }   
// })

app.post("/api/portfolio_api",timeout('5s'), bodyParser.json(),  function (req, res) {
 try { 
 if(req.body.rta === "KARVY"){
    const pipeline1 = [  //trans_karvy   
        { $match: { FUNDDESC: req.body.scheme, PAN1: req.body.pan, TD_ACNO: req.body.folio, INVNAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
        { $group: { _id: { TD_ACNO: "$TD_ACNO", FUNDDESC: "$FUNDDESC", TD_NAV: "$TD_NAV", TD_TRTYPE: "$TD_TRTYPE", NAVDATE: "$NAVDATE", SCHEMEISIN: "$SCHEMEISIN" , TD_UNITS:"$TD_UNITS" , TD_AMT: "$TD_AMT",ASSETTYPE:"$ASSETTYPE" } } },
        { $lookup: { from: 'cams_nav', localField: '_id.SCHEMEISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
        { $unwind: "$nav" },
        { $project: { _id: 0, FOLIO: "$_id.TD_ACNO", SCHEME: "$_id.FUNDDESC", TD_NAV: "$_id.TD_NAV", NATURE: "$_id.TD_TRTYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.NAVDATE" } }, ISIN: "$_id.SCHEMEISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: "$_id.TD_UNITS" , AMOUNT: "$_id.TD_AMT",TYPE:"$_id.ASSETTYPE" }  },
        { $sort: { SCHEME: -1 } }
          ]
		 transk.aggregate(pipeline1, (err, karvy) => {
		 var datacon = karvy;
		 for (var i = 0; i < datacon.length; i++) {
                                                if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
                                                    datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
                                                    datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
                                                    datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
                                                    datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
                                                    datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
                                                    datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
                                                    datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" ||
                                                    datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "SWOF" ||
                                                    datacon[i]['NATURE'] === "SWD") {
                                                    datacon[i]['NATURE'] = "Switch Out";
                                                }
												 if (datacon[i]['NATURE'].match(/Systematic Investment.*/) ||
                                                    datacon[i]['NATURE'] === "SIN" ||
                                                    datacon[i]['NATURE'].match(/Systematic - Instalment.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic - To.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic-NSE.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic Physical.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic-Normal.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
                                                    datacon[i]['NATURE'] = "SIP";
                                                }
                                                if (datacon[i]['NATURE'] === "ADDPUR" || datacon[i]['NATURE'] === "Additional Purchase" || datacon[i]['NATURE'] === "NEW" || datacon[i]['NATURE'] === "ADD") {
                                                    datacon[i]['NATURE'] = "Purchase";
                                                }
                                                if (datacon[i]['TYPE'] === "Equity(G)" || datacon[i]['TYPE'] === "EQUITY FUND" || datacon[i]['TYPE'] === "EQUITY FUN" || datacon[i]['TYPE'] === "EQUITY-MF") {
                                                    datacon[i]['TYPE'] = "EQUITY";
                                                }else if (datacon[i]['TYPE'] === "DEBT FUND" || datacon[i]['TYPE'] === "LIQUID FUND" || datacon[i]['TYPE'] === "LIQUID" ) {
                                                    datacon[i]['TYPE'] = "DEBT";
                                                }else{
                                                    datacon[i]['TYPE'] = "GOLD";
                                                }
							}
			  datacon = datacon.sort((a, b) => (a.SCHEME > b.SCHEME) ? 1 : -1);	
              //console.log(datacon)
			 res.json(datacon);
		 });
 }else{
	const pipeline2 = [  //trans_cams
        { $match: { SCHEME: req.body.scheme, PAN: req.body.pan, FOLIO_NO: req.body.folio, INV_NAME: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
        { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME: "$SCHEME", PURPRICE: "$PURPRICE", TRXN_TYPE_: "$TRXN_TYPE_", TRADDATE: "$TRADDATE", AMC_CODE: "$AMC_CODE", PRODCODE: "$PRODCODE", code: { $substr: ["$PRODCODE", { $strLenCP: "$AMC_CODE" }, -1] } , UNITS: "$UNITS" , AMOUNT:  "$AMOUNT",SCHEME_TYP:"$SCHEME_TYP" }  } },
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
        { $group: { _id: { FOLIO_NO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", PURPRICE: "$_id.PURPRICE", TRXN_TYPE_: "$_id.TRXN_TYPE_", TRADDATE: "$_id.TRADDATE", ISIN: "$products.ISIN" , UNITS: "$_id.UNITS", AMOUNT: "$_id.AMOUNT" ,SCHEME_TYP:"$_id.SCHEME_TYP"} } },
        { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
        { $unwind: "$nav" },
        { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME", TD_NAV: "$_id.PURPRICE", NATURE: "$_id.TRXN_TYPE_", TD_TRDT: { $dateToString: { format: "%m/%d/%Y", date: "$_id.TRADDATE" } }, ISIN: "$products.ISIN", cnav: "$nav.NetAssetValue", navdate:"$nav.Date", UNITS:"$_id.UNITS",AMOUNT: "$_id.AMOUNT",TYPE:"$_id.SCHEME_TYP"  } },
        { $sort: { SCHEME: -1 } }
    ]
			 transc.aggregate(pipeline2, (err, cams) => {
				 var datacon = cams;
		 for (var i = 0; i < datacon.length; i++) {
                                                if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
                                                    datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
                                                    datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
                                                    datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
                                                    datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
                                                    datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
                                                    datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
                                                    datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" ||
                                                    datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "SWOF" ||
                                                    datacon[i]['NATURE'] === "SWD") {
                                                    datacon[i]['NATURE'] = "Switch Out";
                                                }
												 if (datacon[i]['NATURE'].match(/Systematic Investment.*/) ||
                                                    datacon[i]['NATURE'] === "SIN" ||
                                                    datacon[i]['NATURE'].match(/Systematic - Instalment.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic - To.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic-NSE.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic Physical.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic-Normal.*/) ||
                                                    datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
                                                    datacon[i]['NATURE'] = "SIP";
                                                }
                                                if (datacon[i]['NATURE'] === "ADDPUR" || datacon[i]['NATURE'] === "Additional Purchase" || datacon[i]['NATURE'] === "NEW" || datacon[i]['NATURE'] === "ADD") {
                                                    datacon[i]['NATURE'] = "Purchase";
                                                }
                                                if (datacon[i]['TYPE'] === "Equity(G)" || datacon[i]['TYPE'] === "EQUITY FUND" || datacon[i]['TYPE'] === "EQUITY FUN" || datacon[i]['TYPE'] === "EQUITY-MF") {
                                                    datacon[i]['TYPE'] = "EQUITY";
                                                }else if (datacon[i]['TYPE'] === "DEBT FUND" || datacon[i]['TYPE'] === "LIQUID FUND" || datacon[i]['TYPE'] === "LIQUID" ) {
                                                    datacon[i]['TYPE'] = "DEBT";
                                                }else{
                                                    datacon[i]['TYPE'] = "GOLD";
                                                }
							}
				  datacon = datacon.sort((a, b) => (a.SCHEME > b.SCHEME) ? 1 : -1);	
             
			 res.json(datacon);
		 });
        }
//           }else{
//   const pipeline3 = [  //trans_franklin  
//     { $match: { SCHEME_NA1: req.body.scheme, IT_PAN_NO1: req.body.pan, FOLIO_NO: req.body.folio, INVESTOR_2: { $regex: `^${req.body.name}.*`, $options: 'i' } } },
//     { $group: { _id: { FOLIO_NO: "$FOLIO_NO", SCHEME_NA1: "$SCHEME_NA1", NAV: "$NAV", TRXN_TYPE: "$TRXN_TYPE", TRXN_DATE: "$TRXN_DATE", ISIN: "$ISIN" , UNITS: "$UNITS" , AMOUNT: "$AMOUNT",PLAN_TYPE:"$PLAN_TYPE" } } },
//     { $lookup: { from: 'cams_nav', localField: '_id.ISIN', foreignField: 'ISINDivPayoutISINGrowth', as: 'nav' } },
//     { $unwind: "$nav" },
//     { $project: { _id: 0, FOLIO: "$_id.FOLIO_NO", SCHEME: "$_id.SCHEME_NA1", TD_NAV: "$_id.NAV", NATURE: "$_id.TRXN_TYPE", TD_TRDT: { $dateToString: { format: "%d-%m-%Y", date: "$_id.TRXN_DATE" } }, ISIN: "$_id.ISIN", cnav: "$nav.NetAssetValue", navdate: "$nav.Date", UNITS: "$_id.UNITS" , AMOUNT:"$_id.AMOUNT",TYPE:"$_id.PLAN_TYPE"  } },
//     { $sort: { SCHEME: -1 } }
// ]
// 			 transf.aggregate(pipeline3, (err, franklin) => {
// 				 var datacon = franklin;
// 		 for (var i = 0; i < datacon.length; i++) {
//                                                 if (datacon[i]['NATURE'] === "Redemption" || datacon[i]['NATURE'] === "RED" ||
//                                                     datacon[i]['NATURE'] === "SIPR" || datacon[i]['NATURE'] === "Full Redemption" ||
//                                                     datacon[i]['NATURE'] === "Partial Redemption" || datacon[i]['NATURE'] === "Lateral Shift Out" ||
//                                                     datacon[i]['NATURE'] === "Switchout" || datacon[i]['NATURE'] === "Transfer-Out" ||
//                                                     datacon[i]['NATURE'] === "Transmission Out" || datacon[i]['NATURE'] === "Switch Over Out" ||
//                                                     datacon[i]['NATURE'] === "LTOP" || datacon[i]['NATURE'] === "LTOF" || datacon[i]['NATURE'] === "FULR" ||
//                                                     datacon[i]['NATURE'] === "Partial Switch Out" || datacon[i]['NATURE'] === "Full Switch Out" ||
//                                                     datacon[i]['NATURE'] === "IPOR" || datacon[i]['NATURE'] === "FUL" ||
//                                                     datacon[i]['NATURE'] === "STPO" || datacon[i]['NATURE'] === "SWOF" ||
//                                                     datacon[i]['NATURE'] === "SWD") {
//                                                     datacon[i]['NATURE'] = "Switch Out";
//                                                 }
// 												 if (datacon[i]['NATURE'].match(/Systematic Investment.*/) ||
//                                                     datacon[i]['NATURE'] === "SIN" ||
//                                                     datacon[i]['NATURE'].match(/Systematic - Instalment.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic - To.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic-NSE.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic Physical.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic-Normal.*/) ||
//                                                     datacon[i]['NATURE'].match(/Systematic (ECS).*/)) {
//                                                     datacon[i]['NATURE'] = "SIP";
//                                                 }
//                                                 if (datacon[i]['NATURE'] === "ADDPUR" || datacon[i]['NATURE'] === "Additional Purchase" || datacon[i]['NATURE'] === "NEW" || datacon[i]['NATURE'] === "ADD") {
//                                                     datacon[i]['NATURE'] = "Purchase";
//                                                 }
//                                                 if (datacon[i]['TYPE'] === "Equity(G)" || datacon[i]['TYPE'] === "EQUITY FUND" || datacon[i]['TYPE'] === "EQUITY FUN" || datacon[i]['TYPE'] === "EQUITY-MF") {
//                                                     datacon[i]['TYPE'] = "EQUITY";
//                                                 }else if (datacon[i]['TYPE'] === "DEBT FUND" || datacon[i]['TYPE'] === "LIQUID FUND" || datacon[i]['TYPE'] === "LIQUID" ) {
//                                                     datacon[i]['TYPE'] = "DEBT";
//                                                 }else{
//                                                     datacon[i]['TYPE'] = "GOLD";
//                                                 }
// 											}
// 				  datacon = datacon.sort((a, b) => (a.SCHEME > b.SCHEME) ? 1 : -1);	
// 			 res.json(datacon);
// 		 });
// 			}
	 
       } catch (err) {
                console.log(err)
            }   
})



app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port= process.env.PORT ||  3000;


app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
  });

app.listen(port, ()=> { console.log("server started at port ",port)})


