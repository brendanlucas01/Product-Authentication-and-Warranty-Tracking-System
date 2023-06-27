import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";

import { NavLink, Link } from "react-router-dom";

import { useMoralis,useWeb3Contract } from "react-moralis";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Create",
    url: "/create",
  },
  // {
  //   display: "Signup",
  //   url: "/contact",
  // },
  {
    display: "Transfer",
    url: "/Transfer",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const {enableWeb3,isWeb3Enabled} = useMoralis();
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const menuRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        // headerRef.current.classList.add("header__shrink");
      } else {
        // headerRef.current.classList.remove("header__shrink");
      }
    });

    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i class="ri-fire-fill"></i>
              </span>
              NFTs
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            {
              isWeb3Enabled ?
              (
                <button className="btn d-flex gap-2 align-items-center" style={{"color":"white"}}>
              <span>
                <i class="ri-wallet-line"></i>
              </span>
              Connected
            </button>
              )
              :
                (
                  <button onClick={()=>{enableWeb3()}} className="btn d-flex gap-2 align-items-center" style={{"color":"white"}}>
                    <span>
                  <i class="ri-wallet-line"></i>
                  </span>
              Connect Wallet
            </button>
                )
            }
            {/* <button className="btn d-flex gap-2 align-items-center">
              <span>
                <i class="ri-wallet-line"></i>
              </span>
              <Link to="/wallet">Connect Wallet</Link>
            </button> */}

            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
