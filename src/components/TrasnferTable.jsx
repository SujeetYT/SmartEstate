import React, { useEffect } from "react";
import { HiArrowSmallDown } from "react-icons/hi2";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import TransferRowTable from "./TransferRowTable";
import { Table } from "react-bootstrap";
import { DotLoader } from "react-spinners";

const TrasnferTable = () => {
  const address = useAddress();

  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data: transferRequest, isLoading: landTrasferReqLoader } =
    useContractRead(contract, "getLandTransferRequestCount");

  return (
    <div>
      {parseFloat(transferRequest) > 0 ? (
        <Table bordered responsive>
          <thead>
            <tr>
              <td className="ps-3">
                ID <HiArrowSmallDown />
              </td>
              <td>Request by </td>
              <td className="text-center">To </td>
              <td className="text-center">Land ID </td>
              <td>
                Approved At <HiArrowSmallDown />
              </td>
              <td>Status </td>
              <td>Action</td>
              <td>View </td>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: transferRequest }, (_, i) => i + 1).map(
              (transferRequest) => (
                <TransferRowTable
                  key={transferRequest}
                  transferRequest={transferRequest}
                />
              )
            )}
          </tbody>
        </Table>
      ) : (
        <DotLoader color="#36d7b7" size={200} className="homeLoader" />
      )}
    </div>
  );
};

export default TrasnferTable;
