import React from 'react';
//import { render } from "react-dom";
import Uploadcamsnav from "./Uploadcamsnav";
import Uploadcamsfolio from "./Uploadcamsfolio";
import Uploadcamstrans from "./Uploadcamstrans";
import Updatecamsnav from "./Updatecamsnav";

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
     
        {""}<input
          type="radio"
          name="cams"
          value="cams_nav"
          checked={status === 1}
          onClick={(e) => this.radioHandler(1)}
         />{' '}Upload Cams Nav{' '}
        <input
          type="radio"
          name="cams"
          value="cams_folio"
          checked={status === 2}
          onClick={(e) => this.radioHandler(2)}
        />{' '}Upload Cams Folio{' '}
        <input
          type="radio"
          name="cams"
          value="cams_trans"
          checked={status === 3}
          onClick={(e) => this.radioHandler(3)}
        />{' '}Upload Cams Trans{' '}
        <input
          type="radio"
          name="cams"
          value="cams_nav"
          checked={status === 4}
          onClick={(e) => this.radioHandler(4)}
        />{' '}Update Cams Nav{' '}
        {status === 1 && <Uploadcamsnav />}
        {status === 2 && <Uploadcamsfolio />}
        {status === 3 && <Uploadcamstrans />}
        {status === 4 && <Updatecamsnav />}
      </>
    );
   }
 }
export default Dashboard
