import React from "react";
import NavbarTop from "./NavbarTop";
import { Col, Container, Row } from "react-bootstrap";
import {
  GoogleMap,
  GoogleMapsMarkerClusterer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { SiGooglemaps } from "react-icons/si";
import LandDetailModal from "./LandDetailModal";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import HomeLandCards from "./HomeLandCards";
import {DotLoader} from "react-spinners"

const Home = () => {
  const [show, setShow] = React.useState(false);
  const [map, setMap] = React.useState(null);
  const handleShow = () => setShow(true);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const [center, setCenter] = React.useState({
    lat: 28.498241,
    lng: 77.33801705963144,
  });
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getAllLands");
  const { data: allLocation, isLoading: locationLoading } = useContractRead(
    contract,
    "getAllLocations"
  );

  const onLoad = React.useCallback(
    function callback(map) {
      if (!locationLoading) {
        // Create new array removing the element that has empty string
        const _allLocation = allLocation.filter((location) => location !== "");
        console.log("All Location", _allLocation);
        // Create bounds with all markers
        const bounds = new window.google.maps.LatLngBounds();
        _allLocation.forEach((location) => {
          location = location.split(",");
          console.log(location);
          bounds.extend({
            lat: parseFloat(location[0]),
            lng: parseFloat(location[1]),
          });
        });
        // Center map to bounds
        map.panToBounds(bounds);
        // Set zoom to 12
        map.setZoom(14);
        // Bind map to marker
        setMap(map);
      }
    },
    [locationLoading, allLocation]
  );

  return (
    <div>
      <NavbarTop />
      <h1 className="text-center my-5 position-relative">Land verification and Geo-fencing</h1>
      {/* <Filter /> */}
      
      {data?.length > 0 ? 
      <Container>
        <Row className="my-5" xs={1} sm={2}>
          <Col>
            <h2>Registered Lands</h2>
            <div className="d-flex justify-content-between align-item-center">
              <p>Showing {data?.length} Land Properties</p>
            </div>
            <Row xs={1} sm={2} className="mt-3">
              {data &&
                data?.map((itemData, i) => {
                  return <HomeLandCards itemData={itemData} key={i}/>;
                })}
            </Row>
          </Col>
          <Col>
            <div style={{ height: "100vh", width: "100%" }}>
              {isLoaded && !locationLoading && (
                <GoogleMap
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                  center={center}
                  onLoad={onLoad}
                  zoom={12}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
       : <DotLoader color="#36d7b7" size={100} className="homeLoader"/>}
      
    </div>
  );
};

export default Home;
