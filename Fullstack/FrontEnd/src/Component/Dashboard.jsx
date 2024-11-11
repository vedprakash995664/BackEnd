import React, { useState } from "react";
import './Dashboard.css';
import Users from "./Users";
import UserDashboard from "./UsersDashboard";
import { useLocation } from "react-router-dom";  // Import useLocation to access state passed via navigate

function Dashboard() {
  const [CurrentView, setCurrentView] = useState('UDashboard');
  const handlemenuclick = (view) => {
    setCurrentView(view);
  };

  // Access name from location state (passed via navigate)
  const location = useLocation();
  const { name } = location.state || {};

  const renderContent = () => {
    switch (CurrentView) {
      case "setting":
        return <div>Setting</div>;
      case "UDashboard":
        return <div><UserDashboard/></div>;
      case "Users":
        return <div><Users /></div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="dashboard-container">
        {/* sidebar */}
        <div className="sidebar">
          <h3>Sidebar Menu</h3>
          <ul>
            <li onClick={() => handlemenuclick("UDashboard")}>Dashboard</li>
            <li onClick={() => handlemenuclick("Users")}>Users</li>
            <li onClick={() => handlemenuclick("setting")}>Setting</li>
          </ul>
        </div>
        {/* main dashboard */}
        <div className="main-content">
          {/* header */}
          <header className="header">
            <div className="profile-section">
              <img src="https://via.placeholder.com/40" alt="profile" className="profile-picture" />
              <span className="profile-name">Welcome Back !! {name ? name : "Guest"} !! </span>
            </div>
            <h2 className="view-title">Dashboard</h2>
          </header>
          <main className="content">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
