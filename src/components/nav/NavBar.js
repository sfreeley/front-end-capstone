import React, { useState } from "react";
import SearchBar from "../search/SearchBar";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props, drugs) => {
    const hasUser = props.hasUser
   
    const [collapsed, setCollapsed] = useState(true);
      
    const toggleNavbar = () => setCollapsed(!collapsed);

        return (
            <>
          <div>
            <Navbar color="faded" light >
              <NavbarBrand href="/" className="mr-auto"><h1>Welcome to TrackRx</h1></NavbarBrand>
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
                  {/* <NavItem>
                    <NavLink className="nav-link" href="/login">Login</NavLink>
                  </NavItem> */}
                </Nav>
                 <span>
                   <SearchBar {...props} drugs={drugs}/>
                 </span>
              </Collapse>
            </Navbar>
          </div>
        </>
        );
      
      
        // {props.hasUser
        //     ? <li>
        //         <Link className="nav-link" onClick={handleLogout} to="/login"> 
        //         <span role="img" aria-label="logout">&#x1F52A; </span> 
        //         Logout 
        //         </Link>
        //       </li>
        //     : <li>
        //         <Link className="nav-link" to="/login">Login</Link>
        //       </li>}

}
export default NavBar