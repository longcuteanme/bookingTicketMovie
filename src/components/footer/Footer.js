import React, { Suspense } from "react";
import backgroundFooter from "../../assets/images/backgroundFooter.jpg";
import {
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import antd from "../../assets/icon/antd.png";
import axios from "../../assets/icon/axios.png";
import bizchart from "../../assets/icon/bizchart.png";
import i18 from "../../assets/icon/i18.png";
import lodash from "../../assets/icon/lodash.png";
import moment from "../../assets/icon/moment.png";
import redux_saga from "../../assets/icon/redux_saga.png";
import redux from "../../assets/icon/redux.png";
import tailwind from "../../assets/icon/tailwind.png";

function MyComponent() {
  const { t } = useTranslation();
  return (
    <div
      className="h-auto w-screen bg-cover bg-cente py-24 px-52"
      id="footer"
      style={{ backgroundImage: `url(${backgroundFooter})` }}
    >
      <div className="w-full text-white grid grid-cols-2">
        <div className="Info">
          <h1 className="text-white text-3xl">{t("Info Contact")}</h1>
          <table>
            <tbody key="tbody">
              <tr>
                <td className="p-2">
                  <UserOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="text-lg p-2">Trịnh Văn Long - 23y</td>
              </tr>
              <tr>
                <td className="p-2">
                  <PhoneOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="text-lg p-2">0384912727</td>
              </tr>
              <tr>
                <td className="p-2">
                  <MailOutlined style={{ color: "white", fontSize: "30px" }} />
                </td>
                <td className="text-lg p-2">psatrinhlongat48@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="congNghe ">
          <h1 className="text-white text-3xl">{t("Technology Used")}</h1>
          <div>
            <img className="w-16 m-3 inline-block" src={antd} alt="antd"></img>
            <img className="w-16 m-3 inline-block" src={tailwind} alt="tailwind"></img>
            <img className="w-16 m-3 inline-block" src={axios} alt="axios"></img>
            <img className="w-16 m-3 inline-block" src={bizchart} alt="bizchart"></img>
            <img className="w-16 m-3 inline-block" src={i18} alt="i18"></img>
            <img className="w-16 m-3 inline-block" src={lodash} alt="lodash"></img>
            <img className="w-16 m-3 inline-block" src={moment} alt="moment"></img>
            <img className="w-16 m-3 inline-block" src={redux} alt="redux"></img>
            <img className="w-16 m-3 inline-block" src={redux_saga} alt="redux_saga"></img>
          </div>
        </div>
      </div>
      <hr className="my-5" style={{ color: "white", border: "1px solid" }} />
      <table className="m-auto">
        <tbody key="tbody">
        <tr>
          <td>
            <GithubOutlined
              style={{ color: "white", fontSize: "20px", padding: "5px" }}
            />
          </td>
          <td className="text-sm text-white p-2">
            <a href="https://github.com/longcuteanme/bookingTicketMovie">
              https://github.com/longcuteanme/bookingTicketMovie
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Footer() {
  return (
    <Suspense fallback="loading">
      <MyComponent />
    </Suspense>
  );
}
