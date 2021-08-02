import React, { Suspense } from "react";
import backgroundFooter from "../../assets/images/backgroundFooter.jpg";
import {
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import antd from '../../assets/icon/antd.png'
import axios from '../../assets/icon/axios.png'
import bizchart from '../../assets/icon/bizchart.png'
import i18 from '../../assets/icon/i18.png'
import lodash from '../../assets/icon/lodash.png'
import moment from '../../assets/icon/moment.png'
import redux_saga from '../../assets/icon/redux_saga.png'
import redux from '../../assets/icon/redux.png'
import tailwind from '../../assets/icon/tailwind.png'


function MyComponent () {
    const { t, i18n } = useTranslation();
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
            </table>
          </div>
          <div className="congNghe ">
            <h1 className="text-white text-3xl">{t("Technology Used")}</h1>
            <div>
              <img className="w-16 m-3 inline-block" src={antd}></img>
              <img className="w-16 m-3 inline-block" src={tailwind}></img>
              <img className="w-16 m-3 inline-block" src={axios}></img>
              <img className="w-16 m-3 inline-block" src={bizchart}></img>
              <img className="w-16 m-3 inline-block" src={i18}></img>
              <img className="w-16 m-3 inline-block" src={lodash}></img>
              <img className="w-16 m-3 inline-block" src={moment}></img>
              <img className="w-16 m-3 inline-block" src={redux}></img>
              <img className="w-16 m-3 inline-block" src={redux_saga}></img>
            </div>
          </div>
        </div>
        <hr className="my-5" style={{ color: "white", border: "1px solid" }} />
        <table className="m-auto">
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
  
