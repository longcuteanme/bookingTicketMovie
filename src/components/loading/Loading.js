import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'
import {connect} from 'react-redux';
import './Loading.css';

class Loading extends Component {
    state={
        loading:false
    }
//    componentDidUpdate=()=>{
//        if(this.state.loading!==this.props.loading){
//            this.setState({
//                loading:this.props.loading
//            })
//        }
//    }
    render() {
        const loading=this.props.loading
        return (
            <>
                {loading ?
                    <div className="w-screen h-screen fixed top-0" style={{zIndex:'200'}}>
                        <div className="w-full h-full bg-white flex justify-center items-center">
                            <img src={logo} className="h-1/6" alt="logo"  id="loading"></img>
                        </div>
                    </div> : <></>
                }
            </>
        )
    }
}
export default connect((state) => {
    return{
        loading:state.loadingReducer?.loading
    }
})(Loading);
