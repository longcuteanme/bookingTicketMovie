import { CHANGE_INDEX, LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG } from "../constants/totalConstants"

const initialState={
    listDanhSachLichChieuTheoHeThong:[],
    pickedIndex:0,
}

export default (state=initialState,action)=>{
    switch(action.type){

        case LAY_DANH_SACH_LICH_CHIEU_THEO_HE_THONG:{
            let newState=state
            newState.listDanhSachLichChieuTheoHeThong=action.payload.listDanhSachLichChieuTheoHeThong
            newState.pickedIndex=0;
            return {...newState}
        }

        case CHANGE_INDEX:{
            let newState=state
            newState.pickedIndex=action.payload.pickedIndex
            return {...newState}
        }

        default:{
            return state
        }
    }
}