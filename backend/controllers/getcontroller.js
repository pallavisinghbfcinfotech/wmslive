const Customer = require("../model/userdetail");
var fs = require('fs');
const { ECONNABORTED } = require("constants");
const dbConfig = require("../configurl");
const sql = require("../configsql.js");




exports.getUserDetails = (req, res) => {
    //console.log(req.body)
   // return;
   let ash_data1=''
   let errflag1=0
   if(req.body.email===undefined || req.body.email==''){
     ash_data1=" email: feild is required";
     errflag1=1;
     console.log(req.body.email);
   }
   if(errflag1===0){  
    Customer.getUserDetails(req.body, (err, data)  => {
     res.send(data);
     return;     
    });       
     }else{    
     console.log(" vvvvvvvvvvvvvv v111111111111111111");
     res.json({ status:200, message:ash_data1,data11:"Validation Error" });
     return;
   };
   };