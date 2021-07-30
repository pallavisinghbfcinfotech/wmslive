import  React, { useState } from 'react'
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import Axios from "axios";

//const React = require("react");
//const useState = require("react");
//const XLSX = require("xlsx");
//const DataTable = require("react-data-table-component");
//const Axios = require("axios");



function Uploadcamstrans() {
 
  

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);   
    // process CSV data
    const processData = dataString => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      //console.log("ffs="+ffs)
     // const headers = [ffs.toString().replace(/ /g,"").replace(/#/g,"")];     
      //console.log("headers="+headers)
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length === headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] === '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] === '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }
   
          // remove the blank rows
          if (Object.values(obj).filter(x => x).length > 0) {
            list.push(obj);
          }
        }
      }
   
      // prepare columns list from headers

      const columns = headers.map(c => ({
        name: c,
        selector: c,
      }));
    

      setData(list);
      setColumns(columns);
      
      
      
      Axios.post('/api/savecamstrans',
      list ,
      {mode: 'cors'},
      {headers:
        { 'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Credentials' : 'true',
          'Access-Control-Max-Age' :'3000',
          'Access-Control-Allow-Headers' : ' Origin, Content-Type, X-Auth-Token, Accept, X-Requested-With',
          'Content-Type': 'application/json, charset=utf-8',
        }
      }).then((result) => {  
        console.log('success data inserted', result)
     });
    }
   
    // handle file upload
    const handleFileUpload = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
    }
   
   
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header ">
                  <h4 className="card-title">Cams Transaction </h4>
                  </div>
               
                <div className="card-footer ">
                  
                  <hr />
                  <div className="stats">
                
     
                  <div>
                    
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  
}




export default Uploadcamstrans