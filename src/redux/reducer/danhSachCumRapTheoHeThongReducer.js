import { LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG} from "../constants/totalConstants"

const initialState={
    listDanhSachCumRapTheoHeThong:[],
}


const danhSachCumRapTheoHeThongReducer = (state=initialState,action)=>{
    switch(action.type){
        case LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG:{
            let newState=state;
            newState.listDanhSachCumRapTheoHeThong=action.payload.listDanhSachCumRapTheoHeThong;
            newState.pickedID=action.payload.listDanhSachCumRapTheoHeThong[0].maCumRap;
            return {...newState};
        }
        default:{
            return state
        }
    }
}

export default danhSachCumRapTheoHeThongReducer