var db = require("../config.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const transcamsttt = new Schema({
    AMC_CODE: { type: String },
    FOLIO_NO: { type: String },
    PRODCODE: { type: String },
    SCHEME: { type: String },
    INV_NAME: { type: String },
    TRXNNO: { type: String },
    TRXNMODE: { type: String },
    TRXNSTAT: { type: String },
    TRADDATE: { type: Date },
    POSTDATE: { type: Date },
    PURPRICE: { type: Number },
    UNITS: { type: Number },
    AMOUNT: { type: Number },
    TRXN_NATUR: { type: String },
    MICR_NO: { type: String },
    SWFLAG: { type: String },
    SEQ_NO: { type: String },
    LOCATION: { type: String },
    SCHEME_TYP: { type: String },
    TAX_STATUS: { type: String },
    LOAD: { type: Number },
    PAN: { type: String },
    TRXN_TYPE_: { type: String },
    EUIN: { type: String },
    AC_NO: { type: String },
    BANK_NAME: { type: String },
}, { versionKey: false });

module.exports = mongoose => {
const transc= mongoose.model('trans_cams', transcamsttt, 'trans_cams');
return transc;

};

const transCamsData = function (model) {

};

transCamsData.mandate_normal = (email, result) => {
    console.log("ashdgahjgjh")
    result(null, "test")
}

// module.exports = mongoose => {
//     const Tutorial = mongoose.model(
//       "tutorial",
//       mongoose.Schema(
//         {
//           title: String,
//           description: String,
//           published: Boolean
//         },
//         { timestamps: true }
//       )
//     );
  
//     return Tutorial;