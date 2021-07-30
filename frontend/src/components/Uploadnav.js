import React from 'react';
//import { render } from "react-dom";
import Uploadcamsnav from "./Uploadcamsnav";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: 0 }; // 0: no show, 1: show yes, 2: show no.
    
  }
  
  radioHandler = (status) => {
    this.setState({status});
  }

  render() {
    const { status } = this.state;

    return (
      <>
     <nav className="navbar navbar-expand-lg " color-on-scroll="500">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Nav Files</a>
          <hr />
         
        </div>
      </nav>
      
      <div> Select Registrar Transfer Agent</div>
      <br />
        {""}<input
          type="radio"
          name="cams"
          value="cams_nav"
          checked={status === 1}
          onClick={(e) => this.radioHandler(1)}
         />{' '}Upload  Nav{' '}
        
        {status === 1 && <Uploadcamsnav />}
       
      </>
    );
   }
 }
export default Dashboard
