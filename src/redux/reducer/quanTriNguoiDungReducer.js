import { LAY_DANH_SACH_NGUOI_DUNG_QUAN_TRI } from "../constants/totalConstants"

const initialState={
    danhSachNguoiDungQuanTri:{}
}

const quanTriNguoiDungReducer = (state=initialState,action)=>{
    switch(action.type){
        case LAY_DANH_SACH_NGUOI_DUNG_QUAN_TRI:{
            let newState=state
            newState.danhSachNguoiDungQuanTri=action.payload.danhSachNguoiDungQuanTri
            return {...newState}
        }
        default:{
            return state
        }
    }
}
export default quanTriNguoiDungReducer