import { DISPLAY_QUAN_TRI_LOADING, HIDE_QUAN_TRI_LOADING } from "../constants/totalConstants"

const initialState={
    loading:false
}

export default (state=initialState,action)=>{
    switch(action.type){
        case DISPLAY_QUAN_TRI_LOADING:{
            let newState=state
            newState.loading=true
            return {...newState}
        }
        case HIDE_QUAN_TRI_LOADING:{
            let newState=state
            newState.loading=false
            return {...newState}
        }
        default:{
            return state
        }
    }
}