import React, { useState } from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { firstLetterCase } from "../modules/helperFunctions";
import {NavLink as routerNavLink} from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./styles/NavBar.css"

const NavBar = (props) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <div className="nav-bar">
      <span className="nav-bar-logo">
      
        <Navbar light className="nav-bar-container" >
          <NavbarBrand href="/" className="nav-bar-title"><h1>Welcome to TrackRx, {firstLetterCase(sessionUser.username)}</h1></NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
         
            <Nav className="nav-bar-links" navbar>
            
            <img src={require("../../images/circle-logo.png")} alt="trackRx-logo" />
         
            <NavItem>
                <NavLink tag={routerNavLink} to="/" exact path="/" className="nav-link" activeClassName="nav-link--active">
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={routerNavLink} to="/medication/list" className="nav-link" activeClassName="nav-link--active">
                  Current Medication List
                    </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink tag={routerNavLink} to="/medication/history" className="nav-link" activeClassName="nav-link--active">Medication History</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={routerNavLink} to="/medication/resources" className="nav-link" activeClassName="nav-link--active">Resources</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={routerNavLink} className="nav-link" onClick={props.clearUser} to="/login">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </span>
      </div>
    </>
  );

}
export default withRouter(NavBar)