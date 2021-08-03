import React, { Suspense } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Select } from "antd";
import {
  USER_ACCESS_TOKEN,
  USER_INFO,
} from "../../utils/constants/settingSystem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { CHANGE_LOCALE } from "../../redux/constants/totalConstants";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
const { Option } = Select;

function MyComponent(props) {
  const { t, i18n } = useTranslation();
  const value = useSelector((state) => state.localeReducer.value);
  const dispatch = useDispatch();
  const handleChange = async (value) => {
    await i18n.changeLanguage(value);
    await dispatch({
      type: CHANGE_LOCALE,
      payload: {
        value: value,
      },
    });
  };
  const menu = (
    <Menu>
      <Menu.Item className="bg-white hover:bg-gray-400">
        <Link className="text-black " onClick={scrollToTop} to="/TaiKhoan">
          {t("Account Info")}
        </Link>
      </Menu.Item>
      {JSON.parse(localStorage.getItem(USER_INFO))?.maLoaiNguoiDung ===
      "QuanTri" ? (
        <Menu.Item className="bg-white hover:bg-gray-400">
          <Link
            className="text-black "
            onClick={scrollToTop}
            to="/QuanTri/DashBoard"
          >
            {t("Administrator")}
          </Link>
        </Menu.Item>
      ) : (
        <></>
      )}

      <Menu.Item className="bg-white hover:bg-gray-400">
        <Link
          className=" text-black "
          to="/"
          onClick={() => {
            localStorage.clear();
            scrollToTop();
          }}
        >
          {t("Sign out")}
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {localStorage.getItem(USER_ACCESS_TOKEN) ? (
        <div className="inline-block mr-3">
          <Dropdown overlay={menu} placement="bottomCenter">
            <div className="flex items-center">
              <div className="inline-block border-2 rounded-full p-1 border-gray-500 mr-2 h-9 flex items-center">
                <UserOutlined style={{ fontSize: "25px", color: "gray" }} />
              </div>
              <p className="text-gray-500 font-bold cursor-pointer hover:underline m-0 text-sm inline-block">
                {JSON.parse(localStorage.getItem(USER_INFO))?.hoTen}
              </p>
            </div>
          </Dropdown>
        </div>
      ) : (
        <Link
          className="text-gray-500 font-bold cursor-pointer hover:text-gray-600 m-0 text-sm inline-block mr-3"
          to="/Login"
          onClick={scrollToTop}
        >
          {`${t("Sign in")}/${t("Register")}`}
        </Link>
      )}
      <div className="inline-block">
        <Select value={value} style={{ width: 100 }} onChange={handleChange}>
          <Option value="en">English</Option>
          <Option value="vi">Tiếng việt</Option>
          <Option value="chi">中国人</Option>
        </Select>
      </div>
    </div>
  );
}

export default function UserButton() {
  return (
    <Suspense fallback="loading">
      <MyComponent />
    </Suspense>
  );
}
