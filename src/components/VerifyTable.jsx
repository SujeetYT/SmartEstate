import { useContract, useContractRead } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Status from "./Status";

export const VerifyTable = ({ _landId }) => {
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getLand", [_landId]);


  console.log(data);
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
          <th>Land ID</th>
          <th>
            <p>{data?.landId}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Location</th>
          <th>
            <p>{data?.location}</p>
          </th>
        </tr>
        <tr>
          <th>Owner ID</th>
          <th>
            <p>{data?.owner}</p>
          </th>
        </tr>
        <tr>
          <th>Owner Name</th>
          <th>
            <p>{data?.ownerName}</p>
          </th>
        </tr>
      </tbody>
    </Table>
  );
};
