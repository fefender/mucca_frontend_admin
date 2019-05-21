import React, { Component } from "react";
import Cookies from "universal-cookie";
import Api from "../../api";
import {
  Header,
  Icon,
  Container,
  Button,
  Modal,
  Label,
  Accordion,
  Grid,
  Segment,
  Transition,
  Form,
  Radio,
  Card
} from "semantic-ui-react";

const api = new Api();
const cookies = new Cookies();

class LogsViewer extends Component {
  state = {
    environment: cookies.get("userEnv"),
    port: cookies.get("logPort"),
    file: cookies.get("logFile"),
    action: cookies.get("logAction"),
    loaded: false,
    data: []
  };

  openWebSocket = () => {
    console.log("opening websocket");
    let path = "ws://localhost:" + this.state.port;
    var ws = new WebSocket(path);

    ws.onopen = () => {
      // connection opened
      let fname = this.state.file.split("/");
      console.log(fname[1]);
      let toSend = JSON.stringify({ filename: fname[1] });

      ws.send(toSend); // send a message
    };

    ws.onmessage = e => {
      // a message was received
      console.log(e.data);
      this.setState({ loaded: true });
      let stamp = this.state.data;
      if (e.data) {
        stamp.push(e.data);
        this.setState({ data: stamp });
      }
    };

    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
  };

  render() {
    return (
      <div>
        <Header color="violet">App {this.state.action}</Header>
        <Segment color="violet" className="logsViewerD" padded>
          <div className="logsViewer">
            {this.state.loaded &&
              this.state.data.map((value, ind) => (
                <ul>
                  <li key={ind}>{value}</li>
                </ul>
              ))}
          </div>
          <span className="spaceunder"> </span>
        </Segment>
      </div>
    );
  }
  componentWillMount() {
    console.log(
      cookies.get("logPort"),
      cookies.get("logFile"),
      cookies.get("logAction")
    );
    if (
      cookies.get("logPort") !== undefined &&
      cookies.get("logFile") !== undefined &&
      cookies.get("logAction") !== undefined
    ) {
      console.log("creating websockets");
      this.openWebSocket();
    }
  }
}

export default LogsViewer;
