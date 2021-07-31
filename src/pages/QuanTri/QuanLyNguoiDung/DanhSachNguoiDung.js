import React, { Component } from "react";
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

const { Option } = Select;
const editMessage = ["Thêm người dùng", "Chỉnh sửa thông tin"];

class DanhSachNguoiDung extends Component {
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
        title: "Tài khoản",
        dataIndex: "taiKhoan",
        width: "20%",
        align: "center",
        fixed: "left",
      },
      {
        title: "Mật khẩu",
        dataIndex: "matKhau",
        width: "20%",
        align: "center",
      },
      {
        title: "Họ tên",
        dataIndex: "hoTen",
        width: "20%",
        align: "center",
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "25%",
        align: "center",
      },
      {
        title: "Số điện thoại",
        dataIndex: "soDt",
        width: "25%",
        align: "center",
      },
      {
        title: "Loại Người Dùng",
        dataIndex: "maLoaiNguoiDung",
        render: (item) => {
          return item === "QuanTri" ? (
            <Tag color="#f50">QUẢN TRỊ</Tag>
          ) : (
            <Tag color="#87d068">KHÁCH HÀNG</Tag>
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
          label="Họ và tên"
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
          label="Email"
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
          label="Số điện thoại"
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
          label="Tài khoản"
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
          label="Loại người dùng"
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
          label="Mật khẩu"
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
          label="Xác nhận mật khẩu"
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
          title="DANH SÁCH NGƯỜI DÙNG"
          columns={columns}
          dataSource={data?.items}
          paginationProps={paginationProps}
          pagination={this.state.pagination}
          layDuLieu={this.layDuLieu}
          formAdd={formAdd}
          drawerTitle="Thêm người dùng"
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
export default connect((state) => {
  return {
    danhSachNguoiDungQuanTri:
      state.quanTriNguoiDungReducer.danhSachNguoiDungQuanTri,
  };
})(DanhSachNguoiDung);
