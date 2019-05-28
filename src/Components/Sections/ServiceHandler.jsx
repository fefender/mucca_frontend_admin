import React, { Component } from "react";
import Cookies from "universal-cookie";
import Api from "../../api";
import {
  Modal,
  Accordion,
  Button,
  Icon,
  Menu,
  Container,
  Select,
  Header,
  Segment,
  Card
} from "semantic-ui-react";
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import LoginView from "../../Login/LoginView";

const cookies = new Cookies();
const myapi = new Api();

class ServiceHanler extends Component {
  state = {
    environment: cookies.get("userEnv"),
    serviceName: this.props.sName,
    serviceGroup: this.props.sGroup,
    done: false,
    command: ""
  };

  triggerCommand = (e, { value }) => {
    console.log("!", value);
    let query =
      "name=" + this.state.serviceGroup + "." + this.state.serviceName;
    if (this.state.serviceGroup === this.state.serviceName) {
      query = "name=" + this.state.serviceGroup;
    }
    myapi.triggerAndQuery(
      this.state.environment,
      value,
      query,
      this.triggerResponse
    );
    this.setState({ command: value });
  };

  triggerResponse = res => {
    if (res && res.status === 200) {
      console.log("command executed");
      this.setState({ done: true });
    }
  };

  render() {
    return (
      <div>
        {this.state.done ? (
          <Card
            fluid
            color="violet"
            header={
              "Executed " + this.state.command + " on " + this.state.sName
            }
          />
        ) : (
          //   <Segment color="violet">Violet</Segment>
          <Menu compact size="mini">
            <Menu.Item>
              <Button
                inverted
                size="small"
                value="build"
                onClick={this.triggerCommand}
              >
                <span
                  className="btnlabel"
                  title={"Build " + this.state.serviceName}
                >
                  Build{" "}
                </span>
                <Icon name="sitemap" circular color="violet" size="small" />
              </Button>
            </Menu.Item>
            <Menu.Item>
              <span className="buttondivider" />
              <Button
                inverted
                size="small"
                value="run"
                onClick={this.triggerCommand}
              >
                <span
                  className="btnlabel"
                  title={"Start " + this.state.serviceName}
                >
                  Start{" "}
                </span>
                <Icon name="play" circular color="violet" size="small" />
              </Button>
            </Menu.Item>
            <Menu.Item>
              <span className="buttondivider" />
              <Button
                inverted
                size="small"
                value="stop"
                onClick={this.triggerCommand}
              >
                <span
                  className="btnlabel"
                  title={"Stop " + this.state.serviceName}
                >
                  Stop{" "}
                </span>

                <Icon name="pause" circular color="violet" size="small" />
              </Button>
              <span className="buttondivider" />
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
}

export default ServiceHanler;
