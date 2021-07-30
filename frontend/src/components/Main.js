import React, { Component } from 'react'
import Navbar from './Navbar'
//import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import Userwiselist from './Userwiselist'
import Camslist from './Camslist'
import Uploadnav from './Uploadnav'
import Uploadfolio from './Uploadfolio'
import Uploadtransaction from './Uploadtransaction'

class Main extends Component {
  render() {
    return (
      <div className="main-panel">
        <Navbar />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Userwiselist} />
          <Route path="/camslist" component={Camslist} />
          <Route path="/nav" component={Uploadnav} />
          <Route path="/folio" component={Uploadfolio} />
          <Route path="/transaction" component={Uploadtransaction} />
          <Redirect from='*' to='/dashboard' />
        </Switch>

     {/*   <Footer />    */}
      </div>
    )
  }
}

export default Main