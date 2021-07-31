import { LAY_DANH_SACH_PHIM } from "../constants/totalConstants"

const initialState={
    danhSachPhim:[]
}

export default (state=initialState,action)=>{
    switch(action.type){
        
        case LAY_DANH_SACH_PHIM:{
            const newState=state
            newState.danhSachPhim=action.payload
            return {...newState}
        }

        default:{
            return state
        }
    }
}