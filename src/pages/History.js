import React from "react";
import NavbarTop from "../components/NavbarTop";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { VerificationTable } from "../components/VerificationTable";

export const History = () => {
  const [id, setId] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const landHash = e.target[0].value;
    setId(landHash);
  };

  return (
    <div>
      <NavbarTop />
      <Container className="my-5">
        <h2>Ownership transfer history</h2>
        <p>This page contains land ownership transfer history with land details</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Land ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Land ID" />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Verify
          </Button>
        </Form>
        {id &&
          <>
            <h3 className="mt-3 text-center">Land Details</h3>
            <VerificationTable id={id} />
          </>
        }
      </Container>
    </div>
  );
};
