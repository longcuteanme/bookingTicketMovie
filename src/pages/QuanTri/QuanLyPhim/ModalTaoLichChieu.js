import React, { Component,Suspense } from "react";
import { Modal, Form, Button, DatePicker, Select } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import {
  LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG_SAGA,
  LAY_THONG_TIN_HE_THONG_RAP_SAGA,
  TAO_LICH_CHIEU_SAGA,
} from "../../../redux/constants/totalConstants";
import { Translation } from "react-i18next";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

class MyComponent extends Component {
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
        title={`${data.tenPhim}`}
        width="50vw"
      >
        <Form {...layout} name="modal_tao_lich_chieu" onFinish={this.onFinish}>
          <Form.Item name="ngayChieuGioChieu" label={<Translation>{(t) => <>{t("Show date/Show time")}</>}</Translation>}>
            <DatePicker
              format="DD-MM-YYYY HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item name="heThongRap" label={<Translation>{(t) => <>{t("Theater System")}</>}</Translation>}>
            <Select onChange={(value) => this.layThongTinCumRap(value)}>
              {this.renderHeThongRap(this.props.listHeThongRap)}
            </Select>
          </Form.Item>
          <Form.Item name="cumRap" label={<Translation>{(t) => <>{t("Cluster of theaters")}</>}</Translation>}>
            <Select>
              {this.renderCumRap(this.props.listDanhSachCumRapTheoHeThong)}
            </Select>
          </Form.Item>
          <Form.Item name="giaVe" label={<Translation>{(t) => <>{t("Fare")}</>}</Translation>}>
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
            {<Translation>{(t) => <>{t("Create showtime")}</>}</Translation>}
          </Button>
        </Form>
      </Modal>
    );
  }
}

function ModalTaoLichChieu(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    listHeThongRap: state.thongTinHeThongRapReducer.listHeThongRap,
    listDanhSachCumRapTheoHeThong:
      state.danhSachCumRapTheoHeThongReducer.listDanhSachCumRapTheoHeThong,
  };
})(ModalTaoLichChieu);
