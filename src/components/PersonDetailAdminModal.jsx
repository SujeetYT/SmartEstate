import React from "react";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import moment from "moment";
import { toast } from "react-toastify";
import { BiClipboard, BiLinkExternal } from "react-icons/bi";

const PersonDetailAdminModal = ({ show, onHide, _landOwner }) => {
  const address = useAddress();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(
    contract,
    "getOwner",
    [_landOwner],
    { from: address }
  );
  
  return (
    <>
      <Modal show={show} centered>
        <Modal.Body className="py-2">
          <RxCross2
            color="#dc3545"
            className="p-1"
            type="button"
            size={25}
            style={{ backgroundColor: "#FEE4E2", borderRadius: "50%" }}
            onClick={() => onHide()}
          />
          <Modal.Title className="mt-2">Detail of Owner</Modal.Title>
          <h3 className="my-4 fw-bold">
            {data?.name}
            <a
              href={data?.uploadedId}
              target="_blank"
              className="text-decoration-none text-dark mx-2"
              style={{ fontSize: "24px" }}
              rel="noreferrer"
            >
              <BiLinkExternal />
            </a>
          </h3>{" "}
          <hr />
          <p>Address</p>
          <h4 className="fw-semibold">{data?._address}</h4> <hr />
          <p>Nationality</p>
          <h4 className="fw-semibold">{data?.nationality}</h4> <hr />
          <p>Id Type</p>
          <h4 className="fw-semibold">{data?.idType}</h4> <hr />
          <p>Id Number</p>
          <h4 className="fw-semibold">{data?.idNumber}</h4> <hr />
          <p>Total Land Count</p>
          <h4 className="fw-semibold">{parseInt(data?.landCount)}</h4> <hr />
          <p>Registration Date</p>
          <h4 className="fw-semibold">
            {moment
              ?.unix(data?.registrationDate?.toString())
              ?.format("DD/MM/YYYY")}
          </h4>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PersonDetailAdminModal;
