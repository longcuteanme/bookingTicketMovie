import { DISPLAY_TABLE_LOADING, HIDE_TABLE_LOADING } from "../constants/totalConstants"

const initialState={
    loading:false
}

const loadingTablePhimReducer = (state=initialState,action)=>{
    switch(action.type){
        case DISPLAY_TABLE_LOADING:{
            let newState=state
            newState.loading=true
            return {...newState}
        }
        case HIDE_TABLE_LOADING:{
            let newState=state
            newState.loading=false
            return {...newState}
        }
        default:{
            return state
        }
    }
}
export default loadingTablePhimReducer