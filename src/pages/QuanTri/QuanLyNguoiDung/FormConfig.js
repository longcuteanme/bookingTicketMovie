import React, { Component,Suspense } from "react";
import { Form, Input,Select } from "antd";
import rules from "../../../utils/rules/rules";
import { Translation } from "react-i18next";

const { Option } = Select;

class MyComponent extends Component {
  render() {
    return (
      <>
        <Form.Item
          name="hoTen"
          rules={[...rules.ten, ...rules.required]}
          initialValue=""
          label={<Translation>{(t) => <>{t("Full Name")}</>}</Translation>}
          style={{
            display: "inline-block",
            width: "calc(100% - 8px)",
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[...rules.required, ...rules.email]}
          label={<Translation>{(t) => <>{t("Email")}</>}</Translation>}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          name="soDt"
          rules={[...rules.required, ...rules.soDienThoai]}
          label={<Translation>{(t) => <>{t("Phone Number")}</>}</Translation>}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginLeft: "8px",
          }}
        >
          <Input type="string" />
        </Form.Item>

        <Form.Item
          name="taiKhoan"
          rules={[...rules.required, ...rules.username]}
          label={<Translation>{(t) => <>{t("Account")}</>}</Translation>}
          style={{
            display: "inline-block",
            width: "calc(70% - 8px)",
          }}
        >
          <Input type="string" />
        </Form.Item>

        <Form.Item
          name="maLoaiNguoiDung"
          rules={[...rules.required]}
          label={<Translation>{(t) => <>{t("User type")}</>}</Translation>}
          style={{
            display: "inline-block",
            width: "calc(30% - 8px)",
            marginLeft: "8px",
          }}
        >
          <Select>
            <Option value="QuanTri">Quản Trị viên</Option>
            <Option value="KhachHang">Khách Hàng</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="matKhau"
          rules={[...rules.required, ...rules.password]}
          label={<Translation>{(t) => <>{t("Password")}</>}</Translation>}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          name="xacNhanLaiMatKhau"
          rules={[
            ...rules.required,
            ...rules.password,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Khác với mật khẩu đã nhập"));
              },
            }),
          ]}
          label={
            <Translation>{(t) => <>{t("Password Confirm")}</>}</Translation>
          }
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginLeft: "8px",
          }}
        >
          <Input type="password" />
        </Form.Item>
      </>
    );
  }
}

export default function FormConfig(props) {
    return (
      <Suspense fallback="loading">
        <MyComponent {...props} />
      </Suspense>
    );
}