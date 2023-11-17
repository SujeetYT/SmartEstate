import React from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Col, Row } from 'react-bootstrap';
import land1 from "../assets/land1.jpg";
import { Link } from 'react-router-dom';

const LandCards = ({ landsData }) => {

    const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "getLand", [landsData])

    return (
        <Col className={parseFloat(landsData?.area) === 0 ? "d-none" : "mb-4 p-3"} as={Link} to={`/land/${landsData}`}  >
            <img src={land1} alt="land1" className="w-100" />
            <div className="d-flex justify-content-between align-item-center text-black">
                <div>
                    <p className="fw-bold mb-0 mt-2">Owner Name : {data?.ownerName}</p>
                    <p className='mb-0'>Location : {data?.location}</p>
                </div>
            </div>
            <div className='mt-0'>
                <span className="fw-bold text-black">Size : {parseInt(data?.area)} </span> <span className='text-black'>SqFt</span>
            </div>
        </Col>
    )
}

export default LandCards