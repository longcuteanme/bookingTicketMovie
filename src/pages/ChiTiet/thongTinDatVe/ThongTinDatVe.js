import React, { Component } from 'react'
import moment from 'moment'
import TableDatVe from './TableDatVe/TableDatVe'

export default class ThongTinDatVe extends Component {
    state={
        hienPhanLichChieu:false
    }
    changeDisplay=(boolean)=>{
        this.setState({
            hienPhanLichChieu:boolean
        })
    }
    renderLichChieu=(data)=>{
        return (
            <div>
                <TableDatVe data={data?.heThongRapChieu}/>
            </div>
        )
    }
    renderThongTin=(data)=>{
        return(
            <div className="grid grid-cols-2">
                <div>
                    <table className="table-auto text-white text-lg">
                        <tr>
                            <td className="font-medium p-2">Tên phim</td>
                            <td className="font-light p-2">{data?.tenPhim}</td>
                        </tr>
                        <tr>
                            <td className="font-medium p-2">Ngày công chiếu</td>
                            <td className="font-light p-2">{moment(data?.ngayKhoiChieu).format('DD.MM.YYYY')}</td>
                        </tr>
                        <tr>
                            <td className="font-medium p-2">Đạo diễn</td>
                            <td className="font-light p-2"></td>
                        </tr>
                        <tr>
                            <td className="font-medium p-2">Diễn viên</td>
                            <td className="font-light p-2"></td>
                        </tr>
                        <tr>
                            <td className="font-medium p-2">Thể loạin</td>
                            <td className="font-light p-2"></td>
                        </tr>
                        <tr>
                            <td className="font-medium p-2">Định dạng</td>
                            <td className="font-light p-2">2D/Digitals</td>
                        </tr>
                        <tr>
                            <td className="font-medium p-2">Quốc Gia SX</td>
                            <td className="font-light p-2"></td>
                        </tr>
                    </table>
                </div>
                <div>
                    <table className="table-auto text-white text-lg">
                        <tr>
                            <td className="p-2 font-bold">Nội dung</td>
                        </tr>
                        <tr>
                            <td className="p-2">{data?.moTa}</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
    componentDidMount=()=>{
        this.setState({
            hienPhanLichChieu:this.props.data?.dangChieu
        })
    }
    render() {
        const data=this.props?.data
        const styleChosenChoice = {
            color: "red",
            fontSize: "2.25rem",
        };
        return (
            <div>
                <div className="text-center">
                    {data?.dangChieu?<h1 className="DanhSachPhimChoice text-white" onClick={()=>{this.changeDisplay(true)}} style={this.state.hienPhanLichChieu ? styleChosenChoice : {}}>Lịch chiếu</h1>:<></>}
                    <h1 className="DanhSachPhimChoice text-white" onClick={()=>{this.changeDisplay(false)}} style={!this.state.hienPhanLichChieu ? styleChosenChoice : {}}>Thông tin</h1>
                </div>
                <div className="mt-10">
                    {
                        this.state.hienPhanLichChieu
                        ? this.renderLichChieu(data)
                        : this.renderThongTin(data)
                    }
                </div>
            </div>
        )
    }
}
