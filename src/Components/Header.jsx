import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
      <Container>
        <Navbar.Brand >Github Issues</Navbar.Brand>
        <Button variant="primary">Sign out</Button> 
      </Container>
    </Navbar>
  );
};

export default Header;