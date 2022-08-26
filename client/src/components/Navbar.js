import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
// import { MdOutlineSpaceDashboard } from "react-icons/md";

import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
// import Logo from "./Logo";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const { toggleSideBar, logoutUser, user } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>

        <div>
          <h3 className="logo-text">dashboard </h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
