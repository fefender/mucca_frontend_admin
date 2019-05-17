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
    action: cookies.get("logAction")
  };
  render() {
    return <div>Logs</div>;
  }
  componentWillMount() {
    console.log(
      cookies.get("logPort"),
      cookies.get("logFile"),
      cookies.get("logAction")
    );
  }
}

export default LogsViewer;
