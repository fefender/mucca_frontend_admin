import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Login } from "./Login/Login";
import { Dashboard } from "./Dashboard/Dashboard";
// import logo from "./img/logo-bianco.png";
import Cookies from "universal-cookie";
import { Container, Header, Input, Button, Loader } from "semantic-ui-react";
import "./App.css";

const cookies = new Cookies();
const login = new Login();
const dashboardRender = new Dashboard();

class App extends Component {
  state = {
    username: "",
    password: "",
    environment: "",
    loginstatus: false,
    loading: true
  };

  inputHandler = event => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handlerLogin = event => {
    login.authentication(
      this.state.username,
      this.state.password,
      this.state.environment,
      this.setAuthorization
    );
  };

  setAuthorization = auth => {
    if (auth === false) {
      console.log("NON autorizzato", auth);
      this.setState({ loginstatus: auth, loading: false });
    } else {
      console.log("autorizzato", auth);
      this.setState({ loginstatus: auth, loading: false });
    }
    // this.setState({ loginstatus: auth, loading: false });
  };

  render() {
    return (
      <div>
        {this.state.loading && !this.state.loginstatus && (
          <div>
            <br />
            <br />
            <Loader active inline="centered" size="big" />
          </div>
        )}
        {!this.state.loading && !this.state.loginstatus && (
          <div className="login">
            <Container text textAlign="center" fluid>
              <br />
              <br />
              <Header as="h1" dividing textAlign="center" color="violet">
                Login
              </Header>
              <br />
              <br />
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
            </Container>
          </div>
        )}
        {!this.state.loading && this.state.loginstatus && (
          <Router>{dashboardRender.renderDashboard()}</Router>
        )}
      </div>
    );
  }

  componentWillMount() {
    if (
      typeof cookies.get("userToken") != "undefined" &&
      cookies.get("userToken")
    ) {
      if (
        typeof cookies.get("userKey") != "undefined" &&
        cookies.get("userKey")
      ) {
        login.authorization(
          cookies.get("userToken"),
          cookies.get("userKey"),
          this.setAuthorization
        );
      }
    } else {
      console.log("start FAKE authorization");
      login.authorization("noToken", "noKey", this.setAuthorization);
    }
  }
}

export default App;
