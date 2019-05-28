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

class SingleStatusViewer extends Component {
  state = {
    group: this.props.group
  };
  render() {
    return (
      <div>
        <p>Status for group: {this.state.group} </p>
      </div>
    );
  }
  componentWillMount() {
    console.log(this.props.group);
    if ((this.props.group === "core") | "custom") {
      let query = "group=" + this.props.group;
      api.triggerAndQuery(
        this.state.environment,
        "status",
        query,
        this.triggerResponse
      );
    }
  }
}

export default SingleStatusViewer;
