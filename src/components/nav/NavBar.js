import React, { useState } from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <div>
        <Navbar color="faded" light >
          <NavbarBrand href="/" className="mr-auto"><h1>Welcome to TrackRx, {sessionUser.username}</h1></NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>

              <NavItem>
                <NavLink href="/medication/list" className="nav-link" activeClassName="nav-link--active">
                  Current Medication List
                    </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/medication/history" className="nav-link" activeClassName="nav-link--active">Medication History</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/medication/resources" className="nav-link" activeClassName="nav-link--active">Resources</NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" onClick={props.clearUser} href="/login">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );

}
export default NavBar