import { LAY_DANH_SACH_PHONG_VE } from "../constants/totalConstants"

const initialState={
    thongTinPhim:{},
    danhSachGhe:[],
}

const danhSachPhongVeReducer = (state=initialState,action)=>{
    switch(action.type){
        case LAY_DANH_SACH_PHONG_VE:{
            let newState=state
            newState.thongTinPhim=action.payload.thongTinPhim
            newState.danhSachGhe=action.payload.danhSachGhe
            return {...newState}
        }

        default:{
            return state
        }
    }
}
export default danhSachPhongVeReducer