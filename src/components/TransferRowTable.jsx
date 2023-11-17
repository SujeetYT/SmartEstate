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
import { BiCopy } from "react-icons/bi";
import moment from "moment/moment";
import PersonDetailAdminModal from "./PersonDetailAdminModal";

const TransferRowTable = ({ transferRequest }) => {
  const [parts, setParts] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const address = useAddress();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const [show, setShow] = useState(false);
  const [personDetialModal, setPersonDetialModal] = useState(false);
  const handleShow = () => setShow(true);

  const { data, isLoading: dataLoading } = useContractRead(
    contract,
    "getLandTransferRequest",
    [transferRequest],
    { from: address }
  );

  const { mutateAsync: approveLandTransferRequest, isLoading } =
    useContractWrite(contract, "approveLandTransferRequest");



  return (
    <tr key={transferRequest}>
      <td className="ps-3">
        {transferRequest}
      </td>
      <td className="d-flex align-datas-center">
        <div
          style={{ width: "40px", height: "40" }}
          onClick={() => setPersonDetialModal(true)}
        >
          <img src={profileImg} alt="profile" />
        </div>
        <div className="ms-3">
          {/* <p className="fw-bold mb-0">{data?.ownerName}</p> */}
          <p className="mb-0">
            {data?.from?.slice(0, 6) + "..." + data?.from?.slice(-4)}{" "}
            <BiCopy
              onClick={() => {
                navigator.clipboard.writeText(data?.from);
                toast.success("Copied");
              }}
            />
          </p>
        </div>
      </td>
      <td>
        <p>
          {data?.to?.slice(0, 6) + "..." + data?.to?.slice(-4)}{" "}
          <BiCopy
            onClick={() => {
              navigator.clipboard.writeText(data?.to);
              toast.success("Copied");
            }}
          />
        </p>
      </td>
      <td>
        <p>{
        data?.landId?.slice(0, 6) + "..." + data?.landId?.slice(-4)
        }</p>
      </td>
      <td>
        <p>{moment(data?.data?.approvalDate).format("DD/MM/YYYY")}</p>
      </td>
      <td>
        {/* Status 0 means Invalid, 1 means Pending, 2 Means Approved, 3 means Rejected */}
        <Status status={data?.status} />
      </td>
      <td
       
        className="d-flex justify-content-around"
      >
        <Button
          variant="outline-success"
          disabled={isLoading || data?.status !== 1}
          onClick={async () => {
            try {
              const data = await approveLandTransferRequest({
                args: [transferRequest],
              });
              toast.success("Approved");
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

      <ModalComponent show={show} setShow={setShow} item={transferRequest} type="transfer" />
      <PersonDetailAdminModal
        show={personDetialModal}
        onHide={() => setPersonDetialModal(false)}
        _landOwner={data?.from}
      />
    </tr>
  );
};

export default TransferRowTable;
