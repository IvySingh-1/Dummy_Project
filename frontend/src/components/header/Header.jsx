import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./header.css"

const Header = () => {
  return (
   <div>


      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img
              alt=""
              src="../../../src/assets/santa.png"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
        <Navbar.Brand className='Brand' href="#home">Expense Tracker</Navbar.Brand>

        <img
              alt=""
              src="../../../src/assets/money-pot.png"
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
    </div>
  )
}

export default Header
