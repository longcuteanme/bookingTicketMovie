import { Spin } from 'antd'
import React, { Component } from 'react'
import CarouselCompo from './carousel/CarouselCompo'
import DanhSachPhim from './danhSachPhim/DanhSachPhim'
import HeThongRapPhim from './heThongRapPhim/HeThongRapPhim'
import {connect} from 'react-redux'

class Home extends Component {
    render() {
        return (
            <div className="w-screen">
                <div className="w-full">
                    <CarouselCompo/>
                </div>
                <div className="h-auto m-32">
                    <div>
                        <DanhSachPhim/>
                    </div>
                    <div className="mt-32">
                        <Spin spinning={this.props.loading}>
                            <HeThongRapPhim/>
                        </Spin> 
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state)=>{
    return{
        loading:state.loadingTablePhimReducer.loading
    }
})(Home)
