import React, { useEffect } from 'react'
import NavbarTop from '../components/NavbarTop'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { useAddress, useContract, useContractRead, useContractWrite, useStorage } from "@thirdweb-dev/react";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { GoPaste } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const LandOwnerShipTransfer = () => {
    const address = useAddress();
    const navigate = useNavigate();
    const [asset, setAsset] = useState(null);
    const storage = useStorage();
    const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
    const { mutateAsync: newLandTransferRequest, isLoading } = useContractWrite(contract, "newLandTransferRequest")
    const { data: landOwnerData, isLoading:landOwnerLoading } = useContractRead(contract, "getUserType", [address])

    const handleResetValues = () => {
        const formData = document.getElementById('formData');
        formData.reset();
    }

    const _uploadAsset = async (file) => {
        const response = await storage.upload(file);
        setAsset(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const _landId = document.getElementById("landId").value;
        const _to = document.getElementById("toAddress").value;
        const _price = document.getElementById("price").value;
        try {
            const data = await newLandTransferRequest({ args: [_landId, _to, _price, asset] });
            console.info("contract call successs", data);
            toast.success("Trasfered Land Successfully !!")
        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Something Went Wrong !!")
        }
    }
    const handlePaste = () => {
        navigator.clipboard.readText().then((text) => {
            document.getElementById("landId").value = text;
        });
    }

    useEffect(() => {
        if (landOwnerData?.toString() !== "2" && !landOwnerLoading) {
            navigate("/");
        }
    }, [landOwnerData, landOwnerLoading])


    return (
        <div>
            <NavbarTop />
            <Container className='my-3'>
                {landOwnerLoading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <BeatLoader color="#0d6efd" />
                    </div>
                ) : (<>
                    <div className='my-5'>
                        <h1>Land Ownership Transfer Request</h1>
                        <p>Update Documents and details of the land here.</p>
                    </div>
                    <hr />
                    <Form id='formData' onSubmit={handleSubmit}>
                        <Row className='my-5'>

                            <Col xs={4}> <Form.Label className='fw-bold'>Land ID : </Form.Label></Col>
                            <Col xs={7}> <Form.Control type="text" placeholder="Enter Land ID" id='landId' required />  </Col>
                            <Col><GoPaste size={25} type="button" onClick={handlePaste} className='mt-1' /></Col>
                        </Row>

                        <Row className='mb-5'>
                            <Col xs={4}> <Form.Label className='fw-bold'>To* :</Form.Label></Col>
                            <Col > <Form.Control type="text" placeholder="Enter the Address" id='toAddress' required /> </Col>
                        </Row>

                        <Row className='mb-5 position-relative'>
                            <Col xs={4}> <Form.Label className='fw-bold'>Price*</Form.Label></Col>
                            <Col className='priceCss'> <Form.Control type="text" placeholder="$ 1500.99" id='price' required /> </Col>
                        </Row>

                        <Row className='mb-5'>
                            <Col xs={4}> <Form.Label className='mb-0 fw-bold'>Upload Documents*</Form.Label>
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
                            <Button
                                variant="primary"
                                type="submit"
                                className=' me-0'
                                disabled={isLoading || asset === null}>
                                {isLoading ? "Sending ..." : "Send"}</Button>
                        </div>
                    </Form>
                </>)}
            </Container>
        </div>
    )
}

export default LandOwnerShipTransfer