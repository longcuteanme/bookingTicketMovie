import React, { Component } from "react";
import { connect } from "react-redux";
import { Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import {Button} from 'antd'
import LoadingBackground from '../../../../assets/images/LoadingBackground.jpg'

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

class PhimTheoCumRap extends Component {
  renderLichChieu = (arr) => {
    return arr.map((item, index) => {
      if (
        moment(item?.ngayChieuGioChieu).format("DD/MM/YYYY") === "01/01/2019"
      ) {
        return (
          <Link
            to={`/DatVe/${item?.maLichChieu}`}
            onClick={() => {
              scrollToTop();
            }}
          >
            <div
              className="px-3 py-2 border border-solid m-2"
              style={{ display: "inline-block" }}
              key={index}
            >
              {moment(item?.ngayChieuGioChieu).format("HH:mm")}
            </div>
          </Link>
        );
      }
    });
  };

  renderPhim = (data) => {
    let newData = [];
    for (let item of data) {
      if (item?.dangChieu) newData.push(item);
    }
    return (
      <div className="grid grid-cols-1">
        {newData.map((item, index) => {
          let viTri = item?.lstLichChieuTheoPhim.findIndex((item1) => {
            return (
              moment(item1?.ngayChieuGioChieu).format("DD/MM/YYYY") ===
              "01/01/2019"
            );
          });
          return (
            <Link
              to={`/ChiTiet/${item?.maPhim}`}
              onClick={() => {
                scrollToTop();
              }}
            >
              <div
                key={index}
                className="h-auto cursor-pointer hover:opacity-100 p-3 grid grid-cols-7"
              >
                <div
                  className="w-full h-16 col-span-1 bg-center bg-cover"
                  style={{ backgroundImage: `url(${LoadingBackground})` }}
                >
                  <div
                    className="w-full h-full col-span-1 bg-center bg-cover"
                    style={{ backgroundImage: `url(${item?.hinhAnh})` }}
                  ></div>
                </div>
                <div className="col-span-6 ml-2 text-left">
                  <h1 className=" font-bold text-xl truncate m-0">
                    <Tag color="#cd201f">HOT</Tag>
                    {item?.tenPhim}
                  </h1>
                  {viTri === -1 ? (
                    <Link
                      to={`/ChiTiet/${item?.maPhim}`}
                      onClick={() => {
                        scrollToTop();
                      }}
                    >
                      <Button style={{margin:'5px 0'}}>Xem chi tiết</Button>
                    </Link>
                  ) : (
                    <p className="font-medium text-lg truncate text-green-500 mt-2">
                      {this.renderLichChieu(item?.lstLichChieuTheoPhim)}
                    </p>
                  )}
                </div>

                {/* <p className="text-red-600 font-light">[Chi Tiết]</p> */}
              </div>
            </Link>
          );
        })}
      </div>
    );
  };
  render() {
    return (
      <>
        {this.props?.listDanhSachLichChieuTheoHeThong[this.props?.pickedIndex]
          ?.danhSachPhim ? (
          this.renderPhim(
            this.props?.listDanhSachLichChieuTheoHeThong[
              this.props?.pickedIndex
            ]?.danhSachPhim
          )
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default connect((state) => {
  return {
    listDanhSachLichChieuTheoHeThong:
      state.danhSachLichChieuTheoHeThongReducer
        ?.listDanhSachLichChieuTheoHeThong,
    pickedIndex: state.danhSachLichChieuTheoHeThongReducer?.pickedIndex,
  };
})(PhimTheoCumRap);