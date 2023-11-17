import React from "react";
import { Modal, Table } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import moment from "moment";
import { toast } from "react-toastify";
import { BiClipboard } from "react-icons/bi";
import { BeatLoader } from "react-spinners";

const LandDetailModal = ({ show, onHide, _landId }) => {
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getLand", [_landId]);

  const { data: getLandTransferHistory, isLoading: landHistoryLoader } =
    useContractRead(contract, "getLandTransferHistory", [_landId]);

  return (
    <>
      <Modal show={show} centered>
        <Modal.Body className="py-2">
          <RxCross2
            color="#dc3545"
            className="p-1"
            size={25}
            style={{ backgroundColor: "#FEE4E2", borderRadius: "50%" }}
            onClick={() => onHide()}
          />
          <Modal.Title className="mt-2">Details</Modal.Title>
          <h3 className="my-4 fw-bold">{data?.ownerName}</h3>
          <p>Registration Date</p>

          <h4 className="fw-semibold">
            {moment
              ?.unix(data?.registrationDate?.toString())
              ?.format("DD/MM/YYYY")}
          </h4>
          <hr />
          <p className="text-muted mb-0">Land Id </p>
          <h4 className="fw-semibold">
            {
                _landId?.slice(0, 6) + "..." + _landId?.slice(-4)
            }{" "}
            <span className="ms-5" type="button">
              {" "}
              <BiClipboard
                size={25}
                onClick={() => {
                  navigator?.clipboard?.writeText(_landId);
                  toast.success("Copied");
                }}
              />
            </span>
          </h4>
          <hr />
          <p className="text-muted mb-0">Property Size</p>
          <h4 className="fw-semibold">{parseInt(data?.area)} SQ. FT.</h4>
          <hr />
          <p className="text-muted mb-0">Owner</p>
          <h4 className="fw-semibold">{
            data?.owner?.slice(0, 6) + "..." + data?.owner?.slice(-4)
          }</h4>
          <hr />
          <p className="text-muted mb-0">Ownership Transfer History</p>
          {landHistoryLoader ? (
            <div className="d-flex justify-content-center align-items-center">
              <BeatLoader color="#FF5A5F" />
            </div>
          ) : (
            <>
              {getLandTransferHistory?.length === 0 ? (
                <p className="text-center">No History</p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Transfer Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getLandTransferHistory?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <span className="fw-bold">{index + 1}</span>
                        </td>
                        <td
                          onClick={() => {
                            navigator?.clipboard?.writeText(item?.from);
                            toast.success("Copied");
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {item?.from?.slice(0, 6) +
                            "..." +
                            item?.from?.slice(-4)}
                        </td>
                        <td
                          onClick={() => {
                            navigator?.clipboard?.writeText(item?.to);
                            toast.success("Copied");
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {item?.to?.slice(0, 6) + "..." + item?.to?.slice(-4)}
                        </td>
                        <td>
                          {moment
                            ?.unix(item?.approvalDate?.toString())
                            ?.format("DD/MM/YYYY")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LandDetailModal;
