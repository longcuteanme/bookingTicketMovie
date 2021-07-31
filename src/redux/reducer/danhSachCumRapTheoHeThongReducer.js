import { LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG} from "../constants/totalConstants"

const initialState={
    listDanhSachCumRapTheoHeThong:[],
}

export default (state=initialState,action)=>{
    switch(action.type){
        case LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG:{
            let newState=state;
            newState.listDanhSachCumRapTheoHeThong=action.payload.listDanhSachCumRapTheoHeThong;
            newState.pickedID=action.payload.listDanhSachCumRapTheoHeThong[0].maCumRap;
            return {...newState};
        }

        // case CHANGE_ID:{
        //     let newState=state;
        //     newState.pickedID=action.payload.pickedID
        //     return {...newState}
        // }

        default:{
            return state
        }
    }
}