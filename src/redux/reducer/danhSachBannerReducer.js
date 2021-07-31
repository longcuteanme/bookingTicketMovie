import {LAY_DANH_SACH_BANNER} from '../constants/totalConstants'

const initialState={
    listBanner:[],
    chosenBannerVideo:'',
}

export default (state=initialState,action)=>{
    switch(action.type){
        
        case LAY_DANH_SACH_BANNER:{
            const newState=state
            newState.listBanner=action.payload
            return {...newState}
        }

        default:{
            return state
        }
    }
}