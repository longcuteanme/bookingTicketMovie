import React, { Component } from "react";
import {connect} from 'react-redux'
import { LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG_SAGA, LAY_THONG_TIN_HE_THONG_RAP_SAGA } from "../../../../redux/constants/totalConstants";

class HeThongRap extends Component {
  state = {
    pickedIndex: 0,
  };
  changePicked = async (index,maHeThongRap) => {
    await this.props.dispatch({
      type: LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG_SAGA,
      payload:{
        maHeThongRap:maHeThongRap,
      }
    })
    this.setState({
      pickedIndex: index,
    });
  };
  componentDidMount=()=>{
    this.props.dispatch({
      type:LAY_THONG_TIN_HE_THONG_RAP_SAGA,
      chucNang:'layThongTinLichChieuPhim'
    })
  }
  renderHeThongRap = (data) => {
    return (
      <div className="grid grid-cols-1">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                this.changePicked(index,item?.maHeThongRap);
              }}
              className={
                this.state.pickedIndex === index
                  ? "opacity-100 h-auto flex justify-center items-center cursor-pointer hover:opacity-100"
                  : "opacity-50 h-auto flex justify-center items-center cursor-pointer hover:opacity-100"
              }
            >
              <img className="w-2/3 my-5" src={item.logo} alt={item.biDanh} />
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return <>{this.renderHeThongRap(this.props.listHeThongRap)}</>;
  }
}
export default connect((state) => {
  return {
    listHeThongRap: state.thongTinHeThongRapReducer.listHeThongRap,
  };
})(HeThongRap);
