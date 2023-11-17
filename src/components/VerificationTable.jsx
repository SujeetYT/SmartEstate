import { useContract, useContractRead } from "@thirdweb-dev/react";
import moment from "moment/moment";
import React from "react";
import Table from "react-bootstrap/Table";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

export const VerificationTable = ({ id }) => {
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getLand", [id]);
  const { data: getLandTransferHistory, isLoading: landHistoryLoader } =
    useContractRead(contract, "getLandTransferHistory", [id]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <BeatLoader color="#0d6efd" />
        </div>
      ) : (
        <>
          {data?.registrationDate?.toString() === "0" ? (
            <h4 className="mt-5 text-center text-danger">
              Land not registered
            </h4>
          ) : null}
          <Table
            bordered
            hover
            responsive
            className="mt-5 mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <tbody>
              <tr>
                <th>ID</th>
                <td>
                  {data?.landId?.slice(0, 6) + "..." + data?.landId?.slice(-4)}
                </td>
              </tr>
              <tr>
                <th>Location Coordinates</th>
                <td>{data?.location}</td>
              </tr>
              <tr>
                <th>Owner</th>
                <td>{data?.ownerName}</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>{data?.area?.toString() + " sq. ft."}</td>
              </tr>
              <tr>
                <th>Owner Wallet</th>
                <td>
                  {data?.owner?.slice(0, 6) + "..." + data?.owner?.slice(-4)}
                </td>
              </tr>
              <tr>
                <th>Registration Date</th>
                <td>
                  {moment
                    .unix(data?.registrationDate?.toString())
                    .format("MMMM Do YYYY")}
                </td>
              </tr>
            </tbody>
          </Table>
          <h3 className="mt-5">Ownership Transfer History</h3>
          {landHistoryLoader ? (
            <div className="d-flex justify-content-center align-items-center">
              <BeatLoader color="#FF5A5F" />
            </div>
          ) : (
            <>
              {getLandTransferHistory?.length === 0 ? (
                <p className="text-center">No History</p>
              ) : (
                <Table striped hover responsive>
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
        </>
      )}
    </>
  );
};
