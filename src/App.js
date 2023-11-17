// import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandOwnerReg from "./pages/LandOwnerReg";
// Views
import Home from "./components/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ManageLand from "./pages/ManageLand";
import LandOwnerShipTransfer from "./pages/LandOwnerShipTransfer";
import { Lands } from "./pages/Lands";
import AllLands from "./pages/AllLands";
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
        <Route path="/manage-land" element={<ManageLand />} />
        <Route
          path="/land-ownership-transfer"
          element={<LandOwnerShipTransfer />} 
        />
        <Route path="/land/:landId" element={<Lands />} />
        <Route path="/all-lands" element={<AllLands />} />
        <Route path="/status" element={<Status />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </main>
  );
}
