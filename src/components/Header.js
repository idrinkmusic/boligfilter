import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
const Header = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Boligfilter</a>
        </Navbar.Brand>

        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            JSON 1
          </NavItem>
          <NavItem eventKey={2} href="#">
            JSON 2
          </NavItem>
          <NavItem eventKey={3} href="#">
            JSON 3
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
