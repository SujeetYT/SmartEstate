import React, {useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import LandCards from "../components/LandCards";
import NavbarTop from "../components/NavbarTop";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AllLands = () => {
  const address = useAddress();
  const navigate = useNavigate();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(
    contract,
    "getLandIdsOfLandOwner",
    [address],
    {
      from: address,
    }
  );
  const { data: landOwnerData, isLoading: landOwnerLoading } = useContractRead(contract, "getUserType", [address])
  useEffect(() => {
    console.log("Running..");
  }, [address]);

  useEffect(() => {
    if (landOwnerData?.toString() !== "2" && !landOwnerLoading) {
      navigate("/");
    }
  }, [landOwnerData, landOwnerLoading])

  return (
    <div>
      <NavbarTop />
      <Container>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <DotLoader color="#0d6efd" />
          </div>
        ) : (
        <>
          <h1 className="mt-5">Land Owned by You</h1>
          {data?.length > 0 ? (
            <Row className="my-5" xs={1} md={2} lg={3}>
              {data &&
                data?.map((landsMapData, i) => {
                  return <LandCards landsData={landsMapData} />;
                })}
            </Row>
          ) : (
            <DotLoader color="#36d7b7" size={200} className="homeLoader" />
          )}
        </>
        )}
      </Container>
    </div>
  );
};

export default AllLands;
