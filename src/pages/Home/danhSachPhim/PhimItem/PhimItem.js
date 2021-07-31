import React, { Component } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import {
  OPEN_MODAL,
} from "../../../../redux/constants/totalConstants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBackground from '../../../../assets/images/LoadingBackground.jpg'

const scrollToTop = () => {
  window.scrollTo(0, 0)
}

class PhimItem extends Component {
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
  renderPhim = (item2) => {
    return (
      <div
        className="w-full h-auto bg-white relative"
        onMouseEnter={() => {
          this.changePhanDatVe(true);
        }}
        onMouseLeave={() => {
          this.changePhanDatVe(false);
        }}
      >
        {/* {this.state.hienPhanDatve ? ( */}
        <div
          className="absolute top-0 left-0 h-auto w-full z-90"
          hidden={!this.state.hienPhanDatve}
        >
          <div className="h-80 rounded-md bg-gradient-to-t from-black to-transparent bg-opacity-70 flex justify-center items-center">
            <PlayCircleOutlined
              className="DanhSachPhimPlayIcon"
              style={{ color: "white" }}
              onClick={() => {
                this.openModal(item2?.trailer);
              }}
            />
          </div>
          <div className="h-20 py-4">
            <Link 
              onClick={scrollToTop}
              to={{
                pathname: `/ChiTiet/${item2?.maPhim}`,
              }}
            >
                {item2?.dangChieu
                ? <div className="h-full w-full bg-red-600 hover:bg-red-500 flex items-center justify-center cursor-pointer transition-colors duration-500 rounded-md">
                    <p className="m-0 text-center text-white text-xl align-center">MUA VÉ</p>
                  </div>
                : <div className="h-full w-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center cursor-pointer transition-colors duration-500 rounded-md">
                    <p className="m-0 text-center text-white text-xl align-center">XEM CHI TIẾT</p>
                  </div>
                }
            </Link>
          </div>
        </div>
        {/* ) : (
          <></>
        )} */}
        <div>
          <div
            className="h-80 bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(${LoadingBackground})`, boxShadow:'0px 0px 7px gray'}}
          >
            <div className="h-full w-full bg-cover bg-center rounded-md shadow-lg"
            style={{ backgroundImage: `url(${item2?.hinhAnh})` }}>
            </div>
          </div>
          <div className="h-20 p-2">
            <h1 className="text-lg font-medium text-black truncate">
              {item2?.tenPhim}
            </h1>
            <span className="text-sm font-thin text-green-700">
              120 phút - {item2?.danhGia} IMBd
            </span>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return <>{this.renderPhim(this.props.item)}</>;
  }
}

export default connect()(PhimItem);
