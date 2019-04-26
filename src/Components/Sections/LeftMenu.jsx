import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export class LeftMenu extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary vertical color="violet">
        <Menu.Item
          name="home"
          as={Link}
          to="/"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="settings"
          as={Link}
          to="/settings"
          active={activeItem === "settings"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="messages"
          as={Link}
          to="/messages"
          active={activeItem === "messages"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="friends"
          as={Link}
          to="/friends"
          active={activeItem === "friends"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
export default LeftMenu;
