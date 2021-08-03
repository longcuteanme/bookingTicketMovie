import { LAY_THONG_TIN_TAI_KHOAN } from "../constants/totalConstants"

const initialState={
    thongTinTaiKhoan:{}
}

const thongTinTaiKhoanReducer = (state=initialState,action)=>{
    switch(action.type){

        case LAY_THONG_TIN_TAI_KHOAN:{
            let newState=state
            newState.thongTinTaiKhoan=action.thongTinTaiKhoan
            return {...newState}
        }

        default:{
            return state
        }
    }
}
export default thongTinTaiKhoanReducer