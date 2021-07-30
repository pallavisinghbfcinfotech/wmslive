module.exports = app => {
    const port_folio = require("../controllers/port_folio.controller.js");
   
    app.post("/port_folio_data", port_folio.port_folio_data);
    
   // app.post("/port_folio_camsdata", port_folio.port_folio_camsdata);
  
  };
