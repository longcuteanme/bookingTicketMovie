import React, { Component } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import {
  USER_ACCESS_TOKEN,
  USER_INFO,
} from "../../utils/constants/settingSystem";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export default class UserButton extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item className="bg-white hover:bg-gray-400">
          <Link className="text-black " onClick={scrollToTop} to="/TaiKhoan">
            Tài khoản
          </Link>
        </Menu.Item>
        <Menu.Item className="bg-white hover:bg-gray-400">
          <Link
            className="text-black "
            onClick={scrollToTop}
            to="/QuanTri/DashBoard"
          >
            Quản trị
          </Link>
        </Menu.Item>
        <Menu.Item className="bg-white hover:bg-gray-400">
          <Link
            className=" text-black "
            onClick={scrollToTop}
            to="/"
            onClick={() => {
              localStorage.clear();
            }}
          >
            Đăng xuất
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        {localStorage.getItem(USER_ACCESS_TOKEN) ? (
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
        ) : (
          <Link
            className="text-gray-500 font-bold cursor-pointer hover:text-gray-600 m-0 text-sm inline-block"
            to="/Login"
            onClick={scrollToTop}
          >
            Đăng nhập
          </Link>
        )}
      </div>
    );
  }
}
