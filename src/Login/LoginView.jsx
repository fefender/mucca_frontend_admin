import React, { Component } from "react";
import { Login } from "./Login";
// import logo from "./img/logo-bianco.png";

const login = new Login();

class LoginView extends Component {
  state = {
    username: "",
    password: "",
    environment: "",
    loginstatus: false
  };

  inputHandler = event => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handlerLogin = event => {
    console.log("call authentication");
    login.authentication(
      this.state.username,
      this.state.password,
      this.state.environment,
      this.setAuthorization
    );
  };

  setAuthorization = auth => {
    if (auth === false) {
      this.setState({ loginstatus: auth });
    } else {
      this.setState({ loginstatus: auth });
    }
  };

  render() {
    return (
      <div>
        <div>{/* <img src={logo} alt="movingtech" /> */}</div>
        <div>
          <input
            // className="login-input"
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.inputHandler}
          />
          <span />
        </div>
        <div>
          <input
            // className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.inputHandler}
          />
          <span className="line-password" />
        </div>
        <div>
          <input
            // className="login-input"
            type="text"
            name="environment"
            placeholder="Environment"
            value={this.state.environment}
            onChange={this.inputHandler}
          />
          <span />
        </div>
        <div>
          <input
            // className="mucca-buttom"
            type="submit"
            value="login"
            onClick={this.handlerLogin}
          />
        </div>
      </div>
    );
  }
}

export default LoginView;
