const sql = require("../configsql.js");
const userdetail = function(userdetail) {
 
};


userdetail.getUserDetails = (mydata, result) => {
    let email=mydata.email;
    let msg="";
    sql.query(`SELECT * FROM users where users.email='${email}'`, (err, ress) => {   
      console.log("User Data: ", ress);
  
      if (ress.length) {
        console.log("User details found");
      //result(null,{ status:200, message:"Bank details found successfully ",  data:res });
      msg=ress;
      //return;
    }
    else{  
      console.log("User details not found"); 
      //result(null,{ status:200, message:"User details not found ",  data:res });
      
  }
  });       

     
};
