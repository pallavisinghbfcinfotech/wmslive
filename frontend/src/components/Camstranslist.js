
import React, { Component } from 'react'
import $ from 'jquery';

//import ReactDOM from 'react-dom';
//import Dropdown from './Dropdown';

//import CardHeader from "@material-ui/core/Card";
//import CardBody from "@material-ui/core/Card";
//import Card from "@material-ui/core/Card";
//import Table from "@material-ui/core/Card";
//import Table from 'react-bootstrap/Table';
//import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Camstranslist extends Component {

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
       url: "/api/getcamstransdata",
      type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(result) {         
        this.setState({data1: result}); 
        
      }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);
           
       }
    });
  }
   

  render() {
    return (
   
<div>
    <table>
      <thead>
   <tr><th><b>S.No</b></th><th><b>Folio_no</b></th><th><b>Scheme</b></th>
   <th><b>Inv_name</b></th><th><b>Ac_no</b></th><th><b>bank_name</b></th>
   </tr> 
   </thead>
      <tbody>
    {this.state.data1.map((item, index) => (
        <tr key={index}>
           <td>{index+1}</td> 
          <td>{item.folio_no}</td>                      
          <td>{item.scheme}</td>
          <td>{item.inv_name}</td>
          <td>{item.ac_no}</td>
          <td>{item.bank_name}</td>
          
        </tr>
    
    ))}
    </tbody>
   </table>
   </div>

    );
  }
}

export default Camstranslist;



