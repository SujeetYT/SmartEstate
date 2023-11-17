import React from "react";
import NavbarTop from "../components/NavbarTop";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { StatusTable } from "../components/StatusTable";

export const Status = () => {
  const [requestId, setRequestId] = React.useState(null);
  const [requestType, setRequestType] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const _requestId = e.target.requestId.value;
    const _requestType = e.target.requestType.value;
    setRequestId(_requestId);
    setRequestType(_requestType);
  };

  return (
    <div>
      <NavbarTop />
      <Container className="my-5">
        <h2>Check your request status</h2>
        <p>Enter your request ID to check the status of your request.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="requestId">
            <Form.Control type="text" placeholder="Enter request ID" required />
          </Form.Group>
          <Form.Group controlId="requestType" className="d-flex mt-3">
            <Form.Check
              type="radio"
              required
              label="Transfer"
              name="requestType"
              id="transfer"
              className="me-3"
              value="transfer"
            />
            <Form.Check
              type="radio"
              label="Register"
              name="requestType"
              id="register"
              value="register"
            />
          </Form.Group>
          <Button type="submit" className="mt-3">
            Check
          </Button>
        </Form>
        {requestId && requestType && (
          <StatusTable id={requestId} type={requestType} />
        )}
      </Container>
    </div>
  );
};
