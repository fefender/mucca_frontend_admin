import React, { Component } from "react";
import { Menu, Container, Header } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";

export class LeftMenu extends Component {
  state = { activeItem: "" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
          name="settings"
          as={NavLink}
          to="/settings"
          active={activeItem === "settings"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="messages"
          as={NavLink}
          to="/messages"
          active={activeItem === "messages"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="friends"
          as={NavLink}
          to="/friends"
          active={activeItem === "friends"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            as={NavLink}
            to="/logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
export default LeftMenu;
