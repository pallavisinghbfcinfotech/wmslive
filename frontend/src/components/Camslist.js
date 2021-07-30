import React, { useState } from 'react';
import Select from 'react-select';
import Transfeedcams from './Transfeedcams.js';
import Foliocamslist from './Foliocamslist.js';
import Camstranslist from './Camstranslist';
//import Foliocamslist from './Foliocamslist.js';
function App() {
  const data = [
    {
      value: "transaction_cams",
      label: "transaction_cams"
    },
    {
      value: "folio_cams",
      label: "folio_cams"
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


        <Select
          placeholder="Select Option"
          value={data.find(obj => obj.value === selectedValue)} // set selected value
          options={data} // set list of the data
          onChange={handleChange} // assign onChange function
        />

        {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          <div><b>Selected Value: </b> {selectedValue}</div>
        </div>}
      </div>
      <div>
        {selectedValue === "transaction_cams" && <Transfeedcams />}
        {selectedValue === "folio_cams" && <Foliocamslist />}
        {selectedValue === "cams_trans" && <Camstranslist />}
      </div>
    </div>
  );

}

export default App;