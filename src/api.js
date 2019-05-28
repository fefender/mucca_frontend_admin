// *******************Note*******************************
// ##service: microservizio da chiamare
// ##dataToPost: dati da inserire nel body della richiesta
// (deve essere precedentemente formattato e passato come oggetto {})
// ##query: da passare come null se la read è semplice, preformattata
// come oggetto per essere passata direttamente se composta(ad es skip/limit/fields/filtri)
// ##callback:funzione che nel componente da cui chiamo l'api gestirà la risposta per fornirla
// al render
import Cookies from "universal-cookie";
import axios from "axios";

let cookies = new Cookies();

export class Api {
  getCookies = callback => {
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    Promise.all([userToken, userKey]).then(function(result) {
      let gotToken = result[0];
      let gotKey = result[1];
      if (gotToken && gotKey) {
        let headers = [gotToken, gotKey];
        return callback(headers);
      } else {
        return callback(undefined);
      }
    });
  };

  create = (env, query, subject, dataToPost, callback) => {
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    let userEnv = Promise.resolve(cookies.get("userEnv"));
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;
    let action = process.env.REACT_APP_ACTION_C;
    let fullPath =
      url +
      "/" +
      version +
      "/" +
      action +
      "/" +
      env +
      "/" +
      query +
      "/" +
      subject;
    Promise.all([userToken, userKey])
      .then(function(result) {
        let gotToken = result[0];
        let gotKey = result[1];
        if (gotToken && gotKey) {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            token: gotToken,
            key: gotKey
          };
          return headers;
        }
      })
      .then(res => {
        axios({
          method: "post",
          url: fullPath,
          headers: res,
          data: dataToPost
        })
          .then(res => {
            return callback(res);
          })
          .catch(function(error) {
            console.log("error in api", error);
            return callback(error.response);
          });
      });
  };

  update = (dataToPost, callback) => {
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    let userEnv = Promise.resolve(cookies.get("userEnv"));
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;
    let action = process.env.REACT_APP_ACTION_U;
    let fullPath = url + "/" + version + "/" + action + "/" + userEnv;

    Promise.all([userToken, userKey])
      .then(function(result) {
        let gotToken = result[0];
        let gotKey = result[1];
        if (gotToken && gotKey) {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            token: gotToken,
            key: gotKey
          };
          return headers;
        }
      })
      .then(res => {
        axios({
          method: "post",
          url: fullPath,
          headers: res,
          data: dataToPost
        })
          .then(res => {
            return callback(res);
          })
          .catch(function(error) {
            console.log("error in api", error);
            return callback(error.response);
          });
      });
  };

  delete = (service, id, callback) => {
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    let userEnv = Promise.resolve(cookies.get("userEnv"));
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;
    let action = process.env.REACT_APP_ACTION_D;
    let fullPath = url + "/" + version + "/" + action + "/" + userEnv;

    Promise.all([userToken, userKey])
      .then(function(result) {
        let gotToken = result[0];
        let gotKey = result[1];
        if (gotToken && gotKey) {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            token: gotToken,
            key: gotKey
          };
          return headers;
        }
      })
      .then(res => {
        axios({
          method: "post",
          url: fullPath,
          headers: res
        })
          .then(res => {
            return callback(res);
          })
          .catch(function(error) {
            console.log("error in api", error);
            return callback(error.response);
          });
      });
  };

  read = (env, query, callback) => {
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    let userEnv = Promise.resolve(cookies.get("userEnv"));
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;
    let action = process.env.REACT_APP_ACTION_R;
    let fullPath = url + "/" + version + "/" + action + "/" + env + "/" + query;
    Promise.all([userToken, userKey])
      .then(function(result) {
        let gotToken = result[0];
        let gotKey = result[1];
        if (gotToken && gotKey) {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            token: gotToken,
            key: gotKey
          };
          return headers;
        }
      })
      .then(res => {
        axios({
          method: "get",
          url: fullPath,
          headers: res
        })
          .then(res => {
            return callback(res);
          })
          .catch(function(error) {
            return callback(error.response);
          });
      });
  };

  authentication = (dataToPost, callback) => {
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;

    let action = process.env.REACT_APP_ACTION_AUTH;
    let fullPath = url + "/" + version + "/" + action;
    axios({
      method: "post",
      url: fullPath,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      data: dataToPost
    })
      .then(res => {
        return callback(res);
      })
      .catch(function(error) {
        console.log("error in api", error);
        return callback(error.response);
      });
  };

  authorization = callback => {
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;

    let action = process.env.REACT_APP_ACTION_AUTHO;
    let fullPath = url + "/" + version + "/" + action;
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    Promise.all([userToken, userKey])
      .then(function(result) {
        let gotToken = result[0];
        let gotKey = result[1];
        if (gotToken && gotKey) {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            token: gotToken,
            key: gotKey
          };
          return headers;
        }
      })
      .then(res => {
        axios({
          method: "get",
          url: fullPath,
          headers: res
        })
          .then(res => {
            return callback(res);
          })
          .catch(function(error) {
            console.log("error in api", error);
            return callback(error.response);
          });
      });
  };

  logout = callback => {
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;

    let action = process.env.REACT_APP_ACTION_LOGOUT;
    let fullPath = url + "/" + version + "/" + action;
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    Promise.all([userToken, userKey])
      .then(function(result) {
        let gotToken = result[0];
        let gotKey = result[1];
        if (gotToken && gotKey) {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            token: gotToken,
            key: gotKey
          };
          return headers;
        }
      })
      .then(res => {
        axios({
          method: "get",
          url: fullPath,
          headers: res
        })
          .then(res => {
            Promise.resolve(cookies.remove("logPort"));
            Promise.resolve(cookies.remove("logFile"));
            Promise.resolve(cookies.remove("logAction"));
            Promise.resolve(cookies.remove("userToken"));
            Promise.resolve(cookies.remove("userKey"));
            return callback(res);
          })
          .catch(function(error) {
            console.log("error in api", error);
            return callback(error.response);
          });
      });
  };
  trigger = (env, command, callback) => {
    // http://localhost:8777/v1/run/develop
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;
    let fullPath = url + "/" + version + "/" + command + "/" + env;
    console.log("**!!!!!***", fullPath);
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    Promise.all([userToken, userKey])
      .then(function(result) {
        let gotToken = result[0];
        let gotKey = result[1];
        if (gotToken && gotKey) {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            token: gotToken,
            key: gotKey
          };
          return headers;
        }
      })
      .then(res => {
        axios({
          method: "get",
          url: fullPath,
          headers: res
        })
          .then(res => {
            return callback(res);
          })
          .catch(function(error) {
            return callback(error.response);
          });
      });
  };

  triggerAndQuery = (env, command, query, callback) => {
    // http://localhost:8777/v1/run/develop
    let url = process.env.REACT_APP_SERV_URL;
    let version = process.env.REACT_APP_VERSION;
    let fullPath =
      url + "/" + version + "/" + command + "/" + env + "/" + query;
    let userToken = Promise.resolve(cookies.get("userToken"));
    let userKey = Promise.resolve(cookies.get("userKey"));
    Promise.all([userToken, userKey])
      .then(function(result) {
        let gotToken = result[0];
        let gotKey = result[1];
        if (gotToken && gotKey) {
          let headers = {
            "Content-Type": "application/json; charset=utf-8",
            token: gotToken,
            key: gotKey
          };
          return headers;
        }
      })
      .then(res => {
        axios({
          method: "get",
          url: fullPath,
          headers: res
        })
          .then(res => {
            return callback(res);
          })
          .catch(function(error) {
            return callback(error.response);
          });
      });
  };
}

export default Api;
