import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../css/navbar.css";
import { render } from "react-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBIcon,
} from "mdbreact";

function MainNavbar({ showWebsiteList, websitename }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  var token = localStorage.getItem("token");
  var decoded_token = jwt_decode(token);
  var userId = decoded_token.userId;
  console.log(userId);

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const onButtonLeave = () => {
    if (window.innerWidth < 960) {
      setButton(false);
    } else {
      setButton(false);
    }
  };

  const renderOwner = () => {
    var owner_props = [
      { name: "orders", desc: "Orders" },
      { name: "adjustproducts", desc: "Add New Products" },
      { name: "removeproducts", desc: "Remove Product!" },
    ];
    if (loggedIn) return owner_props;
    else return [];
  };

  if (userId === "customer") {
    var navitems = [
      { name: "whatsonoffer", desc: "On Sale" },
      { name: "aboutme", desc: "About Me" },
      { name: "basket", desc: "Basket" },
      { name: "services", desc: "Services" },
    ];
  } else {
    var navitems = [
      { name: "whatsonoffer", desc: "On Sale" },
      { name: "aboutme", desc: "About Me" },
      { name: "basket", desc: "Basket" },
      { name: "services", desc: "Services" },
      { name: "orders", desc: "Orders" },
      { name: "adjustproducts", desc: "Add New Products" },
      { name: "removeproducts", desc: "Remove Product!" },
    ];
  }

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            to={`/-/${websitename}/${showWebsiteList}`}
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            Welcome!
          </Link>
          <div className="menu-icon" onclick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {navitems.map((items) => (
              <li className="nav-item">
                <Link
                  to={`/-/${websitename}/${showWebsiteList}/${items.name}`}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {items.desc}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mobile-menu" onClick={handleClick}>
          <button>Options</button>
        </div>
      </nav>
    </>
  );
}

export default MainNavbar;
