
import React, { Component } from 'react';
import $  from 'jquery';
//import Axios from "axios";

class Userwiselist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
     datas: [],
      User: [],
      data1: [],
    };

  }


  componentDidMount() {
 /*  Axios.get('http://localhost:3001/api/getthirdparty')
      .then(res => {
       // const datas = res.data.data.data.User[0].pan_card; 
      //  console.log("hh1="+datas); 
      //  this.setState({ datas });
      this.setState({ data1 : res });
     //   console.log("hh2="+datas);
       })
      */

      $.ajax({
        url: "/api/getfoliolist",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(result) {     
         this.setState({data1: result.data}); 
         
       }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);
            
        }
     });
   
  

  }

  render() {
    return (
      <div>
        
        <div>
    <table>
      <thead>
   <tr><th><b>S.No</b></th><th><b>Amc_code</b></th>

   </tr> 
   </thead>
      <tbody>
        {console.log("hello="+this.state.data1)}
      {this.state.data1.map((item, index) => (
        <tr key={index}>
           <td>{index+1}</td> 
           <td>{item}</td>          
        </tr>
    
    ))}
    </tbody>
   </table>
   </div>
   </div>
    )
  }

}


export default Userwiselist;



