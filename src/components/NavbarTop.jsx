import { ConnectWallet, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/logo.png";
import { isDesktop } from "react-device-detect";

const NavbarTop = () => {
  const address = useAddress();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getUserType", [address])

  return (
    <div>
      <Navbar
        expand="lg"
        className="border border-bottom-1 bg-body-tertiary"
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
                <NavDropdown.Item as={Link} to="/my-lands">
                  My Lands
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register-land">
                  Register Land
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/land-transfer">
                  Transfer Land
                </NavDropdown.Item>
              </NavDropdown>
              {data?.toString() === "0" &&
              <Nav.Link as={Link} to="/land-owner-registration">
                Register
              </Nav.Link>}
              {data?.toString() === "1" && 
              <Nav.Link as={Link} to="/admin-dashboard">
                Dashboard
              </Nav.Link>}
              {/* <Nav.Link as={Link} to="/status">
                Status
              </Nav.Link> */}
              <Nav.Link as={Link} to="/history">
                History
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
