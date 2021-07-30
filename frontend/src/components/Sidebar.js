import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo">
            <Link to='/' className="simple-text">
              Simple Dashboard
            </Link>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link" to='/dashboard'>
                <i className="nc-icon nc-chart-pie-35"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/camslist'>
              <i className="nc-icon nc-align-center"></i>
                <p>CAMS List</p>
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink className="nav-link" to='/nav'>
              <i className="nc-bullet-list-67"></i>
                <p> Nav</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/folio'>
              <i className="nc-bullet-list-67"></i>
                <p>Master Folio</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/transaction'>
              <i className="nc-bullet-list-67"></i>
                <p>Transaction Feeds</p>
              </NavLink>
            </li>
           <li className="nav-item">
              <NavLink className="nav-link" to='/profile'>
                <i className="nc-icon nc-circle-09"></i>
                <p>AMC List</p>
              </NavLink>
            </li>
             {/*
           <li className="nav-item">
              <NavLink className="nav-link" to='/profile'>
                <i className="nc-icon nc-circle-09"></i>
                <p>User Profile</p>
              </NavLink>
            </li>*/}
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar