import React, { Component } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Redirect, Route } from "react-router-dom";
import MenuList from "./MenuList/MenuList";
import UserButton from "../../components/header/UserButton";
import { USER_INFO } from "../../utils/constants/settingSystem";

const { Header, Content } = Layout;

export default class TrangQuanTri extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { Component, ...restProps } = this.props;
    if (JSON.parse(localStorage.getItem(USER_INFO))?.maLoaiNguoiDung === "QuanTri") {
      return (
        <Layout className="w-screen h-auto" style={{ minHeight: "100vh" }}>
          <MenuList collapsed={this.state.collapsed} />
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{ padding: "0px 10px" }}
            >
              <table className="w-full table-fixed">
                <tr>
                  <th className="w-1/12 text-left">
                    {React.createElement(
                      this.state.collapsed
                        ? MenuUnfoldOutlined
                        : MenuFoldOutlined,
                      {
                        className: "trigger",
                        onClick: this.toggle,
                        style: {
                          color: "white",
                          fontSize: "30px",
                          marginLeft: "10px",
                        },
                      }
                    )}
                  </th>
                  <th className="w-8/12"></th>
                  <th className="3/12">
                    <UserButton />
                  </th>
                </tr>
              </table>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Route
                {...restProps}
                render={(propsRoute) => {
                  return (
                    <>
                      <Component {...propsRoute} />
                    </>
                  );
                }}
              />
            </Content>
          </Layout>
        </Layout>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
