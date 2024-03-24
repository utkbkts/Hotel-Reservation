import React, { useState } from "react";
import img from "../image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import "../styles/navbar.scss";
import { Icon, IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/state.js";
const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  //!search
  const [search, setSearch] = useState("");
  return (
    <header className="navbarcontainer">
      <nav className="wrapper">
        <div className="content">
          <Link to={"/"}>
            <img src={img} alt="imagepic" />
          </Link>
        </div>
        <div className="search">
          <Input
            type={"text"}
            placeholder={"Search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton className="searchicon" disabled={search === ""}>
            <Search
              sx={{ color: variables.pinkred }}
              onClick={() => navigate(`/properties/search/${search}`)}
            />
          </IconButton>
        </div>
        <div className="right">
          {user ? (
            <Link className="host" to={"/createlist"}>
              Create Listining
            </Link>
          ) : (
            <Link className="host">Hi !</Link>
          )}
          <button
            className="account"
            onClick={() => setDropDownMenu(!dropDownMenu)}
          >
            {!dropDownMenu ? (
              <Menu sx={{ color: variables.darkgrey }} />
            ) : (
              <CloseIcon sx={{ color: variables.darkgrey }} />
            )}
            {!user ? (
              <Person sx={{ color: variables.darkgrey }} />
            ) : (
              <img
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
                src={`${
                  process.env.REACT_APP_API_URL
                }/${user.profileImagePath.replace("public", "")}`}
                alt="imagepic"
              />
            )}
          </button>
          {dropDownMenu && !user && (
            <div className="dropdown login">
              <Link onClick={() => setDropDownMenu(false)} to={"/login"}>
                Log in
              </Link>
              <Link onClick={() => setDropDownMenu(false)} to={"/signup"}>
                Sign up
              </Link>
            </div>
          )}
          {dropDownMenu && user && (
            <div className="dropdown">
              <Link
                onClick={() => setDropDownMenu(false)}
                to={`/${user._id}/trips`}
              >
                Trip List
              </Link>
              <Link
                onClick={() => setDropDownMenu(false)}
                to={`/${user._id}/wishList`}
              >
                Wish List
              </Link>
              <Link
                onClick={() => setDropDownMenu(false)}
                to={`/${user._id}/properties`}
              >
                Property List
              </Link>
              <Link
                onClick={() => setDropDownMenu(false)}
                to={`/${user._id}/reservation`}
              >
                Reservation List
              </Link>
              <Link
                className="logout"
                to={"/login"}
                onClick={() => {
                  dispatch(setLogout());
                  setDropDownMenu(false);
                }}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
