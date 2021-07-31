import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";

const scrollToTop = () => {
  window.scrollTo({
    top:0,
    left:0,
    behavior: 'smooth'
  });
};

export default class Header extends Component {
  render() {
    return (
      <header
        className="h-20 w-screen bg-white bg-opacity-95 fixed top-0 shadow-lg text-black text-center hover:bg-opacity-100"
        style={{ zIndex: "100" }}
      >
        <div className="flex justify-between content-center h-full w-full items-center">
          <div className="mx-12 h-4/5">
            <Link onClick={scrollToTop} to="/">
              <img className="w-20" src={logo} alt="logo"></img>
            </Link>
          </div>
          <div className="">
            <ul className="ulHeader">
              <li>
                <Link
                  className="text-gray-900 hover:text-red-500"
                  onClick={scrollToTop}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="text-gray-900 hover:text-red-500">
                <Link
                  className="text-gray-900 hover:text-red-500"
                  to={{ pathname: "/" }}
                  onClick={() => {
                    window.scroll({
                      top: 750,
                      behavior: "smooth",
                    });
                  }}
                >
                  List phim
                </Link>
              </li>
              <li className="text-gray-900 hover:text-red-500">
                <Link
                  className="text-gray-900 hover:text-red-500"
                  to={{ pathname: "/" }}
                  onClick={() => {
                    window.scroll({
                      top: 1800,
                      behavior: "smooth",
                    });
                  }}
                >
                  Hệ thống rạp
                </Link>
              </li>
              <li className="text-gray-900 hover:text-red-500">
                <a
                  className="text-gray-900 hover:text-red-500"
                  href="#footer"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div className="mx-12 ">
            <UserButton/>
          </div>
        </div>
      </header>
    );
  }
}
