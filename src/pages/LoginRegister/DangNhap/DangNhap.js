import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import rules from '../../../utils/rules/rules'
import { DANG_NHAP_SAGA } from "../../../redux/constants/totalConstants";
import {connect} from 'react-redux'

class DangNhap extends Component {
  onFinish = async(values) => {
    await this.props.dispatch({
      type:DANG_NHAP_SAGA,
      payload:{
        dangNhap:{
          taiKhoan:values.username,
          matKhau:values.password
        },
        history:this.props.history
      }
    })
  };
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
          <Form.Item
            name="username"
            rules={[...rules.required,...rules.username]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[...rules.password,...rules.required]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{width:'100%'}}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default connect((state)=>{
  return{

  }
})(DangNhap)