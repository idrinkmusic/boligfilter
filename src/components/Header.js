import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
const Header = props => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Boligfilter</a>
        </Navbar.Brand>

        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem onClick={() => props.onClick("data1")} eventKey={1} href="#">
            JSON 1
          </NavItem>
          <NavItem onClick={() => props.onClick("data2")} eventKey={2} href="#">
            JSON 2
          </NavItem>
          <NavItem onClick={() => props.onClick("data3")} eventKey={3} href="#">
            JSON 3
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
