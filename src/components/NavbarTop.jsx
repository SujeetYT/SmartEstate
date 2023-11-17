import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/lagos logo 1.png";
import { isDesktop } from "react-device-detect";

const NavbarTop = () => {
  return (
    <div>
      <Navbar
        expand="lg"
        className="border border-bottom-1 bg-body-tertiary p-3"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={Logo} alt="Logo" className="mx-2" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <NavDropdown title="Land Owner" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/all-lands">
                  Lands
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/manage-land">
                  Register Land
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/land-ownership-transfer">
                  Transfer Land
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/land-owner-registration">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/admin-dashboard">
                Admin
              </Nav.Link>
              <Nav.Link as={Link} to="/status">
                Status
              </Nav.Link>
              <Nav.Link as={Link} to="/verification">
                Verify
              </Nav.Link>
              {!isDesktop && <ConnectWallet theme="light" />}
            </Nav>
          </Navbar.Collapse>
          {isDesktop && <ConnectWallet theme="light" />}
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarTop;
