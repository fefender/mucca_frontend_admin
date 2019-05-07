import React, { Component } from "react";
import { Login } from "./Login";
import {
  Header,
  Grid,
  Icon,
  Container,
  Button,
  Input
} from "semantic-ui-react";

const login = new Login();

class LoginView extends Component {
  state = {
    username: "",
    password: "",
    environment: this.props.env,
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
    this.setState({ loginstatus: auth });
    return this.props.status(auth);
  };

  render() {
    return (
      <div>
        <div className="loginEnv">
          <Container text textAlign="center" fluid>
            <Header
              icon="sign-in"
              content="Login to new environment"
              color="violet"
              textAlign="center"
            />
            <br />
            {/* <br />
            <br />
            <Header as="h1" dividing textAlign="center" color="violet">
              Login
            </Header>
            <br />
            <br /> */}
            <Input
              fluid
              placeholder="Username"
              size="small"
              name="username"
              value={this.state.username}
              onChange={this.inputHandler}
            />
            <br />
            <Input
              fluid
              placeholder="Password"
              size="small"
              name="password"
              value={this.state.password}
              onChange={this.inputHandler}
            />
            <br />
            <Input
              fluid
              size="small"
              list="environment"
              placeholder="Environment..."
              name="environment"
              value={this.state.environment}
              onChange={this.inputHandler}
            />
            <datalist id="environment">
              <option value="develop" />
              <option value="production" />
              <option value="stage" />
            </datalist>
            <br />
            <br />
            <Button
              basic
              color="violet"
              content="Sign In"
              size="medium"
              compact
              onClick={this.handlerLogin}
            />
            <br />
          </Container>
        </div>
        {/* <div>
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
        </div> */}
      </div>
    );
  }
}

export default LoginView;
