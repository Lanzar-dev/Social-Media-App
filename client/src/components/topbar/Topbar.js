import React, { useContext, useState } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [signOut, setSignOut] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    // navigate("/login");
    document.location.href = "/login";
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Connectify</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat onClick={() => navigate("/messenger")} />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="signOutBtn">
          <ArrowDropDownIcon
            className="dropDownIcon"
            onClick={() => setSignOut(!signOut)}
          />
          {signOut && (
            <p className="signOut" onClick={handleSignOut}>
              Sign Out
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
