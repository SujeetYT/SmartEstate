import { useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import Table from "react-bootstrap/Table";
import Status from "./Status";

export const StatusTable = ({ id, type }) => {
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(
    contract,
    "getLandRegistrationRequestStatusAndComment",
    id
  );

  const { data: transferData, isLoading: isTransferLoading } = useContractRead(
    contract,
    "getLandTransferRequestStatusAndComment",
    id
  );

  return (
    <Table
      bordered
      hover
      responsive
      className="mt-5 mx-auto"
      style={{ maxWidth: "700px" }}
    >
      <thead>
        <tr>
          <th>Status</th>
          <th>
            {type === "register" ? (
              <Status status={data?.status} />
            ) : (
              <Status status={transferData?.status} />
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Comment</th>
          <th>
            <p>{type === "register" ? data?.comment : transferData?.comment}</p>
          </th>
        </tr>
      </tbody>
    </Table>
  );
};
