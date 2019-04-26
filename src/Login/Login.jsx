import { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export class Login extends Component {
  authorization(token, key, callback) {
    let authorizationUrl = process.env.REACT_APP_SERV_URL + "/v1/authorization";
    console.log("authorization -> ", token, key);

    axios({
      method: "get",
      url: authorizationUrl,
      headers: {
        "Content-Type": "application/json",
        token: token,
        key: key
      },
      data: ""
    })
      .then(function(response) {
        callback(true);
      })
      .catch(function(error) {
        cookies.remove("username", { path: "/" });
        cookies.remove("userToken", { path: "/" });
        cookies.remove("userKey", { path: "/" });
        callback(false);
      });
  }

  authentication(username, password, environment, callback) {
    let authenticationUrl =
      process.env.REACT_APP_SERV_URL + "/v1/authentication";
    var self = this;
    axios({
      method: "post",
      url: authenticationUrl,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        username: username,
        password: password,
        environment: environment
      }
    })
      .then(function(response) {
        cookies.set("userToken", response.data.data.token, { path: "/" });
        cookies.set("userKey", response.data.data.key, { path: "/" });
        cookies.set("userEnv", environment, { path: "/" });
        self.authorization(
          cookies.get("userToken"),
          cookies.get("userKey"),
          callback
        );
      })
      .catch(function(error) {
        cookies.remove("userToken", { path: "/" });
        cookies.remove("userKey", { path: "/" });
        cookies.remove("userEnv", { path: "/" });
        callback(false);
      });
  }

  logout() {
    let authorizationUrl = process.env.REACT_APP_SERV_URL + "/v1/logout";

    axios({
      method: "get",
      url: authorizationUrl,
      headers: {
        "Content-Type": "application/json",
        token: cookies.get("userToken"),
        key: cookies.get("userKey")
      }
    })
      .then(function(response) {
        console.log("logout request success");
        cookies.remove("userToken", { path: "/" });
        cookies.remove("userKey", { path: "/" });
        cookies.remove("userEnv", { path: "/" });
        window.location.reload();
      })
      .catch(function(error) {
        console.log("logout failure");
      });
  }
}

export default Login;
