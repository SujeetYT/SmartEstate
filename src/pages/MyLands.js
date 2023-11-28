import React, { useEffect } from "react";
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
  let { data, isLoading } = useContractRead(
    contract,
    "getLandIdsOfLandOwner",
    [address],
    {
      from: address,
    }
  );

  data = data?.filter((landsMapData)=>{
    return (landsMapData !== "0x0000000000000000000000000000000000000000000000000000000000000000")
  })

  console.log(data);

  const { data: landOwnerData, isLoading: landOwnerLoading } = useContractRead(contract, "getUserType", [address])

  useEffect(() => {
    if (landOwnerData?.toString() !== "2" && !landOwnerLoading) {
      navigate("/");
    }
  }, [landOwnerData, landOwnerLoading])

  return (
    <div>
      <NavbarTop />
      <Container>
        <h1 className="mt-5">Land Owned by You</h1>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <DotLoader color="36d7b7" size={200} className="homeLoader mt-5" />
          </div>
        ) : (
          <>
            {data?.length > 0 ? (
              <Row className="my-5" xs={1} md={2} lg={3}>
                {data &&
                  data?.map((landsMapData, i) => {
                    return <LandCards landsData={landsMapData} key={i} />;
                  })
                }
              </Row>
            ) : (
              <div 
                className="d-flex justify-content-center align-items-center"
                style={{
                  height: "50vh"
                }}
              >
                Sorry! You don't have any Estate.
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default AllLands;
