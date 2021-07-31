import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import rules from "../../../utils/rules/rules";

export default class DangKy extends Component {
  render() {
    return (
      <div className="p-4">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          size="large"
        >
          <Form.Item name="hoTen" rules={[...rules.ten, rules.required]}>
            <Input placeholder="Họ và tên" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[...rules.required, ...rules.email]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input type="email" placeholder="email" />
          </Form.Item>

          <Form.Item
            name="soDt"
            rules={[...rules.required, ...rules.soDienThoai]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              marginLeft: "8px",
            }}
          >
            <Input type="string" placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="taiKhoan"
            rules={[...rules.required, ...rules.username]}
          >
            <Input type="string" placeholder="Tên tài khoản" />
          </Form.Item>

          <Form.Item
            name="matKhau"
            rules={[...rules.required, ...rules.password]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input type="password" placeholder="Mật khẩu" />
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
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              marginLeft: "8px",
            }}
          >
            <Input type="password" placeholder="Xác nhận lại mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{ width: "100%" }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
