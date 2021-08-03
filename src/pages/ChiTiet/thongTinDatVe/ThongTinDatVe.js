import React, { Component, Suspense } from "react";
import moment from "moment";
import TableDatVe from "./TableDatVe/TableDatVe";
import { Translation } from "react-i18next";

class MyComponent extends Component {
  state = {
    hienPhanLichChieu: false,
  };
  changeDisplay = (boolean) => {
    this.setState({
      hienPhanLichChieu: boolean,
    });
  };
  renderLichChieu = (data) => {
    return (
      <div>
        <TableDatVe data={data?.heThongRapChieu} />
      </div>
    );
  };
  renderThongTin = (data) => {
    return (
      <div className="grid grid-cols-2">
        <div>
          <table className="table-auto text-white text-lg">
            <tbody key="tbody">
              <tr>
                <td className="font-medium p-2">
                  <Translation>{(t) => <>{t("Movie's name")}</>}</Translation>
                </td>
                <td className="font-light p-2">{data?.tenPhim}</td>
              </tr>
              <tr>
                <td className="font-medium p-2">
                  <Translation>{(t) => <>{t("Premiere date")}</>}</Translation>
                </td>
                <td className="font-light p-2">
                  {moment(data?.ngayKhoiChieu).format("DD.MM.YYYY")}
                </td>
              </tr>
              <tr>
                <td className="font-medium p-2">
                  <Translation>{(t) => <>{t("Director")}</>}</Translation>
                </td>
                <td className="font-light p-2"></td>
              </tr>
              <tr>
                <td className="font-medium p-2">
                  <Translation>{(t) => <>{t("Performer")}</>}</Translation>
                </td>
                <td className="font-light p-2"></td>
              </tr>
              <tr>
                <td className="font-medium p-2">
                  <Translation>{(t) => <>{t("Category")}</>}</Translation>
                </td>
                <td className="font-light p-2"></td>
              </tr>
              <tr>
                <td className="font-medium p-2">
                  <Translation>{(t) => <>{t("Format")}</>}</Translation>
                </td>
                <td className="font-light p-2">2D/Digitals</td>
              </tr>
              <tr>
                <td className="font-medium p-2">
                  <Translation>{(t) => <>{t("Nation")}</>}</Translation>
                </td>
                <td className="font-light p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="table-auto text-white text-lg">
            <tbody key="tbody">
              <tr>
                <td className="p-2 font-bold">
                  <Translation>{(t) => <>{t("Content")}</>}</Translation>
                </td>
              </tr>
              <tr>
                <td className="p-2">{data?.moTa}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  componentDidMount = () => {
    this.setState({
      hienPhanLichChieu: this.props.data?.dangChieu,
    });
  };
  render() {
    const data = this.props?.data;
    const styleChosenChoice = {
      color: "red",
      fontSize: "2.25rem",
    };
    return (
      <div>
        <div className="text-center">
          {data?.dangChieu ? (
            <h1
              className="DanhSachPhimChoice text-white"
              onClick={() => {
                this.changeDisplay(true);
              }}
              style={this.state.hienPhanLichChieu ? styleChosenChoice : {}}
            >
              <Translation>{(t) => <>{t("Show time")}</>}</Translation>
            </h1>
          ) : (
            <></>
          )}
          <h1
            className="DanhSachPhimChoice text-white"
            onClick={() => {
              this.changeDisplay(false);
            }}
            style={!this.state.hienPhanLichChieu ? styleChosenChoice : {}}
          >
            <Translation>{(t) => <>{t("Info")}</>}</Translation>
          </h1>
        </div>
        <div className="mt-10">
          {this.state.hienPhanLichChieu
            ? this.renderLichChieu(data)
            : this.renderThongTin(data)}
        </div>
      </div>
    );
  }
}

export default function ThongTinDatVe(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props} />
    </Suspense>
  );
}
