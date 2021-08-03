import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { LAY_THONG_TIN_TAI_KHOAN_SAGA } from "../../redux/constants/totalConstants";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import ModalChinhSua from "./ModalChinhSua";
import LoadingBackground from "../../assets/images/LoadingBackground.jpg";
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
    displayModal: false,
  };
  changeModal = (boolean) => {
    this.setState({
      displayModal: boolean,
    });
  };
  renderLichSuDatVe = (data) => {
    let newData = [];
    for (let item of data) {
      let index = newData.findIndex((c) => {
        return c.ngayDat === moment(item?.ngayDat).format("DD-MM-YYYY");
      });
      if (index === -1) {
        newData = [
          {
            ngayDat: moment(item?.ngayDat).format("DD-MM-YYYY"),
            danhSachDat: [item],
          },
          ...newData,
        ];
      } else {
        newData[index].danhSachDat = [item, ...newData[index].danhSachDat];
      }
    }
    return newData.map((item, index) => {
      return (
        <div
          className="border-2 border-gray-300 p-3 rounded-lg mt-3"
          key={index}
        >
          <div className=" flex items-start">
            <h1 className="text-white inline-block text-lg bg-yellow-600 py-2 px-3 rounded-md m-0">
              {item.ngayDat}
            </h1>
          </div>
          {item.danhSachDat.map((item2, index2) => {
            return (
              <table className="w-full table-fixed" key={index2}>
                <tbody key="tbody">
                  <tr className="p-3">
                    <th className="w-2/12 p-2">
                      <div
                        className="w-full h-28 bg-white bg-cover bg-center rounded-xs"
                        style={{
                          backgroundImage: `url(${LoadingBackground})`,
                          boxShadow: "0px 0px 3px gray",
                        }}
                      >
                        <div
                          className="h-full w-full bg-cover bg-center rounded-xs shadow-lg"
                          style={{ backgroundImage: `url(${item2?.hinhAnh})` }}
                        ></div>
                      </div>
                    </th>
                    <th className="w-10/12">
                      <h1 className="text-2xl text-left m-0">
                        {item2?.tenPhim}
                      </h1>
                      <h1 className="text-sm text-left m-0 text-green-500 font-light">
                        <Translation>{(t) => <>{t("Length")}</>}</Translation>:{" "}
                        {item2?.thoiLuongPhim}{" "}
                        <Translation>{(t) => <>{t("Minutes")}</>}</Translation>
                      </h1>
                      <table className="w-full h-auto">
                        <tbody key="tbody">
                          <tr>
                            <th className="w-8/12 align-top">
                              <h1 className="text-md text-left m-0">
                                <Translation>
                                  {(t) => <>{t("Cluster of theaters")}</>}
                                </Translation>
                                :{" "}
                                <span className="font-light italic">
                                  {item2?.danhSachGhe[0]?.tenHeThongRap}
                                </span>
                              </h1>
                            </th>
                            <th className="w-4/12 align-top">
                              <h1 className="text-md text-left m-0">
                                <Translation>
                                  {(t) => <>{t("Theater")}</>}
                                </Translation>
                                :{" "}
                                <span className="font-light italic">
                                  {item2?.danhSachGhe[0]?.tenCumRap}
                                </span>
                              </h1>
                            </th>
                          </tr>
                          <tr>
                            <th className="w-8/12 align-top">
                              <h1 className="text-md text-left m-0">
                                <Translation>
                                  {(t) => <>{t("Booked chair")}</>}
                                </Translation>
                                :{" "}
                                {item2?.danhSachGhe.map((item3,index3) => {
                                  return (
                                    <span className="font-light text-yellow-600 inline-block" key={index3}>
                                      {`${
                                        abc[
                                          Math.floor(Number(item3?.tenGhe) / 16)
                                        ]
                                      }${Number(item3?.tenGhe) % 16},`}
                                    </span>
                                  );
                                })}
                              </h1>
                            </th>
                            <th className="w-4/12 align-top">
                              <h1 className="text-md text-left m-0">
                                <Translation>
                                  {(t) => <>{t("Booking time")}</>}
                                </Translation>
                                :{" "}
                                <span className="font-light text-yellow-600">
                                  {moment(item2.ngayDat).format("kk:mm")}
                                </span>
                              </h1>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </th>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      );
    });
  };
  componentDidMount = () => {
    this.props.dispatch({
      type: LAY_THONG_TIN_TAI_KHOAN_SAGA,
    });
  };
  render() {
    const thongTinTaiKhoan = this.props.thongTinTaiKhoan;
    return (
      <div className="h-auto w-screen bg-gray-300 py-10 px-32">
        <ModalChinhSua
          display={this.state.displayModal}
          changeModal={this.changeModal}
          info={{
            taiKhoan: thongTinTaiKhoan?.taiKhoan,
            matKhau: thongTinTaiKhoan?.matKhau,
            hoTen: thongTinTaiKhoan?.hoTen,
            email: thongTinTaiKhoan?.email,
            soDT: thongTinTaiKhoan?.soDT,
            loaiNguoiDung: thongTinTaiKhoan?.loaiNguoiDung,
          }}
          history={this.props.history}
        />
        <table className="table-fixed w-full">
          <tbody key="tbody">
            <tr>
              <th className="w-5/12 align-top p-3 h-auto">
                <div
                  className="bg-white w-full h-auto rounded-lg p-4"
                  style={{ boxShadow: "0px 0px 7px gray" }}
                >
                  <div className="rounded-full border-4 border-gray-500 p-5 w-auto inline-block">
                    <UserOutlined
                      style={{ fontSize: "90px", color: "gray", margin: "0" }}
                    />
                  </div>
                  <h1 className="text-3xl mt-2 mb-0">
                    {thongTinTaiKhoan?.taiKhoan}
                  </h1>
                </div>
                <div
                  className="bg-white w-full h-auto rounded-lg p-3 mt-5"
                  style={{ boxShadow: "0px 0px 7px gray" }}
                >
                  <table className="w-full table-fixed divide-y-2 divide-gray-200">
                    <tbody key="tbody">
                      <tr>
                        <th className="w-1/3 p-4 text-left text-lg">
                          <Translation>
                            {(t) => <>{t("Full name")}</>}
                          </Translation>
                        </th>
                        <th className="w-2/3 p-4 text-right text-lg font-light">
                          {thongTinTaiKhoan?.hoTen}
                        </th>
                      </tr>
                      <tr>
                        <th className="w-1/3 p-4 text-left text-lg">
                          <Translation>{(t) => <>{t("Email")}</>}</Translation>
                        </th>
                        <th className="w-1/3 p-4 text-right text-lg font-light">
                          {thongTinTaiKhoan?.email}
                        </th>
                      </tr>
                      <tr>
                        <th className="w-1/3 p-4 text-left text-lg">
                          <Translation>
                            {(t) => <>{t("Phone Number")}</>}
                          </Translation>
                        </th>
                        <th className="w-2/3 p-4 text-right text-lg font-light">
                          {thongTinTaiKhoan?.soDT}
                        </th>
                      </tr>
                      <tr>
                        <th className="w-1/3 p-4 text-left text-lg">
                          <Translation>{(t) => <>{t("User")}</>}</Translation>
                        </th>
                        <th className="w-2/3 p-4 text-right text-lg font-light">
                          {thongTinTaiKhoan?.loaiNguoiDung === "QuanTri"
                            ? "Quản trị"
                            : "Khách hàng"}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-full bg-blue-500 hover:bg-blue-400 p-2 mt-4 cursor-pointer">
                    <h1
                      className="text-white text-lg m-0"
                      onClick={() => {
                        this.changeModal(true);
                      }}
                    >
                      <Translation>
                        {(t) => <>{t("Update Information")}</>}
                      </Translation>
                    </h1>
                  </div>
                </div>
              </th>
              <th className="w-7/12 align-top p-3 h-auto">
                <div
                  className="bg-white w-full rounded-lg p-3 overflow-auto"
                  style={{ boxShadow: "0px 0px 7px gray", maxHeight: "590px" }}
                >
                  <h1 className="text-2xl">
                    <Translation>
                      {(t) => <>{t("Booking history")}</>}
                    </Translation>
                  </h1>
                  <div>
                    {thongTinTaiKhoan?.thongTinDatVe ? (
                      this.renderLichSuDatVe(thongTinTaiKhoan?.thongTinDatVe)
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function TaiKhoan(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    thongTinTaiKhoan: state.thongTinTaiKhoanReducer.thongTinTaiKhoan,
  };
})(TaiKhoan);
