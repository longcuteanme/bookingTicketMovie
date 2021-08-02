import React, { Component, Suspense } from "react";
import { Redirect } from "react-router-dom";
import { USER_ACCESS_TOKEN } from "../../utils/constants/settingSystem";
import { connect } from "react-redux";
import {
  DAT_VE_SAGA,
  LAY_DANH_SACH_PHONG_VE_SAGA,
} from "../../redux/constants/totalConstants";
import _ from "lodash";
import { Translation } from "react-i18next";

const abc = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
];

class MyComponent extends Component {
  state = {
    gheDaDat: [],
  };
  thayDoiGheDat = (item) => {
    let newGheDaDat = this.state.gheDaDat;
    let index = newGheDaDat.findIndex((c) => {
      return c?.maGhe === item?.maGhe;
    });
    if (index === -1) {
      this.setState({
        gheDaDat: [...newGheDaDat, item],
      });
    } else {
      newGheDaDat.splice(index, 1);
      this.setState({
        gheDaDat: [...newGheDaDat],
      });
    }
  };
  renderDanhSachGhe = (data) => {
    let doDaiGhe = data.length / 10;
    const newData = _.chunk(data, doDaiGhe);
    let chiSoGhe = [];
    for (let i = 0; i < doDaiGhe; i++) {
      chiSoGhe[i] = i + 1;
    }
    return (
      <table className="table-fixed w-full">
        <tr>
          <th className="w-1/12"></th>
          <th className="w-10/12 pb-2">
            <div
              className="w-full"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${doDaiGhe}, minmax(0, 1fr))`,
              }}
            >
              {chiSoGhe.map((item, index) => {
                return (
                  <div className="p-1" key={index}>
                    <div className="w-full h-6 rounded-md m-0 text-white shadow-inner bg-gray-800 bg-opacity-75 font-light">
                      {item}
                    </div>
                  </div>
                );
              })}
            </div>
          </th>
          <th className="w-1/12"></th>
        </tr>
        <tr>
          <th className="w-1/12">
            <table>
              {abc.map((item, index) => {
                if (index < 10) {
                  return (
                    <tr key={index}>
                      <th className="p-1">
                        <div className="w-6 h-6 rounded-md m-0 text-white shadow-inner bg-gray-800 bg-opacity-75 font-light">
                          {item}
                        </div>
                      </th>
                    </tr>
                  );
                }
              })}
            </table>
          </th>
          <th className="w-10/12">
            <table className="w-full">
              {newData.map((item, index) => {
                return (
                  <tr key={index}>
                    {item.map((item2, index2) => {
                      let dacTinh =
                        "from-gray-400 to-gray-200 cursor-pointer hover:opacity-80";
                      if (item2?.loaiGhe === "Vip") {
                        dacTinh =
                          "from-yellow-400 to-yellow-200 cursor-pointer hover:opacity-80";
                      }
                      if (item2?.daDat) {
                        dacTinh = "from-red-600 to-red-400";
                      } else if (item2?.taiKhoanNguoiDat) {
                        dacTinh = "from-blue-600 to-blue-400";
                      } else if (
                        this.state.gheDaDat.findIndex((c) => {
                          return c?.maGhe === item2?.maGhe;
                        }) !== -1
                      ) {
                        dacTinh = "from-green-600 to-green-400 cursor-pointer";
                      }
                      return (
                        <td className="p-1" key={index2}>
                          {!item2?.daDat && !item2?.taiKhoanNguoiDat ? (
                            <div
                              className={`w-full h-6 rounded-md bg-gradient-to-r ${dacTinh}`}
                              onClick={() => {
                                this.thayDoiGheDat(item2);
                              }}
                            ></div>
                          ) : (
                            <div
                              className={`w-full h-6 rounded-md bg-gradient-to-r ${dacTinh}`}
                            ></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </table>
          </th>
          <th className="w-1/12"></th>
        </tr>
      </table>
    );
  };
  datVe = () => {
    const danhSachVe = this.state.gheDaDat.map((item) => {
      return {
        maGhe: item?.maGhe,
        giaVe: item?.giaVe,
      };
    });
    this.props.dispatch({
      type: DAT_VE_SAGA,
      payload: {
        datVe: {
          maLichChieu: this.props.match.params?.id,
          danhSachVe: danhSachVe,
        },
        history: this.props.history,
      },
    });
  };
  componentDidMount = () => {
    this.props.dispatch({
      type: LAY_DANH_SACH_PHONG_VE_SAGA,
      payload: {
        id: this.props.match.params?.id,
      },
    });
  };
  render() {
    if (localStorage.getItem(USER_ACCESS_TOKEN)) {
      const thongTinPhim = this.props.thongTinPhim;
      const danhSachGhe = this.props.danhSachGhe;
      let doDaiGhe = danhSachGhe.length / 10;
      let tongTien = 0;
      for (let i = 0; i < this.state.gheDaDat.length; i++) {
        tongTien = tongTien + this.state.gheDaDat[i]?.giaVe;
      }
      return (
        <div className="h-auto bg-gradient-to-t from-gray-900 to-gray-600 py-28">
          <div className="mx-32">
            <table className="table-fixed w-full">
              <tr>
                <th className="w-7/12 align-top">
                  <div className="bg-yellow-400 h-3 w-full"></div>
                  <div className="w-full h-10 bg-gradient-to-b from-white to-transparent">
                    <h1 className="text-red-700 font-bold text-lg">
                      <Translation>{(t) => <>{t("Screen")}</>}</Translation>
                    </h1>
                  </div>
                  <div className="mt-5">
                    {this.renderDanhSachGhe(danhSachGhe)}
                    <div className="mt-7">
                      <div className="text-white font-light flex justify-around">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-gray-400 to-gray-200 inline-block mr-2"></div>
                          <Translation>
                            {(t) => <>{t("Regular")}</>}
                          </Translation>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-200 inline-block mr-2"></div>
                          <Translation>{(t) => <>{t("Vip")}</>}</Translation>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-green-600 to-green-400 inline-block mr-2"></div>
                          <Translation>
                            {(t) => <>{t("Selected chair")}</>}
                          </Translation>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-red-600 to-red-400 inline-block mr-2"></div>
                          <Translation>{(t) => <>{t("Booked")}</>}</Translation>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 inline-block mr-2"></div>
                          <Translation>
                            {(t) => <>{t("Being selected")}</>}
                          </Translation>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                <th className="w-5/12 px-5 align-top">
                  <div
                    className="w-full h-auto border-2 border-white rounded-md p-4"
                    style={{ boxShadow: "0px 0px 10px white" }}
                  >
                    <div class="divide-y divide-dashed divide-white-500">
                      <div>
                        <h1 className="font-bold text-3xl text-white">
                          {thongTinPhim?.tenPhim}
                        </h1>
                      </div>
                      <div className="grid grid-cols-2 py-3">
                        <h1 className="font-medium text-left text-white text-lg">
                          <Translation>{(t) => <>{t("Show date/Show time")}</>}</Translation>
                        </h1>
                        <h1 className="font-light text-right text-white text-lg">
                          {thongTinPhim?.ngayChieu}-
                          <span className="text-yellow-400">
                            {thongTinPhim?.gioChieu}
                          </span>
                        </h1>
                      </div>
                      <div className="grid grid-cols-2 py-3">
                        <h1 className="font-medium text-left text-white text-lg">
                          <Translation>{(t) => <>{t("Cluster of theaters")}</>}</Translation>
                        </h1>
                        <div>
                          <h1 className="font-light text-right text-white text-lg">
                            {thongTinPhim?.tenCumRap}
                          </h1>
                          <h1 className="font-light text-right text-yellow-400 text-xs">
                            {thongTinPhim?.diaChi}
                          </h1>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 py-3">
                        <h1 className="font-medium text-left text-white text-lg">
                          <Translation>{(t) => <>{t("Theater")}</>}</Translation>
                        </h1>
                        <h1 className="font-light text-right text-white text-lg">
                          {thongTinPhim?.tenRap}
                        </h1>
                      </div>
                      <div className="grid grid-cols-2 py-3 h-auto">
                        <h1 className="font-medium text-left text-white text-lg">
                          <Translation>{(t) => <>{t("Selected chair")}</>}</Translation>
                        </h1>
                        <div className=" text-right">
                          {this.state.gheDaDat.map((item, index) => {
                            return (
                              <p
                                className="font-light text-right text-white text-lg inline-block"
                                key={index}
                              >
                                <span className="text-yellow-400">{` ${
                                  abc[Math.floor(Number(item?.stt) / doDaiGhe)]
                                }${Number(item?.stt) % doDaiGhe}`}</span>
                                -{item?.giaVe.toLocaleString()},
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 py-3">
                        <h1 className="font-medium text-left text-white text-lg">
                          <Translation>{(t) => <>{t("Sale")}</>}</Translation>
                        </h1>
                        <h1 className="font-light text-right text-white text-lg">
                          0%
                        </h1>
                      </div>
                      <div className="grid grid-cols-2 py-3">
                        <h1 className="font-medium text-left text-white text-lg">
                          <Translation>{(t) => <>{t("Total amount")}</>}</Translation>
                        </h1>
                        <h1 className="font-light text-right text-white text-lg">
                          {tongTien.toLocaleString()} vnđ
                        </h1>
                      </div>
                      <div className="py-3">
                        <div
                          className="w-full text-center bg-gradient-to-r from-yellow-600 to-yellow-500 py-3 text-xl text-white cursor-pointer hover:opacity-75"
                          onClick={() => {
                            this.datVe();
                          }}
                        >
                          <Translation>{(t) => <>{t("Book")}</>}</Translation>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            </table>
          </div>
        </div>
      );
    } else {
      alert("Vui lòng đăng nhập để tiến hành đặt vé");
      return <Redirect to="/Login" />;
    }
  }
}

function DatVe(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    thongTinPhim: state.danhSachPhongVeReducer.thongTinPhim,
    danhSachGhe: state.danhSachPhongVeReducer.danhSachGhe,
  };
})(DatVe);
