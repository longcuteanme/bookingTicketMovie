import {LAY_THONG_TIN_HE_THONG_RAP} from '../constants/totalConstants'

const initialState={
    listHeThongRap:[],
}

const thongTinHeThongRapReducer = (state=initialState,action)=>{
    switch(action.type){
        case LAY_THONG_TIN_HE_THONG_RAP:{
            let newState=state;
            newState.listHeThongRap=action.payload.listHeThongRap;
            return {...newState};
        }

        default:{
            return state
        }
    }
}
export default thongTinHeThongRapReducer