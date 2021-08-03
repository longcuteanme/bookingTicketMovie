import { CHANGE_LOCALE } from "../constants/totalConstants"

const initialState={
    value:'en'
}

const localeReducer = (state=initialState,action)=>{
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
export default localeReducer