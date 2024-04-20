import {TEST_INPUT} from './typeinputs'

const initialState = {
    numOfinput:0
}

const inputReducer = (state = initialState,action)=>{
    switch(action.type){
        case TEST_INPUT: return{
            ...state,
            numOfinput:state.numOfinput+1
        }
        default:return state

    }
}

export default inputReducer