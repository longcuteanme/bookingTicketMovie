import React, { Component } from "react";
import ChartNguoiDung from "./ChartNguoiDung";
import ChartPhim from "./ChartPhim";
import ThongKeChart from "./ThongKeChart";

export default class DashBoard extends Component {
  render() {
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white">
            <ChartNguoiDung />
          </div>
          <div className="bg-white">
            <ChartPhim />
          </div>
        </div>
        <div className="bg-white p-4 mt-4">
            <ThongKeChart/>
        </div>
      </>
    );
  }
}
