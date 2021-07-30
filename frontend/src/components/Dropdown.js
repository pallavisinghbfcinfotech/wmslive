import React, { useState } from 'react';
import Select from 'react-select';
// import Camsnavlist from './Camsnavlist';
function App() {
  const data = [
    {
      value: "cams_nav",
      label: "cams_nav"
    },
    {
      value: "cams_folio",
      label: "cams_folio"
    },
    {
      value: "cams_trans",
      label: "cams_trans"
    }
    
  ];
 
  // set value for default selection
  const [selectedValue, setSelectedValue] = useState();
 
  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedValue(e.value);
  }
 
  
  return (
    <div className="App">
      <div>
      <a href="https://www.cluemediator.com">Clue Mediator</a><br /><br />
      {this.props.name}={selectedValue};
      <Select
        placeholder="Select Option"
        value={data.find(obj => obj.value === selectedValue)} // set selected value
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function
      />
 
      {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div><b>Selected Value1: </b> {selectedValue}</div>
      </div>}
    </div>
    
    </div>
  );
 
}

export default App;