import React, { useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
import logo from "../assets/logo.png";
import NavbarTop from "../components/NavbarTop";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import CountrySelect from "react-bootstrap-country-select";
import { useContract, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { toast } from "react-toastify";

const LandOwnerReg = () => {
  const [nationality, setNationality] = useState("");
  const [asset, setAsset] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);  
  const { mutateAsync: newOwnerRegistration, isLoading } = useContractWrite(
    contract,
    "newOwnerRegistration"
  );
  const storage = useStorage();

  //id type
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const _uploadAsset = async (file) => {
    const response = await storage.upload(file);
    setAsset(response);
  };
  console.log(asset);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const selectedNationality = nationality.name;
    const firstName = document.getElementById("firstName").value;
    const address = document.getElementById("address").value;
    const idNumber = document.getElementById("idNumber").value;

    
    try {
      const data = await newOwnerRegistration({
        args: [
          firstName,
          selectedNationality,
          selectedValue,
          idNumber,
          address,
          asset,
        ],
      });
      console.log("contract call success", data);
      toast.success("Owner Registered Successfully !!!");
    } catch (err) {
      console.log("contract call failure", err);
      toast.error("Something Went Wrong !!");
    }
  };

  return (
    <>
      <NavbarTop />
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <div className="w-md-50 mt-5">
          <div className="w-100 d-flex justify-content-center align-items-center mb-4">
            <img src={logo} alt="" className="h-100" />
          </div>
          <p className="h2 fw-bold">Land Owner Registration</p>
          <p className="text-muted">
            Start your journey Selling on Our Plateform.
          </p>
          <Form onSubmit={handlerSubmit}>
            <Form.Group controlId="firstName" className="mt-4">
              <Form.Label>First Name*</Form.Label>
              <Form.Control type="text" placeholder="First Name" required />
            </Form.Group>
            <Col xs={4} className="mt-4">
              {" "}
              <Form.Label>Nationality*</Form.Label>
            </Col>
            <Col>
              {" "}
              <CountrySelect
                value={nationality || ""}
                onChange={setNationality}
              />{" "}
            </Col>

            <Form.Group controlId="address" className="mt-4">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" required />
            </Form.Group>

            <Form.Label className="mt-4">Select Id Type</Form.Label>
            <Form.Select onChange={handleSelectChange}>
              <option disabled>Select Id Type</option>
              <option>Passport</option>
              <option>Driving License</option>
            </Form.Select>

            <Form.Group controlId="idNumber" className="mt-4">
              <Form.Label>Identity Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="3812 1213  123123"
                required
              />
            </Form.Group>

            <Form.Group controlId="uploadedFile" className="mt-4">
              <Form.Label>Upload Valid Identification Card*</Form.Label>
              <div className="border rounded">
                <Form.Control
                  type="file"
                  placeholder="Upload Valid Identification Card"
                  onChange={(e) => {
                    _uploadAsset(e.target.files[0]);
                  }}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="py-3">
              <Form.Control
                type="submit"
                disabled={isLoading || asset === null}
                value={isLoading ? "Creating ..." : "Create Account"}
                className="btn btn-primary"
              />
            </Form.Group>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default LandOwnerReg;
