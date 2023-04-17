import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarWithReact.css';
import { Link, Outlet } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

function MyNavbar() {
  const { removeAuth } = useAuth();

  const handleLogout = () => {
    removeAuth('access_token');
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="right-aligned">
          <Nav>
            <Link to="/chat">Chat</Link>
            {/* <Link id="RouterNavLink" to="/contact">
              Chat
            </Link> */}

            {/* <Nav.Link to="/chat">More deets</Nav.Link> */}
            <Button onClick={() => handleLogout()} variant="danger">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Outlet />
    </Navbar>
  );
}

export default MyNavbar;
