import React, { Component,Suspense } from "react";
import ThongTinDatVe from "./thongTinDatVe/ThongTinDatVe";
import {
  LAY_THONG_TIN_LICH_CHIEU_PHIM_SAGA,
  OPEN_MODAL,
} from "../../redux/constants/totalConstants";
import { connect } from "react-redux";
import { Tag, Rate, Button } from "antd";
import moment from "moment";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Translation } from "react-i18next";


class MyComponent extends Component {
  state = {
    hienPhanDatve: false,
  };
  changePhanDatVe = (boolean) => {
    setTimeout(500);
    this.setState({
      hienPhanDatve: boolean,
    });
  };
  openModal = (src) => {
    this.props.dispatch({
      type: OPEN_MODAL,
      payload: {
        src: src,
      },
    });
  };
  renderInfo = (data) => {
    return (
      <table className="table-fixed h-auto w-full">
        <tr>
          <td className="w-3/12 p-2">
            <div
              className="h-80 w-full bg-white bg-cover bg-center"
              style={{ backgroundImage: `url(${data?.hinhAnh})`,boxShadow:'0px 0px 15px black' }}
              alt={data?.tenPhim}
              onMouseEnter={() => {
                this.changePhanDatVe(true);
              }}
              onMouseLeave={() => {
                this.changePhanDatVe(false);
              }}
            >
              <div
                className="h-80 w-full bg-gradient-to-t from-black to-transparent bg-opacity-70 flex justify-center items-center"
                hidden={!this.state.hienPhanDatve}
              >
                <PlayCircleOutlined
                  className="DanhSachPhimPlayIcon"
                  style={{ color: "white" }}
                  onClick={() => {
                    this.openModal(data?.trailer);
                  }}
                />
              </div>
            </div>
          </td>
          <td className="w-6/12 p-2">
            <p className="text-white font-normal m-0 text-lg">
              {moment(data?.ngayKhoiChieu).format("DD.MM.YYYY")}
            </p>
            <h1 className="text-3xl my-1 text-white">
              {data.hot ? <Tag color="#cd201f">HOT</Tag> : <></>}
              {data?.tenPhim ? data?.tenPhim : "Tên phim (do dữ liệu bị hỏng)"}
            </h1>
            <p className="text-white font-normal m-0 text-lg text-green-500">
              120 <Translation>{(t) => <>{t("Minutes")}</>}</Translation> - {data?.danhGia} IMDb - 2D/Digital
            </p>
            <div className="m-2">
              {data?.dangChieu ? (
                <Button type="primary" danger size="large">
                  <span className="font-bold"><Translation>{(t) => <>{t("Buy Ticket")}</>}</Translation></span>
                </Button>
              ) : (
                <Button type="primary" size="large">
                  <span className="font-bold"><Translation>{(t) => <>{t("Coming soon")}</>}</Translation></span>
                </Button>
              )}
            </div>
          </td>
          <td className="w-3/12 ">
            <h1 className="text-8xl my-1 text-white text-center">
              {data?.danhGia}
            </h1>
            <h3 className="text-white font-normal text-xl text-center">IMDb</h3>
            <div className=" w-full flex justify-center">
              <Rate
                disabled
                allowHalf
                defaultValue={(data?.danhGia / 10) * 5}
              />
            </div>
          </td>
        </tr>
      </table>
    );
  };
  componentDidMount = () => {
    const { id } = this.props?.match?.params;
    this.props.dispatch({
      type: LAY_THONG_TIN_LICH_CHIEU_PHIM_SAGA,
      payload: {
        maPhim: id,
      },
    });
  };
  render() {
    const data = this.props?.thongTinChiTietPhim;
    return (
      <div className="h-auto min-h-screen w-screen bg-top bg-contain" style={{ backgroundImage: `url(${data?.hinhAnh})`}}>
      <div className="h-auto bg-gray-900 py-28 bg-opacity-95">
        <div className="mx-56">
          <div>{this.renderInfo(data)}</div>
          <div className="mt-20">
            <ThongTinDatVe data={data} />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

function ChiTiet(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props}/>
    </Suspense>
  );
}

export default connect((state) => {
  return {
    thongTinChiTietPhim: state.thongTinPhimReducer.thongTinChiTietPhim,
  };
})(ChiTiet);
