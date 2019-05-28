import React, { Component } from "react";
import { Menu, Container, Header } from "semantic-ui-react";
import Cookies from "universal-cookie";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";
import Api from "../../api";

const api = new Api();
const cookies = new Cookies();

export class LeftMenu extends Component {
  state = { activeItem: "" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = e => {
    api.logout(this.logoutRes);
  };

  logoutRes = res => {
    this.setState({ activeItem: "" });
    if (res && res.status === 200) {
      console.log("logged out");
      let tok = cookies.get("userToken");
      let key = cookies.get("userKey");
      let env = cookies.get("userEnv");
      if (tok && key) {
        cookies.remove("userToken");
        cookies.remove("userKey");
        cookies.remove("userEnv");
      }
      cookies.remove("userToken");
      cookies.remove("userKey");
      cookies.remove("userEnv");
    }
    // this.props.history.push("/");
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary color="violet" size="huge">
        <Menu.Item
          name="home"
          as={NavLink}
          exact
          to="/"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="status"
          as={NavLink}
          to="/status/all"
          active={activeItem === "status"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="settings"
          as={NavLink}
          to="/settings"
          active={activeItem === "settings"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="logs"
          as={NavLink}
          to="/logs"
          active={activeItem === "logs"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            as={NavLink}
            to="/logout"
            active={activeItem === "logout"}
            onClick={this.logout}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
export default LeftMenu;
