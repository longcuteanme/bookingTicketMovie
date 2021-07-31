import React, { Component } from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import {
  LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_SAGA,
  LAY_THONG_TIN_HE_THONG_RAP_SAGA,
  TAO_LICH_CHIEU_SAGA,
} from "../../../redux/constants/totalConstants";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

class ModalTaoLichChieu extends Component {
  state = {
    indexCumRap: -1,
  };
  layThongTinCumRap = (maHeThongRap) => {
    this.props.dispatch({
      type: LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_SAGA,
      payload: {
        maHeThongRap: maHeThongRap,
      },
    });
  };
  layThongTinRap = (indexCumRap) => {
    this.setState({
      indexCumRap: indexCumRap,
    });
  };
  renderHeThongRap = (data) => {
    return data.map((item, index) => {
      return (
        <Option key={index} value={item?.maHeThongRap}>
          <img className="w-5 mr-3 inline-block" src={item?.logo}></img>
          {item?.tenHeThongRap}
        </Option>
      );
    });
  };
  renderCumRap = (data) => {
    return data.map((item, index) => {
      return (
        <Option key={index} value={item?.maCumRap}>
          {item?.tenCumRap}
        </Option>
      );
    });
  };
  onFinish = (values) => {
    this.props.dispatch({
      type: TAO_LICH_CHIEU_SAGA,
      payload: {
        model: {
          maPhim: this.props.data?.maPhim,
          ngayChieuGioChieu: values.ngayChieuGioChieu.format("DD/MM/YYYY HH:mm:ss"),
          maRap: values.cumRap,
          giaVe: values.giaVe,
        },
      },
    });
    this.props.hideModal()
  };
  componentDidMount = () => {
    this.props.dispatch({
      type: LAY_THONG_TIN_HE_THONG_RAP_SAGA,
    });
  };
  render() {
    const data = this.props.data;
    return (
      <Modal
        onCancel={() => {
          this.props.hideModal();
        }}
        visible={this.props.display}
        centered={true}
        footer={null}
        title={`Tạo lịch chiếu phim ${data.tenPhim}`}
        width="30vw"
      >
        <Form {...layout} name="modal_tao_lich_chieu" onFinish={this.onFinish}>
          <Form.Item name="ngayChieuGioChieu" label="Ngày và giờ chiếu">
            <DatePicker
              format="DD-MM-YYYY HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item name="heThongRap" label="Hệ thống rạp">
            <Select onChange={(value) => this.layThongTinCumRap(value)}>
              {this.renderHeThongRap(this.props.listHeThongRap)}
            </Select>
          </Form.Item>
          <Form.Item name="cumRap" label="Cụm rạp">
            <Select>
              {this.renderCumRap(this.props.listDanhSachCumRapTheoHeThong)}
            </Select>
          </Form.Item>
          {/* <Form.Item name="maRap" label="Rạp số">
            <Select>
              {this.renderRap(this.props.listDanhSachCumRapTheoHeThong)}
            </Select>
          </Form.Item> */}
          <Form.Item name="giaVe" label="Giá vé">
            <Select>
              <Option key="1" value={50000}>
                50.000 vnđ
              </Option>
              <Option key="2" value={70000}>
                70.000 vnđ
              </Option>
              <Option key="3" value={90000}>
                90.000 vnđ
              </Option>
              <Option key="4" value={100000}>
                100.000 vnđ
              </Option>
              <Option key="5" value={120000}>
                120.000 vnđ
              </Option>
            </Select>
          </Form.Item>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            Tạo lịch chiếu
          </Button>
        </Form>
      </Modal>
    );
  }
}
export default connect((state) => {
  return {
    listHeThongRap: state.thongTinHeThongRapReducer.listHeThongRap,
    listDanhSachCumRapTheoHeThong:
      state.danhSachCumRapTheoHeThongReducer.listDanhSachCumRapTheoHeThong,
  };
})(ModalTaoLichChieu);
