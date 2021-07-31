import React, { Component } from "react";
import ConfigTable from "../../../components/table/ConfigTable";
import { connect } from "react-redux";
import {
  CAP_NHAT_PHIM_SAGA,
  LAY_DANH_SACH_PHIM_PHAN_TRANG_SAGA,
  OPEN_MODAL,
  THEM_PHIM_SAGA,
  XOA_PHIM_SAGA,
} from "../../../redux/constants/totalConstants";
import { Tag, Form, Input, Rate, DatePicker, Switch, Upload } from "antd";
import rules from "../../../utils/rules/rules";
import {
  PlayCircleOutlined,
  PlusOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import LoadingBackground from "../../../assets/images/LoadingBackground.jpg";
import ModalTaoLichChieu from "./ModalTaoLichChieu";

const editMessage = ["Thêm phim", "Chỉnh sửa thông tin"];

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class DanhSachPhim extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    pagination: {
      total: 1,
      range: 10,
    },
    key: "",
    maPhim: 0,
    displayModal: false,
    dataModal: {},
  };
  changePagination = (pagination) => {
    this.setState({
      pagination: pagination,
    });
  };
  hideModal = () => {
    this.setState({
      displayModal: false,
    });
  };
  onRow = (values) => {
    this.setState({
      displayModal: true,
      dataModal: values,
    });
  };
  onSearch = async (key) => {
    await this.setState({
      pagination: {
        total: 1,
        range: 10,
      },
      key: key,
    });
    await this.layDuLieu();
  };
  changeMaPhim = (id) => {
    this.setState({
      maPhim: id,
    });
  };
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  handleChange = ({ fileList }) => this.setState({ fileList });
  handleCancel = () => this.setState({ previewVisible: false });
  layDuLieu = () => {
    const pagination = this.state.pagination;
    this.props.dispatch({
      type: LAY_DANH_SACH_PHIM_PHAN_TRANG_SAGA,
      payload: {
        model: {
          tenPhim: this.state.key,
          soTrang: pagination.total,
          soPhanTuTrenTrang: pagination.range,
        },
      },
    });
  };
  xoaNguoiDung = (maPhim) => {
    this.props.dispatch({
      type: XOA_PHIM_SAGA,
      payload: {
        maPhim: maPhim,
        layDuLieu: () => {
          this.layDuLieu();
        },
      },
    });
  };
  themThongTin = (values) => {
    const formData = new FormData();
    for (let key in values) {
      if (key === "ngayKhoiChieu") {
        formData.append(key, moment(values[key]).format("DD/MM/YYYY"));
      } else if (key === "danhGia") {
        formData.append(key, values[key] * 2);
      } else if (key === "hinhAnh") {
        formData.append(
          "File",
          values[key].fileList[0].originFileObj,
          values[key].fileList[0].name
        );
      } else {
        formData.append(key, values[key]);
      }
    }
    formData.append("maNhom", "GP01");
    formData.append("sapChieu", !values.dangChieu);
    this.props.dispatch({
      type: THEM_PHIM_SAGA,
      payload: {
        model: formData,
        layDuLieu: this.layDuLieu(),
      },
    });
  };
  suaThongTin = (values) => {
    const formData = new FormData();
    for (let key in values) {
      if (key === "ngayKhoiChieu") {
        formData.append(key, moment(values[key]).format("DD/MM/YYYY"));
      } else if (key === "danhGia") {
        formData.append(key, values[key] * 2);
      } else if (key === "hinhAnh") {
        if (typeof values[key] === "string") {
          formData.append(key, null);
        } else {
          formData.append(
            "File",
            values[key].fileList[0].originFileObj,
            values[key].fileList[0].name
          );
        }
      } else {
        if (values[key] === null) formData.append(key, false);
        else formData.append(key, values[key]);
      }
    }
    formData.append("maNhom", "GP01");
    formData.append("sapChieu", !values.dangChieu);
    formData.append("maPhim", this.state.maPhim);
    this.props.dispatch({
      type: CAP_NHAT_PHIM_SAGA,
      payload: {
        model: formData,
        layDuLieu: this.layDuLieu(),
      },
    });
  };
  handleTrailer = (src) => {
    this.props.dispatch({
      type: OPEN_MODAL,
      payload: {
        src: src,
      },
    });
  };
  componentDidMount = () => {
    this.layDuLieu();
  };
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const data = this.props.danhSachPhimQuanTri;
    const paginationProps = {
      total: data?.totalCount,
    };
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const columns = [
      {
        title: "Tạo lịch chiếu",
        width: "100px",
        align: "center",
        fixed: "left",
        render: (record) => {
          return (
            <VideoCameraAddOutlined
              className="hover:text-blue-400"
              onClick={() => {
                this.onRow(record);
              }}
              style={{ fontSize: "30px", color: "gray" }}
            />
          );
        },
      },
      {
        title: "Tên phim",
        width: "100px",
        align: "center",
        fixed: "left",
        render: (record) => {
          return (
            <div>
              <p>{record.tenPhim}</p>
              {record?.hot ? <Tag color="#cd201f">HOT</Tag> : <></>}
            </div>
          );
        },
      },
      {
        title: "Hình ảnh",
        dataIndex: "hinhAnh",
        width: "120px",
        align: "center",
        render: (item) => {
          return (
            <div
              className="w-full h-32 bg-cover bg-center"
              style={{
                backgroundImage: `url(${LoadingBackground})`,
                boxShadow: "0px 0px 3px gray",
              }}
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            </div>
          );
        },
      },
      {
        title: "Bí danh",
        dataIndex: "biDanh",
        width: "100px",
        align: "center",
      },
      {
        title: "Trailer",
        dataIndex: "trailer",
        width: "80px",
        align: "center",
        render: (item) => {
          return (
            <PlayCircleOutlined
              style={{ fontSize: "30px", color: "gray" }}
              onClick={() => {
                this.handleTrailer(item);
              }}
            />
          );
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "dangChieu",
        width: "150px",
        align: "center",
        render: (item) => {
          if (item) return <Tag color="#2db7f5">ĐANG CHIẾU</Tag>;
          else return <Tag color="#f50">SẮP CHIẾU</Tag>;
        },
      },
      {
        title: "Ngày khởi chiếu",
        dataIndex: "ngayKhoiChieu",
        width: "150px",
        align: "center",
        render: (item) => {
          return moment(item).format("DD-MM-YYYY");
        },
      },
      {
        title: "Mô tả",
        dataIndex: "moTa",
        width: "500px",
        align: "left",
      },
      {
        title: "Đánh giá",
        dataIndex: "danhGia",
        width: "200px",
        align: "center",
        render: (item) => {
          return <Rate disabled defaultValue={item / 2} />;
        },
      },
    ];
    const formAdd = (
      <>
        <Form.Item
          name="tenPhim"
          rules={[...rules.required, ...rules.text, ...rules.length(50)]}
          initialValue=""
          label="Tên phim"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="trailer"
          rules={[...rules.required, ...rules.text, ...rules.length(300)]}
          label="Trailer"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginLeft: "8px",
          }}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          name="hinhAnh"
          label=" Hình ảnh đại diện"
          style={{
            display: "inline-block",
          }}
        >
          <Upload
            // action="http://movieapi.cyberlearn.vn/api/QuanLyPhim/ThemPhimUploadHinh"
            action={new Promise((resolve) => resolve({}))}
            listType="picture"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            accept=".jpg, .jpeg, .png"
            // beforeUpload={this.beforeUpload}
          >
            {this.state.fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          name="moTa"
          rules={[...rules.required, ...rules.text, ...rules.length(1000)]}
          style={{
            display: "inline-block",
            width: "calc(100% - 8px)",
          }}
          label="Mô tả"
        >
          <TextArea type="text" rows={4} />
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item
            name="ngayKhoiChieu"
            rules={[...rules.required]}
            label="Ngày khởi chiếu"
            style={{
              display: "inline-block",
            }}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="dangChieu"
            label="Đang chiếu"
            valuePropName="checked"
            style={{
              display: "inline-block",
            }}
            initialValue={true}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="hot"
            label="Hot"
            valuePropName="checked"
            style={{
              display: "inline-block",
            }}
            initialValue={true}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="danhGia"
            label="Đánh giá"
            style={{
              display: "inline-block",
              width: "calc(35% - 8px)",
            }}
          >
            <Rate allowHalf defaultValue={2.5} />
          </Form.Item>
        </div>
      </>
    );
    return (
      <>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <ModalTaoLichChieu
          display={this.state.displayModal}
          data={this.state.dataModal}
          hideModal={this.hideModal}
        />
        <ConfigTable
          title="DANH SÁCH PHIM"
          columns={columns}
          dataSource={data?.items}
          paginationProps={paginationProps}
          pagination={this.state.pagination}
          layDuLieu={this.layDuLieu}
          formAdd={formAdd}
          drawerTitle="Thêm Phim"
          xoaNguoiDung={this.xoaNguoiDung}
          truongXoa="maPhim"
          suaThongTin={this.suaThongTin}
          themThongTin={this.themThongTin}
          editMessage={editMessage}
          handleChange={this.handleChange}
          changePagination={this.changePagination}
          changeMaPhim={this.changeMaPhim}
          onSearch={this.onSearch}
        />
      </>
    );
  }
}
export default connect((state) => {
  return {
    danhSachPhimQuanTri: state.quanTriPhimReducer?.danhSachPhimQuanTri,
  };
})(DanhSachPhim);