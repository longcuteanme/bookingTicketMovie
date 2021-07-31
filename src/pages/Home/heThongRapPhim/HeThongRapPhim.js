import React, { Component } from "react";
import HeThongRap from "./heThongRap/HeThongRap";
import CumRapTheoHeThong from './cumRapTheoHeThong/CumRapTheoHeThong'
import PhimTheoCumRap from './phimTheoCumRap/PhimTheoCumRap'

export default class HeThongRapPhim extends Component {
    
  render() {
    return (
      <div className="w-5/6 mx-auto shadow-xl">
        <table className="table-fixed w-full border-collapse border border-gray-300 ">
          <thead>
            <tr>
              <th className="w-1/12 border-collapse border border-gray-300 align-top">
                <HeThongRap/>
              </th>
              <th className="w-1/3 border-collapse border border-gray-300 align-top">
                <CumRapTheoHeThong/>
              </th>
              <th className="w-7/12 border-collapse border border-gray-300 align-top">
                <PhimTheoCumRap/>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

