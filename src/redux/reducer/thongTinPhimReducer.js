import { LAY_THONG_TIN_LICH_CHIEU_PHIM } from "../constants/totalConstants"

const initialState={
    thongTinChiTietPhim:{},
}

const thongTinPhimReducer = (state=initialState,action)=>{
    switch(action.type){

        case LAY_THONG_TIN_LICH_CHIEU_PHIM:{
            let newState=state
            newState.thongTinChiTietPhim=action.payload.thongTinChiTietPhim
            return {...newState}
        }

        default:{
            return state
        }
    }
}
export default thongTinPhimReducer