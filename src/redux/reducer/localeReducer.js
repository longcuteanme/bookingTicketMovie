import { CHANGE_LOCALE } from "../constants/totalConstants"

const initialState={
    value:'en'
}

export default (state=initialState,action)=>{
    switch(action.type){
        case CHANGE_LOCALE :{
            let newState=state
            newState.value=action.payload.value
            return {...newState}
        }
        default:{
            return state
        }
    }
}