import React, { Component,Suspense } from "react";
import ConfigTable from "../../../components/table/ConfigTable";
import { connect } from "react-redux";
import {
  CAP_NHAT_THONG_TIN_NGUOI_DUNG_SAGA,
  LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG_SAGA,
  THEM_NGUOI_DUNG_SAGA,
  XOA_NGUOI_DUNG_SAGA,
} from "../../../redux/constants/totalConstants";
import { Tag, Form, Input, Select } from "antd";
import rules from "../../../utils/rules/rules";
import { Translation } from "react-i18next";

const { Option } = Select;
const editMessage = [<Translation>{(t) => <>{t("Add User")}</>}</Translation>, <Translation>{(t) => <>{t("Edit User")}</>}</Translation>];

class MyComponent extends Component {
  state={
    pagination:{
      total:1,
      range:10,
    },
    key:'',
  }
  changePagination=(pagination)=>{
    this.setState({
      pagination:pagination
    })
  }
  onSearch=async(key)=>{
    await this.setState({
      key:key
    })
    await this.layDuLieu()
  }
  layDuLieu = () => {
    const pagination=this.state.pagination
    this.props.dispatch({
      type: LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG_SAGA,
      payload: {
        model: {
          tuKhoa: this.state.key,
          soTrang: pagination.total,
          soPhanTuTrenTrang: pagination.range,
        },
      },
    });
  };
  xoaNguoiDung = (taiKhoan) => {
    this.props.dispatch({
      type: XOA_NGUOI_DUNG_SAGA,
      payload: {
        model: {
          taiKhoan: taiKhoan,
        },
        layDuLieu: () => {
          this.layDuLieu();
        },
      },
    });
  };
  themThongTin = (values) => {
    this.changePagination({total:1,range:10})
    this.props.dispatch({
      type: THEM_NGUOI_DUNG_SAGA,
      payload: {
        model: {
          taiKhoan: values?.taiKhoan,
          matKhau: values?.matKhau,
          email: values?.email,
          soDt: values?.soDt,
          maNhom: "GP01",
          maLoaiNguoiDung: values?.maLoaiNguoiDung,
          hoTen: values?.hoTen,
        },
        layDuLieu: this.layDuLieu(),
      },
    });
  };
  suaThongTin = (values) => {
    this.props.dispatch({
      type: CAP_NHAT_THONG_TIN_NGUOI_DUNG_SAGA,
      payload: {
        model: {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau,
          email: values.email,
          soDt: values.soDT,
          maNhom: "gp01",
          maLoaiNguoiDung:
            values.loaiNguoiDung === "QuanTri" ? "QuanTri" : "KhachHang",
          hoTen: values.hoTen,
        },
        layDuLieu: () => {
          this.layDuLieu();
        },
      },
    });
  };
  componentDidMount = () => {
    this.layDuLieu();
  };
  render() {
    const data = this.props.danhSachNguoiDungQuanTri;
    const paginationProps = {
      total: data?.totalCount,
    };
    const columns = [
      {
        title: <Translation>{(t) => <>{t("Account")}</>}</Translation>,
        dataIndex: "taiKhoan",
        width: "20%",
        align: "center",
        fixed: "left",
      },
      {
        title: <Translation>{(t) => <>{t("Password")}</>}</Translation>,
        dataIndex: "matKhau",
        width: "20%",
        align: "center",
      },
      {
        title: <Translation>{(t) => <>{t("Full Name")}</>}</Translation>,
        dataIndex: "hoTen",
        width: "20%",
        align: "center",
      },
      {
        title: <Translation>{(t) => <>{t("Email")}</>}</Translation>,
        dataIndex: "email",
        width: "25%",
        align: "center",
      },
      {
        title: <Translation>{(t) => <>{t("Phone Number")}</>}</Translation>,
        dataIndex: "soDt",
        width: "25%",
        align: "center",
      },
      {
        title: <Translation>{(t) => <>{t("User type")}</>}</Translation>,
        dataIndex: "maLoaiNguoiDung",
        render: (item) => {
          return item === "QuanTri" ? (
            <Tag color="#f50"><Translation>{(t) => <>{t("ADMINISTRATOR")}</>}</Translation></Tag>
          ) : (
            <Tag color="#87d068"><Translation>{(t) => <>{t("CUSTOMER")}</>}</Translation></Tag>
          );
        },
        width: "20%",
        align: "center",
      },
    ];
    const formAdd = (
      <>
        <Form.Item
          name="hoTen"
          rules={[...rules.ten, ...rules.required]}
          initialValue=""
          label={<Translation>{(t) => <>{t("Full Name")}</>}</Translation>}
          style={{
            display:'inline-block',
            width: 'calc(100% - 8px)',
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[...rules.required, ...rules.email]}
          label={<Translation>{(t) => <>{t("Email")}</>}</Translation>}
          style={{
            display:'inline-block',
            width: 'calc(50% - 8px)',
          }}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          name="soDt"
          rules={[...rules.required, ...rules.soDienThoai]}
          label={<Translation>{(t) => <>{t("Phone Number")}</>}</Translation>}
          style={{
            display:'inline-block',
            width: 'calc(50% - 8px)',
            marginLeft:'8px'
          }}
        >
          <Input type="string" />
        </Form.Item>

        <Form.Item
          name="taiKhoan"
          rules={[...rules.required, ...rules.username]}
          label={<Translation>{(t) => <>{t("Account")}</>}</Translation>}
          style={{
            display:'inline-block',
            width: 'calc(70% - 8px)',
          }}
        >
          <Input type="string" />
        </Form.Item>

        <Form.Item
          name="maLoaiNguoiDung"
          rules={[...rules.required]}
          label={<Translation>{(t) => <>{t("User type")}</>}</Translation>}
          style={{
            display:'inline-block',
            width: 'calc(30% - 8px)',
            marginLeft:'8px'
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
            display:'inline-block',
            width: 'calc(50% - 8px)',
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
          label={<Translation>{(t) => <>{t("Password Confirm")}</>}</Translation>}
          style={{
            display:'inline-block',
            width: 'calc(50% - 8px)',
            marginLeft:'8px'
          }}
        >
          <Input type="password" />
        </Form.Item>
      </>
    );
    return (
      <>
        <ConfigTable
          title={<Translation>{(t) => <>{t("LIST USERS")}</>}</Translation>}
          columns={columns}
          dataSource={data?.items}
          paginationProps={paginationProps}
          pagination={this.state.pagination}
          layDuLieu={this.layDuLieu}
          formAdd={formAdd}
          xoaNguoiDung={this.xoaNguoiDung}
          truongXoa="taiKhoan"
          suaThongTin={this.suaThongTin}
          themThongTin={this.themThongTin}
          editMessage={editMessage}
          changePagination={this.changePagination}
          onSearch={this.onSearch}
        />
      </>
    );
  }
}

function DanhSachNguoiDung(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    danhSachNguoiDungQuanTri:
      state.quanTriNguoiDungReducer.danhSachNguoiDungQuanTri,
  };
})(DanhSachNguoiDung);
