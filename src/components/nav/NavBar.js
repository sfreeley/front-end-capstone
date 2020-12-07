import React, { useState } from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { firstLetterCase } from "../modules/helperFunctions";
import { NavLink as routerNavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./styles/NavBar.css"

const NavBar = ({ sessionUser }) => {
  const isAuthenticated = () => sessionStorage.getItem("user") !== null;
  const [hasUser, setHasUser] = useState(isAuthenticated());

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated())
  }

  return (
    <>
      <div className="nav-bar">
        <span className="nav-bar-logo">

          <Navbar light className="nav-bar-container" expand="md"  >
            <NavbarBrand href="/" className="nav-bar-title"><h5>Welcome to TrackRx, {firstLetterCase(sessionUser.username)}</h5></NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>

              <Nav className="nav-bar-links" navbar>

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
                  <NavLink tag={routerNavLink} to="/medication/pharmacies" className="nav-link" activeClassName="nav-link--active">Pharmacy List</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={routerNavLink} className="nav-link" onClick={clearUser} to="/login">Logout</NavLink>
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