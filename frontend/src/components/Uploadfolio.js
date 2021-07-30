import React from 'react';
//import { render } from "react-dom";
import Foliocams from "./Foliocams";
import Foliofranklin from './Foliofranklin';
import Foliokarvy from './Foliokarvy';

class Uploadfolio extends React.Component {
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
          <a className="navbar-brand" href="/">Folio Files</a>
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
         />{' '}Cams{' '}
        <input
          type="radio"
          name="cams"
          value="cams_folio"
          checked={status === 2}
          onClick={(e) => this.radioHandler(2)}
        />{' '}Karvy{' '}
        <input
          type="radio"
          name="cams"
          value="cams_trans"
          checked={status === 3}
          onClick={(e) => this.radioHandler(3)}
        />{' '}Franklin{' '}
        
        {status === 1 && <Foliocams />}
        {status === 2 && <Foliokarvy />}
        {status === 3 && <Foliofranklin />}
      </>
    );
   }
 }
export default Uploadfolio
