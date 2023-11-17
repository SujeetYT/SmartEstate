import React from 'react'

import { useContract, useContractRead } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import { SiGooglemaps } from "react-icons/si";
import LandDetailModal from "./LandDetailModal";
import land4 from "../assets/land4.jpg";
import { Col } from 'react-bootstrap';
const HomeLandCards = ({ itemData }) => {

    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);

    const [center, setCenter] = React.useState({ lat: 9.227954, lng: 7.900708 });
    const [name, setName] = React.useState("1530 Dumble St.");

    return (
        <>
            <Col className={parseFloat(itemData?.area) === 0 ? "d-none" : "mb-3 mb-md-0 btn"} onClick={handleShow}>
                <img src={land4} alt="land1" className="w-100 mb-2" />
                <div className="d-flex justify-content-between align-item-center">
                    <div>
                        <p className="fw-bold mb-0 text-start ">{itemData?.ownerName}</p>
                        <p className="mb-0">Owner: {itemData?.owner?.slice(0, 6) + "..." + itemData?.owner?.slice(-4)}</p>
                    </div>
                    <div>
                        <SiGooglemaps
                            className="fs-5 mt-2 me-2"
                            style={{ color: "#FF5A5F", cursor: "pointer" }}
                            onClick={() => {
                                setCenter({ lat: itemData.lat, lng: itemData.lng });
                                setName(itemData.name);
                            }}
                        />
                        {/* <p>{data?.location}</p> */}
                    </div>
                </div>
                <div className="d-flex justify-content-between align-item-center">
                    <p className="fw-semibold">Id: {itemData?.landId?.slice(0, 6) + "..." + itemData?.landId?.slice(-4)}</p>
                    <p>
                        <span className="fw-bold"> {parseFloat(itemData?.area)} </span>SqFt
                    </p>
                </div>
            </Col>
            <LandDetailModal show={show} onHide={() => setShow(false)} _landId={itemData?.landId} />
        </>
    )
}

export default HomeLandCards