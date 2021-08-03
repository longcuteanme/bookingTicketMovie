import React, { Component, Suspense } from "react";
import { LAY_THONG_TIN_HE_THONG_RAP_SAGA } from "../../../../redux/constants/totalConstants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Spin } from "antd";
import { Translation } from "react-i18next";

const timeDefault = "2019-01-01";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

class MyComponent extends Component {
  state = {
    pickedIndex: 0,
    timeSet: timeDefault,
  };
  changePicked = (index) => {
    this.setState({
      pickedIndex: index,
    });
  };
  changeTimeSet = (time) => {
    this.setState({
      timeSet: time,
    });
  };
  renderDanhSachLichChieu = (maHeThongRap) => {
    const data = this.props.data;
    let danhSachLichChieu = [];
    for (let item of data) {
      if (item?.maHeThongRap === maHeThongRap) {
        for (let item2 of item?.cumRapChieu) {
          for (let item3 of item2?.lichChieuPhim) {
            if (
              moment(item3?.ngayChieuGioChieu).format("YYYY-MM-DD") ===
              this.state.timeSet
            ) {
              let index = danhSachLichChieu.findIndex((c) => {
                return c?.maCumRap === item2?.maCumRap;
              });
              if (index === -1) {
                danhSachLichChieu = [
                  ...danhSachLichChieu,
                  {
                    maCumRap: item2?.maCumRap,
                    tenCumRap: item2?.tenCumRap,
                    hinhAnh: item2?.hinhAnh,
                    diaChi: item2?.diaChi,
                    maLichChieu: item3?.maLichChieu,
                    giaVe: item3?.giaVe,
                    thoiLuong: item3?.thoiLuong,
                    ngayGioChieu: [
                      {
                        ngayChieuGioChieu: item3?.ngayChieuGioChieu,
                      },
                    ],
                  },
                ];
              } else {
                danhSachLichChieu[index].ngayGioChieu.push({
                  ngayChieuGioChieu: item3?.ngayChieuGioChieu,
                });
              }
            }
          }
        }
      }
    }
    return danhSachLichChieu.map((item, index) => {
      return (
        <table className="p-3 text-left table-fixed w-full" key={index}>
          <tbody key="tbody">
            <tr>
              <th className="w-2/12 p-3">
                <img
                  className="w-full"
                  src={item?.hinhAnh}
                  alt={item?.tenCumRap}
                />
              </th>
              <th className="w-8/12 p-3">
                <div>
                  <h1 className="text-2xl m-0 font-normal">
                    {item?.tenCumRap}
                  </h1>
                  <h1 className="text-lg m-0 font-light truncate">
                    <Translation>{(t) => <>{t("Address")}</>}</Translation>:{" "}
                    {item?.diaChi}
                  </h1>
                  <p className="text-sm m-0 text-green-500 font-light">
                    <Translation>{(t) => <>{t("Length")}</>}</Translation>:{" "}
                    {item?.thoiLuong}
                  </p>
                  <div className="">
                    {item?.ngayGioChieu.map((item2, index2) => {
                      return (
                        <Link
                          to={`/DatVe/${item?.maLichChieu}`}
                          onClick={() => {
                            scrollToTop();
                          }}
                          key={index2}
                        >
                          <div
                            className="px-3 py-2 border border-solid m-2"
                            style={{ display: "inline-block" }}
                          >
                            {moment(item2?.ngayChieuGioChieu).format("HH:mm")}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </th>
              <th className="w-2/12 p-3">
                <div>
                  <h1 className="text-2xl text-red-600 text-right">
                    {item?.giaVe}đ
                  </h1>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      );
    });
  };
  renderDay = (time) => {
    let firstDay = moment(time);
    let listDay = [];
    for (let i = 0; i < 7; i++) {
      listDay.push(firstDay);
      firstDay = firstDay.clone().add(1, "day");
    }
    return listDay.map((item, index) => {
      return (
        <div
          className="hover:bg-gray-300 p-3 cursor-pointer flex-grow"
          onClick={() => {
            this.changeTimeSet(item.format("YYYY-MM-DD"));
          }}
          key={index}
          style={
            this.state.timeSet === item.format("YYYY-MM-DD")
              ? { backgroundColor: "gray" }
              : {}
          }
        >
          <h1 className="text-xl m-0">
            <Translation>{(t) => <>{t(item.format("dddd"))}</>}</Translation>
          </h1>
          <p className="text-lg m-0 font-light">{item.format("DD-MM")}</p>
        </div>
      );
    });
  };
  componentDidMount = () => {
    this.props.dispatch({
      type: LAY_THONG_TIN_HE_THONG_RAP_SAGA,
    });
  };
  render() {
    const data = this.props.listHeThongRap;
    return (
      <Spin spinning={this.props.loading}>
        <table className="table-fixed w-full bg-white border-collapse border border-gray-800">
          <tbody key="tbody">
            <tr>
              <th className="w-1/12 border-collapse border border-gray-300 align-top">
                <div className="grid grid-cols-1">
                  {data.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          this.changePicked(index);
                        }}
                        className={
                          this.state.pickedIndex === index
                            ? "opacity-100 h-auto flex justify-center items-center cursor-pointer hover:opacity-100"
                            : "opacity-50 h-auto flex justify-center items-center cursor-pointer hover:opacity-100"
                        }
                      >
                        <img
                          className="w-2/3 my-5"
                          src={item.logo}
                          alt={item.biDanh}
                        />
                      </div>
                    );
                  })}
                </div>
              </th>
              <th className="w-11/12 border-collapse border border-gray-300 align-top">
                <div className="flex justify-around border-b-2">
                  {this.renderDay(timeDefault)}
                </div>
                <div className="">
                  {this.renderDanhSachLichChieu(
                    data[this.state.pickedIndex]?.maHeThongRap
                  )}
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </Spin>
    );
  }
}

function TableDatVe(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    listHeThongRap: state.thongTinHeThongRapReducer.listHeThongRap,
    loading: state.loadingTablePhimReducer.loading,
  };
})(TableDatVe);
