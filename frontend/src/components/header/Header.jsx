import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./header.css";

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="tabs">
        <img
          alt="Santa"
          src="../../../src/assets/santa.png" // Ensure this path is correct
          width="60"
          height="60"
          className="d-inline-block align-top"
        />
        <Navbar.Brand className="Brand" href="#home">Expense Tracker</Navbar.Brand>
        <img
          alt="Money Pot"
          src="../../../src/assets/money-pot.png" // Ensure this path is correct
          width="50"
          height="60"
          className="d-inline-block align-top"
        />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
