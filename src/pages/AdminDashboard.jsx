import React from "react";
import TableComponent from "../components/TableComponent";
import { Container } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TrasnferTable from "../components/TrasnferTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

const AdminDashboard = () => {
  const address = useAddress();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getUserType", [address])
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data?.toString());
    if (data?.toString() !== "1" && !isLoading) {
      console.log("here");
      navigate("/");
    }
  }, [data, isLoading])

  return (
    <>
      <NavbarTop />
      <Container className="my-5">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <BeatLoader color="#0d6efd" />
          </div>
        ) : (
          <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-5"
            fill
          >
            <Tab eventKey="home" title="Land Registration Request">
              <h1>Land Registration Request</h1>
              <p>View land owners request to register lands.</p>
              {/* <Search placeholder={"Search for requests"} /> */}
              <div className="mt-4">
                <TableComponent />
              </div>
            </Tab>
            <Tab eventKey="profile" title="Land OwnerShip Transfer Request">
              <h1>Land OwnerShip Transfer Request</h1>
              <p>View land owners request to transfer lands.</p>
              {/* <Search placeholder={"Search for requests"} /> */}
              <div className="mt-4">
                <TrasnferTable />
              </div>
            </Tab>
          </Tabs>
        )}
      </Container>
    </>
  );
};

export default AdminDashboard;
