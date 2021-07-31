import { LAY_DANH_SACH_PHIM_QUAN_TRI } from "../constants/totalConstants"

const initialState={
    danhSachPhimQuanTri:{}
}

export default (state=initialState,action)=>{
    switch(action.type){
        case LAY_DANH_SACH_PHIM_QUAN_TRI:{
            let newState=state
            newState.danhSachPhimQuanTri=action.payload.danhSachPhimQuanTri
            return {...newState}
        }
        default:{
            return state
        }
    }
}