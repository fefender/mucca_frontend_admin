import React, { Component } from "react";
import Cookies from "universal-cookie";
import Api from "../../api";
import {
  Modal,
  Input,
  Button,
  Icon,
  Menu,
  Container,
  Select,
  Header
} from "semantic-ui-react";
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import LoginView from "../../Login/LoginView";

const cookies = new Cookies();
const myapi = new Api();
const options = [
  { key: "develop", text: "develop", value: "develop" },
  { key: "production", text: "production", value: "production" },
  { key: "stage", text: "stage", value: "stage" }
];

class TopControl extends Component {
  state = {
    environment: cookies.get("userEnv"),
    modalOpen: false,
    errOpen: false
  };

  envHandler = (event, { value }) => {
    this.setState({ environment: value });
  };

  changeEnv = e => {
    cookies.remove("userEnv");
    cookies.set("userEnv", this.state.environment);
    return window.location.reload();
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false, errOpen: false });

  handleOpenErr = () => this.setState({ errOpen: true });

  handleCloseErr = () => this.setState({ errOpen: false });

  // handleItemClick = name => this.setState({ activeItem: name });

  checkStatus = res => {
    if (res) {
      this.changeEnv();
    } else {
      this.setState({ errOpen: true });
    }
  };

  //triggers
  triggerCommand = (e, { value }) => {
    console.log("!", value);
    myapi.trigger(this.state.environment, value, this.triggerResponse);
  };

  triggerResponse = res => {
    console.log("trigger response", res);
    if (res && res.status === 200) {
      let action = res.data.data.action;
      let port = res.data.data.port;
      let file = res.data.data.fname;
      cookies.get("logPort") !== undefined && cookies.remove("logPort");
      cookies.get("logFile") !== undefined && cookies.remove("logFile");
      cookies.get("logAction") !== undefined && cookies.remove("logAction");

      cookies.set("logPort", port);
      cookies.set("logFile", file);
      cookies.set("logAction", action);
      // return this.redirect(action);
    }
  };

  redirect = action => {
    console.log(window.location);
    let ref = window.location.origin;
    let redir = ref + "/logs/" + action;
    window.location.replace(redir);
  };
  render() {
    // const { activeItem } = this.state;
    return (
      <div className="topcontrol">
        <Container textAlign="center">
          <Menu compact>
            {/* <Button.Group icon compact> */}
            <Menu.Item
            // as={Link}
            // to="/logs"
            // name="reviews"
            // active={activeItem === "build"}
            // onClick={this.handleItemClick}
            >
              <Button
                inverted
                size="small"
                value="build"
                onClick={this.triggerCommand}
              >
                <span className="btnlabel">Build </span>
                <Icon name="sitemap" circular color="violet" size="small" />
              </Button>
            </Menu.Item>
            <Menu.Item
            // as={Link}
            // to="/logs"
            // name="run"
            // active={activeItem === "run"}
            // onClick={this.handleItemClick}
            >
              <span className="buttondivider" />
              <Button
                inverted
                size="small"
                value="run"
                onClick={this.triggerCommand}
              >
                <span className="btnlabel">Start </span>
                <Icon name="play" circular color="violet" size="small" />
              </Button>
            </Menu.Item>
            <Menu.Item
            // as={Link}
            // to="/logs"
            // name="stop"
            // active={activeItem === "stop"}
            // onClick={this.handleItemClick}
            >
              <span className="buttondivider" />
              <Button
                inverted
                size="small"
                value="stop"
                onClick={this.triggerCommand}
              >
                <span className="btnlabel">Stop </span>

                <Icon name="pause" circular color="violet" size="small" />
              </Button>
              <span className="buttondivider" />
            </Menu.Item>
            {/* </Button.Group> */}

            <Menu.Item>
              <Select
                floated="right"
                size="mini"
                options={options}
                defaultValue={this.state.environment}
                onChange={this.envHandler}
              />
              {/* </Menu.Item>
            <Menu.Item> */}
              <span className="spazio" />
              <Button
                type="submit"
                basic
                color="violet"
                // compact
                // onClick={this.changeEnv}
                onClick={this.handleOpen}
              >
                ok
              </Button>
            </Menu.Item>
          </Menu>
        </Container>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
          dimmer="blurring"
        >
          <Modal.Content>
            {this.state.errOpen ? (
              <Container className="loginEnv">
                <Header
                  icon="warning sign"
                  content="Incorrect username or password"
                  color="red"
                  textAlign="center"
                />
              </Container>
            ) : (
              <LoginView
                status={this.checkStatus}
                env={this.state.environment}
              />
            )}
            {/* <LoginView status={this.checkStatus} env={this.state.environment} /> */}
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.handleClose}>
              <Icon name="remove" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default TopControl;
