import React from "react";
import NavbarTop from "../components/NavbarTop";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { VerificationTable } from "../components/VerificationTable";

export const Verification = () => {
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
        <h2>Verify lands with the land hash</h2>
        <p>This is the verification page</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Land ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Land ID" />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Verify
          </Button>
        </Form>
        {id && <VerificationTable id={id} />}
      </Container>
    </div>
  );
};
