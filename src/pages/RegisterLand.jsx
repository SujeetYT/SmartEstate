import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import NavbarTop from '../components/NavbarTop';
import { useAddress, useContract, useContractRead, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { toast } from 'react-toastify';
import { useGeolocated } from "react-geolocated";
import { MdOutlineMyLocation } from "react-icons/md";
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const ManageLand = () => {
  const address = useAddress();
  const [asset, setAsset] = useState(null);
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  console.log("contract",contract);
  const { mutateAsync: newLandRegistrationRequest, isLoading } = useContractWrite(contract, "newLandRegistrationRequest")
  const storage = useStorage();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [formRes, setFormRes] = useState(null);
  const { data: newUser, isLoading: newUserLoading } = useContractRead(contract, "getUserType", [address])
  const navigate = useNavigate();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const handleLocation = () => {
    if (isGeolocationAvailable && isGeolocationEnabled) {
      setLatitude(coords?.latitude);
      setLongitude(coords?.longitude);
    }
  }

  const handleResetValues = () => {
    const formData = document.getElementById('formData');
    formData.reset();
    setLatitude(null);
    setLongitude(null);
  }

  const _uploadAsset = async (file) => {
    const response = await storage.upload(file);
    setAsset(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const location = latitude + "," + longitude;
    const area = document.getElementById("area").value;
    const price = document.getElementById("price").value;

    try {
      const data = await newLandRegistrationRequest({ args: [name, location, area, price, asset] });
      console.info("contract call successs", data);
      setFormRes(data);
      handleResetValues();
      toast.success("New Land Registration Requested Sucessfully !!!")
    } catch (err) {
      console.error("contract call failure", err);
      toast.error("Something Went Wrong !!")
    }
  };

  useEffect(() => {
    if (newUser?.toString() !== "2" && !newUserLoading) {
      navigate("/");
    }
  }, [newUser, newUserLoading])

  return (
    <div>
      <NavbarTop />
      <Container className='my-3'>
        {newUserLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <BeatLoader color="#0d6efd" />
          </div>
        ) : (<>
          <div className='my-5'>
            <h1>Land Registration Request</h1>
            <p>Update Documents and details of the land here.</p>
          </div>
          <hr />
          <Form onSubmit={handleSubmit} id='formData'>
            <Row className='my-5'>
              <Col xs={4} lg={4}> <Form.Label className='fw-bold'>Owner Name</Form.Label></Col>
              <Col> <Form.Control type="text" placeholder="Enter Land Owner Name" id='name' required /> </Col>
            </Row>

            <Row className='my-5'>
              <Col sm={3} xs={3} lg={4}> <Form.Label className='fw-bold'>Location</Form.Label></Col>
              <Col sm={3} xs={3}> <Form.Control type="text" placeholder="9.227954" id='latitude' value={latitude || ""} required disabled/> </Col>
              <Col sm={3} xs={3}> <Form.Control type="text" placeholder="7.900708" id='longitude' value={longitude || ""} required disabled/> </Col>
              <Col> <Button onClick={handleLocation}><MdOutlineMyLocation size={20} /></Button> </Col>
            </Row>

            <Row className='mb-5 position-relative'>
              <Col xs={4}> <Form.Label className='fw-bold'>Area</Form.Label></Col>
              <Col className='SqFtCss'> <Form.Control type="number" placeholder="Area of the Land" id='area' min={50} required /> </Col>
            </Row>

            <Row className='mb-5 position-relative'>
              <Col xs={4}> <Form.Label className='fw-bold'>Price</Form.Label></Col>
              <Col className='priceCss'> <Form.Control type="number" placeholder="$ 1500.99" min={0} id='price' required /> </Col>
            </Row>

            <Row className='mb-5'>
              <Col xs={4}> <Form.Label className='mb-0 fw-bold'>Upload Documents</Form.Label>
                <br />
                <Form.Text className="text-muted">
                  Share documents of property ownership.
                </Form.Text></Col>
              <Col>  <Form.Control type="file" onChange={(e) => {
                _uploadAsset(e.target.files[0]);
              }} required /> </Col>
            </Row>

            <div className="buttons text-end my-3">
              <Button
                variant="outline-danger"
                className='bg-white text-danger border-1 mx-3'
                onClick={handleResetValues}
              >Reset</Button>
              <Button variant="primary" type="submit" className=' me-0'
                disabled={isLoading || asset === null}>
                {isLoading ? "Sending ..." : "Send"}
              </Button>
            </div>
          </Form>
          {formRes && <Alert variant="success" className='my-3'>
            {/* <Alert.Heading>Request Sent Successfully!</Alert.Heading> */}
            <a className='text-text-decoration-underline text-success' href={`https://sepolia.etherscan.io/tx/${formRes?.receipt?.transactionHash}#eventlog`}
              target="_blank" rel="noreferrer"
            >Txn Receipt: {formRes?.receipt?.transactionHash}</a>
          </Alert>}
              </>
            )}
      </Container>
    </div>

  )
}

export default ManageLand