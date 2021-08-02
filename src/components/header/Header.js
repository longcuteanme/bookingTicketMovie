import React, { Suspense } from "react";
import logo from "../../assets/images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useTranslation } from "react-i18next";


const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

function MyComponent() {
  const { t, i18n } = useTranslation();
  return (
    <header
      className="h-20 w-screen bg-white bg-opacity-95 fixed top-0 shadow-lg text-black text-center hover:bg-opacity-100"
      style={{ zIndex: "100" }}
    >
      <table className="h-full w-full table-fixed">
        <tr>
          <th className="w-3/12">
            <Link onClick={scrollToTop} to="/">
              <img className="w-20 inline-block" src={logo} alt="logo"></img>
            </Link>
          </th>
          <th className="w-6/12">
            <ul className="ulHeader">
              <li>
                <Link
                  className="text-gray-900 hover:text-red-500"
                  onClick={scrollToTop}
                  to="/"
                >
                  {t("Home")}
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
                  {t("List Film")}
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
                  {t("Theater System")}
                </Link>
              </li>
              <li className="text-gray-900 hover:text-red-500">
                <a className="text-gray-900 hover:text-red-500" href="#footer">
                  {t("Contact")}
                </a>
              </li>
            </ul>
          </th>
          <th className="w-3/12">
            <UserButton />
          </th>
        </tr>
      </table>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback="loading">
      <MyComponent />
    </Suspense>
  );
}
