import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import NavbarTop from "../components/NavbarTop";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useParams } from "react-router";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { BiClipboard } from "react-icons/bi";
import { toast } from "react-toastify";
import PersonDetailAdminModal from "../components/PersonDetailAdminModal";
import { BeatLoader } from "react-spinners";
import { Scrollbar, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


export const Lands = () => {
  const [gridImgData, setGridImgData] = useState([{ id: 1, image: "" }])
  const [active, setActive] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);

  const _landId = useParams().landId;
  const { data, isLoading } = useContractRead(contract, "getLand", [_landId]);
  const {
    data: getLandTransferHistory,
    isLoading: getLandTransferHistoryLoader,
  } = useContractRead(contract, "getLandTransferHistory", [_landId]);

  const newLocation = data?.location;
  // const [show, setShow] = React.useState(false);
  const [personalDetail, setPersonalDetail] = React.useState(false);

  const handleShow = () => setPersonalDetail(true);

  const [parts, setParts] = useState([]);

  useEffect(() => {
    location();
  }, [data]);

  const [center, setCenter] = React.useState({ lat: 40.72212, lng: 74.043176 });
  const [name, setName] = React.useState("1530 Dumble St.");
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  // });

  const location = async () => {
    const newLocation = await data?.location;
    const partsArray = await newLocation?.split(",");
    setParts(partsArray);
    setCenter({ lat: Number(parts[0]), lng: Number(parts[1]) });
  };
  // Add markers to map
  const onLoad = React.useCallback(
    (map) => {
      const marker = new window.google.maps.Marker({
        position: { lat: center.lat, lng: center.lng },
        map,
      });

      const infowindow = new window.google.maps.InfoWindow({
        content: name,
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    },
    [center.lat, center.lng]
  );

  const copyHandler = () => {
    navigator?.clipboard?.writeText(_landId);
    toast.success("Copied");
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setSlidesPerView(4);
      } else if (screenWidth >= 768 || screenWidth <= 1200) {
        setSlidesPerView(3);
      } else if (screenWidth >= 576 || screenWidth >= 578) {
        setSlidesPerView(3);
      } else if (screenWidth < 576) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavbarTop />
      <Container className="my-5">
        <Row xs={1} md={2}>
          <Col className="mb-5 mb-md-0" style={{ minHeight: "50vh" }}>
            <div
              className='mainImage'
              style={{
                backgroundImage: `url(${gridImgData[active].image})`,
              }}
            ></div>
            <div className='mt-4'>
              <Swiper
                modules={[Mousewheel, Scrollbar]}
                spaceBetween={2}
                slidesPerView={slidesPerView}
                scrollbar={{ draggable: true }}
                mousewheel={true}
                keyboard={{
                  enabled: true,
                }}
              >
                {gridImgData.map((item, i) => (
                  <SwiperSlide
                    key={item.id}
                    style={{ width: "100px", height: "100px" }}
                  >
                    <div
                      key={i}
                      className={`sliderImage border-2 p-2 text-center ${active === i ? "border-primary" : ""}`}
                      style={{ backgroundImage: `url(${item.image})` }}
                      onMouseEnter={() => setActive(i)}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
          <Col>
            <h3 className="mb-4 fw-bold" type="button" onClick={handleShow}>
              {data?.ownerName}
            </h3>
            <p>Registration Date</p>

            <h4 className="fw-semibold">
              {moment
                .unix(data?.registrationDate.toString())
                .format("DD/MM/YYYY")}
            </h4>
            <hr />
            <p className="text-muted mb-0">Land Id</p>
            <h4 className="fw-semibold">
              {_landId?.slice(0, 6) + "..." + _landId?.slice(-4)}{" "}
              <span className="ms-5" type="button" onClick={copyHandler}>
                <BiClipboard size={25} />
              </span>
            </h4>
            <hr />
            <p className="text-muted mb-0">Property Size</p>
            <h4 className="fw-semibold">{parseInt(data?.area)} SQ. FT.</h4>
            <hr />
            <p className="text-muted mb-0">Owner</p>
            <h4 className="fw-semibold">
              {data?.owner.slice(0, 6) + "..." + data?.owner.slice(-4)}
            </h4>
            <hr />
            <p className="text-muted mb-3">Ownership Transfer History</p>
            {getLandTransferHistoryLoader ? (
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
                            {item?.to?.slice(0, 6) +
                              "..." +
                              item?.to?.slice(-4)}
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
          </Col>
          <PersonDetailAdminModal
            show={personalDetail}
            onHide={() => setPersonalDetail(false)}
            _landOwner={data?.owner}
          />
        </Row>
      </Container>
    </>
  );
};
