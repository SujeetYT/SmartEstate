// import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandOwnerReg from "./pages/LandOwnerReg";
// Views
import Home from "./components/Home";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterLand from "./pages/RegisterLand";
import LandOwnerShipTransfer from "./pages/LandOwnerShipTransfer";
import { Lands } from "./pages/Lands";
import AllLands from "./pages/MyLands";
import { Status } from "./pages/Status";
import { Verification } from "./pages/Verification";

export default function App() {
  return (
    <main>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/land-owner-registration" element={<LandOwnerReg />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/register-land" element={<RegisterLand />} />
        <Route
          path="/land-transfer"
          element={<LandOwnerShipTransfer />}
        />
        <Route path="/land/:landId" element={<Lands />} />
        <Route path="/my-lands" element={<AllLands />} />
        <Route path="/status" element={<Status />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </main>
  );
}


// Thirdweb contract link: https://thirdweb.com/mumbai/0x51235783997d5FaD80Bb38f0226116c359585A44/explorer
// PolygonScan link: https://mumbai.polygonscan.com/tx/0x9a1396d4cf8c8a1f6b1164184346e2c9e46535fc058bbd149eaef91c62c0fc44
 