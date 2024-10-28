import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaHome, FaBell, FaBook, FaBuilding, FaInfo, FaCog, FaUser } from "react-icons/fa";
import "./Sidebar.css"; // Custom CSS

function SidebarComponent() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Sidebar collapsed={isCollapsed} backgroundColor="#001f3f" collapsedWidth="80px" width="250px">
      <div className="sidebar-header">
        <button onClick={handleToggle} className="toggle-btn">
          <FaBars />
        </button>
        {!isCollapsed && <span className="sidebar-title">StatCheck</span>}
      </div>

      <Menu iconShape="circle">
        <MenuItem icon={<FaHome />} component={<Link to="/home" />}>
          Home
        </MenuItem>

        <MenuItem icon={<FaBell />} component={<Link to="/notifications" />}>
          Notifications
        </MenuItem>

        <SubMenu icon={<FaBook />} label="Reservations">
          <MenuItem component={<Link to="/reservations/library" />}>Library</MenuItem>
          <MenuItem component={<Link to="/reservations/parking" />}>Parking</MenuItem>
        </SubMenu>

        <SubMenu icon={<FaBuilding />} label="Buildings">
          <MenuItem component={<Link to="/buildings/rtl" />}>RTL Building</MenuItem>
          <MenuItem component={<Link to="/buildings/gle" />}>GLE Building</MenuItem>
          <MenuItem component={<Link to="/buildings/nge" />}>NGE Building</MenuItem>
        </SubMenu>

        <MenuItem icon={<FaInfo />} component={<Link to="/about" />}>About Us</MenuItem>
        <MenuItem icon={<FaCog />} component={<Link to="/settings" />}>Settings</MenuItem>
        <MenuItem icon={<FaUser />} component={<Link to="/profile" />}>Profile</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarComponent;