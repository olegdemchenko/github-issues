import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const Header = ({ isSignedIn, signOut }) => {
  console.log()
  return (
    <Navbar className="shadow" variant="light" bg="white" expand="lg">
      <Container>
        <Navbar.Brand >Github Issues</Navbar.Brand>
        {isSignedIn && <Button variant="outline-dark" onClick={signOut}>Sign out</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;