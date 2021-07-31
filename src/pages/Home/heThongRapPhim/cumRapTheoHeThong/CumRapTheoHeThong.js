import React, { Component } from "react";
import { connect } from "react-redux";
import {CHANGE_INDEX } from "../../../../redux/constants/totalConstants";

class CumRapTheoHeThong extends Component {
  changePicked = (index) => {
    this.props.dispatch({
      type: CHANGE_INDEX,
      payload: {
        pickedIndex: index,
      },
    });
  };
  renderCumRap = (data) => {
    return (
      <div className="grid grid-cols-1">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                this.changePicked(index);
              }}
              className={
                this.props.pickedIndex === index
                  ? "opacity-100 h-auto cursor-pointer hover:opacity-100 p-3 grid grid-cols-5"
                  : "opacity-50 h-auto cursor-pointer hover:opacity-100 p-3  grid grid-cols-5"
              }
            >
              <div className="col-span-1">
                <img className="h-auto w-auto" src={item?.hinhAnh} alt={item?.tenPhim}/>
              </div>
              <div className="col-span-4 ml-2">
                <h1 className="text-left text-lg truncate">
                  {item?.tenCumRap}
                </h1>
                <h3 className="text-left font-light truncate">
                  {item?.diaChi}
                </h3>
              </div>

              {/* <p className="text-red-600 font-light">[Chi Tiết]</p> */}
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return <>{this.renderCumRap(this.props?.listDanhSachLichChieuTheoHeThong)}</>;
  }
}
export default connect((state) => {
  return {
    listDanhSachLichChieuTheoHeThong:state.danhSachLichChieuTheoHeThongReducer.listDanhSachLichChieuTheoHeThong,
    pickedIndex:state.danhSachLichChieuTheoHeThongReducer.pickedIndex
  };
})(CumRapTheoHeThong);
