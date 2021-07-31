import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/totalConstants";

const initialState={
    loading: false
}

export default (state=initialState,action)=>{
    switch(action.type){
        case DISPLAY_LOADING:{
            const newState=state;
            newState.loading=true;
            return {...newState};
        }

        case HIDE_LOADING:{
            const newState=state;
            newState.loading=false;
            return {...newState};
        }

        default:{
            return state
        }
    }
}