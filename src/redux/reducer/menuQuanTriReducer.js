import { SET_OPEN_KEYS } from "../constants/totalConstants"

const intialState={
    openKeys:[],
}

export default (state=intialState,action)=>{
    switch(action.type){
        case SET_OPEN_KEYS:{
            let newState=state
            newState.openKeys=action.payload.openKeys
            return {...newState}
        }
        default:{
            return state
        }
    }
}