import React, { Component,Suspense } from "react";
import backgroundLogin from "../../assets/images/backgroundFooter.jpg";
import logo from "../../assets/images/logo.png";
import DangNhap from "./DangNhap/DangNhap";
import DangKy from "./DangKy/DangKy";
import { USER_ACCESS_TOKEN } from "../../utils/constants/settingSystem";
import { Redirect } from "react-router-dom";
import { Translation } from "react-i18next";

class MyComponent extends Component {
  state = {
    dangNhap: true,
  };
  changeDangNhap = (boolean) => {
    this.setState({
      dangNhap: boolean,
    });
  };
  render() {
    if (localStorage.getItem(USER_ACCESS_TOKEN)) {
      if(this.props.history.length<2){
        return <Redirect to="/" />
      }
      else{
        return this.props.history.goBack();
      }
    } else {
      return (
        <div
          className="w-screen h-auto min-h-screen flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundLogin})` }}
        >
          <div className="h-auto w-1/2 bg-white p-5 rounded-xl shadow-2xl">
            <div className="w-full flex items-center justify-center mb-5">
              <img className="inline-block" src={logo} alt="logo m-0" />
              <h1 className="text-5xl m-0 inline-block">{<Translation>{(t) => <>{t("Sign in")}</>}</Translation>}</h1>
            </div>
            <div className="w-full border-2 border-collapse p-3 rounded-xl">
              <div className="w-full grid grid-cols-2">
                <div
                  className="w-full p-3 cursor-pointer"
                  style={
                    this.state.dangNhap
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "#C2B8A3" }
                  }
                  onClick={() => {
                    this.changeDangNhap(true);
                  }}
                >
                  <h1 className="text-center text-xl m-0">{<Translation>{(t) => <>{t("Sign in")}</>}</Translation>}</h1>
                </div>
                <div
                  className="w-full p-3 cursor-pointer"
                  style={
                    !this.state.dangNhap
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "#C2B8A3" }
                  }
                  onClick={() => {
                    this.changeDangNhap(false);
                  }}
                >
                  <h1 className="text-center text-xl m-0">{<Translation>{(t) => <>{t("Register")}</>}</Translation>}</h1>
                </div>
              </div>
              <div>
                {this.state?.dangNhap ? (
                  <DangNhap history={this.props.history}/>
                ) : (
                  <DangKy changeDangNhap={this.changeDangNhap}/>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default function LoginRegister(props) {
  return (
    <Suspense fallback="loading">
      <MyComponent {...props} />
    </Suspense>
  );
}
