import { OPEN_MODAL,CLOSE_MODAL } from "../constants/totalConstants";

const initialState={
    visible:false,
    src:'',
}

export default (state=initialState,action)=>{
    switch(action.type){

        case OPEN_MODAL:{
            let newState=state;
            newState.src=action.payload.src
            newState.visible=true;
            return {...newState};
        }

        case CLOSE_MODAL:{
            let newState=state;
            newState.src='';
            newState.visible=false;
            return {...newState};
        }

        default:{
            return state;
        }
    }
}