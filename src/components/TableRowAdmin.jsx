import React, { useEffect, useState } from "react";
import profileImg from "../assets/Avatar.svg";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react-core";
import { toast } from "react-toastify";
import ModalComponent from "./ModalComponent";
import { Button } from "react-bootstrap";
import { GoCheck } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import Status from "./Status";
import { LuLoader } from "react-icons/lu";
import moment from "moment/moment";
import PersonDetailAdminModal from "./PersonDetailAdminModal";


export const TableRowAdmin = ({ item }) => {
  const [userAddress, setUserAddress] = useState(null);
  const address = useAddress();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const [show, setShow] = useState(false);
  const [personDetialModal, setPersonDetialModal] = useState(false);
  const handleShow = () => setShow(true);
  const handlepersonDetialModalShow = () => setPersonDetialModal(true);
  const { data, isLoading: dataLoading } = useContractRead(
    contract,
    "getLandRegistrationRequest",
    [item],
    { from: address }
  );

  
  const { mutateAsync: approveLandRegistrationRequest, isLoading } = useContractWrite(contract, "approveLandRegistrationRequest")
  
  useEffect(() => {
    const getAddress = async () => {
      const location = await data?.location?.split(",");

      if(!location) return;
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location[0]}&lon=${location[1]}`;
        const response = await fetch(url);
        const data = await response.json();

        setUserAddress(data?.display_name);
      } catch (error) {
        console.error(error);
      }
    };
    getAddress();
  }, [data]);

  return (
    <>
     <tr key={item}>
      <td style={{ minWidth: "100px" }} className="ps-3">
        {item}
      </td>
      <td className="d-flex align-datas-center">
        <div style={{ width: "40px", height: "40" }}>
          <img src={profileImg} alt="profile" />
        </div>
        <div style={{ minWidth: "150px" }} className="ms-3" onClick={handlepersonDetialModalShow}>
          <p className="fw-bold mb-0">{data?.ownerName}</p>
          <p className="mb-0">
            {data?.owner.slice(0, 6) + "..." + data?.owner.slice(-4)}{" "}
          </p>
        </div>
      </td>
      <td style={{ minWidth: "350px" }}>
        <p>{userAddress}</p>
      </td>
      <td style={{ minWidth: "150px" }}>
        <p>
          {data?.approvalDate.toString() === "0"
            ? "NA"
            : moment.unix(data?.approvalDate.toString()).format("DD-MM-YYYY")}
        </p>
      </td>
      <td style={{ minWidth: "200px" }}>
        {/* Status 0 means Invalid, 1 means Pending, 2 Means Approved, 3 means Rejected */}
        <Status status={data?.status} />
      </td>
      <td
        style={{ minWidth: "150px" }}
        className="d-flex justify-content-around"
      >
        <Button
          variant="outline-success"
          disabled={isLoading || data?.status !== 1}
          onClick={async() => {
            try {
              const data = await approveLandRegistrationRequest({ args: [item] });
              toast.success("Approved")
            } catch (err) {
              console.error("contract call failure", err);
            }
          }}
        >
          {isLoading ? <LuLoader /> : <GoCheck />}
        </Button>
        <Button
          variant="outline-danger"
          disabled={isLoading || data?.status !== 1}
          onClick={handleShow}
        >
          {dataLoading ? <LuLoader /> : <RxCross2 />}
        </Button>
      </td>
      <td style={{ minWidth: "200px" }}>
        <a href={data?.uploadedFiles} target="_blank">
          View Doc
        </a>
      </td>

      <ModalComponent show={show} setShow={setShow} item={item} type="register" />
      <PersonDetailAdminModal show={personDetialModal} onHide={() => setPersonDetialModal(false)} _landOwner={data?.owner}/>
    </tr>
    
    </>
    
  );
};
