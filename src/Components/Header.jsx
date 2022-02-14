import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const Header = () => {
  
  return (
    <Navbar className="shadow" variant="light" bg="white">
      <Container>
        <Navbar.Brand >Github Issues</Navbar.Brand>
        <Button variant="outline-dark">Sign out</Button> 
      </Container>
    </Navbar>
  );
};

export default Header;