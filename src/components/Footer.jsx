import React from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <div className='footer'>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Text>© 2021 Cannard-imo</Navbar.Text>
                <Nav className="mr-auto">
                    <Nav.Link href="/">CGU</Nav.Link>
                    <Nav.Link href="/">Test</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default Footer;