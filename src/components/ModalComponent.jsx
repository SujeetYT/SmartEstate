import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { toast } from "react-toastify";

function ModalComponent({ show, setShow, item, type }) {
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { mutateAsync: rejectLandRegistrationRequest, isLoading } =
    useContractWrite(contract, "rejectLandRegistrationRequest");
  const handleClose = () => setShow(false);
  const { mutateAsync: rejectLandTransferRequest, isLoading: isLoad } =
    useContractWrite(contract, "rejectLandTransferRequest");

  const handleDecline = async () => {
    const _comment = document.getElementById("comment").value;
    if (type === "register") {
      try {
        const data = await rejectLandRegistrationRequest({
          args: [item, _comment],
        });
        console.log(data);
        toast.warning("Declined !!");
        setShow(false);
      } catch (err) {
        console.error("contract call failure", err);
        toast.error("Something went wrong !!");
        setShow(false);
      }
    } else {
      try {
        const data = await rejectLandTransferRequest({
          args: [item, _comment],
        });
        console.log(data);
        toast.warning("Declined !!");
        setShow(false);
      } catch (err) {
        console.error("contract call failure", err);
        toast.error("Something went wrong !!");
        setShow(false);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0 flex-column align-items-start">
          <div
            style={{
              backgroundColor: "#FEF3F2",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            className="p-1"
            onClick={handleClose}
          >
            <RxCross2
              color="#dc3545"
              className="p-1"
              size={25}
              style={{ backgroundColor: "#FEE4E2", borderRadius: "50%" }}
            />
          </div>
          <Modal.Title className="mt-2">Decline Request</Modal.Title>
          <Form.Label>
            Are you sure you want to decline this request? If yes add a comment
            for the Land Owner.
          </Form.Label>
        </Modal.Header>
        <Modal.Body className="py-2">
          <Form>
            <Form.Group className="mb-3" controlId="comment">
              <Form.Control
                type="text"
                placeholder="e.g. Invalid documents uploaded"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Row className="w-100">
            <Col className="ps-0">
              <Button
                variant="white"
                className="border w-100"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Col>
            <Col className="pe-0">
              <Button
                variant="danger"
                className="w-100"
                onClick={handleDecline}
                disabled={isLoading || isLoad}
              >
                {isLoading || isLoad ? "Declining..." : "Decline"}
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
