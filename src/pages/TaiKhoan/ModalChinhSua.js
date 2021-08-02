import React, { Component } from "react";
import { Modal, Form, Button, Input } from "antd";
import rules from "../../utils/rules/rules";
import { CAP_NHAT_THONG_TIN_NGUOI_DUNG_SAGA } from "../../redux/constants/totalConstants";
import {connect} from 'react-redux'

class ModalChinhSua extends Component {
  state = {
    xacNhanMatKhau: true,
  };
  xacNhanLaiMatKhau = (boolean) => {
    this.setState({
      xacNhanMatKhau: boolean,
    });
  };
  onFinish = (values) => {
    this.props.changeModal(false)
    this.props.dispatch({
      type: CAP_NHAT_THONG_TIN_NGUOI_DUNG_SAGA,
      payload: {
        model: {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau,
          email: values.email,
          soDt: values.soDT,
          maNhom: "gp01",
          maLoaiNguoiDung: this.props.info.loaiNguoiDung==="QuanTri"?"QuanTri":"KhachHang",
          hoTen: values.hoTen,
        },
        history:()=>{this.props.history.go(0)},
      },
    });
  };
  render() {
    const info = this.props.info;
    return (
      <Modal
        title="Cập nhật thông tin"
        visible={this.props.display}
        onCancel={() => {
          this.props.changeModal(false);
        }}
        footer={null}
      >
        <Form
          name="normal_update"
          className="update-form"
          initialValues={{
            hoTen: info?.hoTen,
            email: info?.email,
            soDT: info?.soDT,
            taiKhoan: info?.taiKhoan,
            matKhau: info?.matKhau,
            xacNhanLaiMatKhau: info?.matKhau,
          }}
          onFinish={this.onFinish}
          size="large"
        >
          <Form.Item name="hoTen" rules={[...rules.ten, ...rules.required]}>
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
            name="soDT"
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
            onChange={() => {
              this.xacNhanLaiMatKhau(false);
            }}
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
            <Input
              type="password"
              placeholder="Xác nhận lại mật khẩu"
              disabled={this.state.xacNhanMatKhau}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{ width: "100%" }}
            >
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default connect()(ModalChinhSua)