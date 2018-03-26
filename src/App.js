import React, { Component } from "react";
import logo from "./logo.svg";
//import "./App.css";
import { Grid, Row, Col, Navbar, Nav, NavItem } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">Boligfilter</a>
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

        <Grid>
          <Row>
            <Col xs={12} sm={4}>
              Sidebar
            </Col>
            <Col xs={12} sm={8}>
              Map
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
