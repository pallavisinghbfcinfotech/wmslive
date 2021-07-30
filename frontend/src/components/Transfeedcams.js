
import React, { Component } from 'react'
import $ from 'jquery';
//import { json } from 'express';

//import ReactDOM from 'react-dom';
//import Dropdown from './Dropdown';

//import CardHeader from "@material-ui/core/Card";
//import CardBody from "@material-ui/core/Card";
//import Card from "@material-ui/core/Card";
//import Table from "@material-ui/core/Card";
//import Table from 'react-bootstrap/Table';
//import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Transfeedcams extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data1: [],

    };

  }


  componentDidMount() {
   
    $.ajax({
      url: "/api/gettranscams",
      type: "GET",
      dataType: 'json',
      ContentType: 'application/json',
      success: function (result) {
        this.setState({ data1: result });

      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);

      }
    });

  
  }


  render() {
    
    return (

      <div>
        <table>
          <thead>
            <tr><th><b>S.No</b></th><th><b>Trans_no</b></th><th><b>Folio_no</b></th><th><b>Scheme</b></th>
              <th><b>Inv_name</b></th><th><b>Traddate</b></th><th><b>Units</b></th><th><b>Amount</b></th>
              <th><b>Trxn_nature</b></th><th><b>Scheme_type</b></th><th><b>Pan</b></th><th><b>Trxn_type_flag</b></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data1.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.trxnno}</td>
                <td>{item.folio_no}</td>
                <td>{item.scheme}</td>
                <td>{item.inv_name}</td>
                <td>{item.traddate}</td>
                <td>{item.units}</td>
                <td>{item.amount}</td>
                <td>{item.trxn_nature}</td>
                <td>{item.scheme_type}</td>
                <td>{item.pan}</td>
                <td>{item.trxn_type_flag}</td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>

    );
  }
}

export default Transfeedcams;



