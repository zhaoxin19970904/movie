import React, { useState } from 'react'
import { Provider } from 'react-redux';
import { inputt } from './redux';
import store from './redux/inputs/store'
import {connect} from 'react-redux'
function Reduxtut(props) {
   const [n,setN]=useState(0);
  return (
    <Provider store={store}>
    <div>

        <h1>Reduxtut - {props.numOfinput}</h1>
        <button onClick={props.inputt}>input1</button>
        <h1>number:{n}</h1>
        <button onClick={()=>{setN(n+1)}}>input2</button>
    </div>
    </Provider>
  )
}

const mapStateToProps=state=>{
    return{
        numOfinput:state.numOfinput
    }
}

const mapDispath=dispatch=>{
    return{
        inputt:()=>dispatch(inputt())
    }
}

export default connect(mapStateToProps,mapDispath) (Reduxtut)