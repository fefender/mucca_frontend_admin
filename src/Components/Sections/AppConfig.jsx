import React, { Component } from "react";
import Cookies from "universal-cookie";
import Api from "../../api";
import {
  Header,
  Icon,
  Container,
  Button,
  Table,
  Label
} from "semantic-ui-react";

const api = new Api();
const cookies = new Cookies();

class AppConfig extends Component {
  state = {
    environment: cookies.get("userEnv"),
    appInfo: "",
    core: "",
    mpkg: "",
    storage: "",
    loaded: false
  };

  getConfigData = res => {
    if (res && res.status === 200) {
      console.log(res.data.data);
      this.setState({
        appInfo: res.data.data.appinfo,
        core: res.data.data.core,
        mpkg: res.data.data.mpkg,
        storage: res.data.data.storage,
        loaded: true
      });
    }
  };

  setAppInfo() {
    console.log(this.state.appInfo);
    return (
      <Header
        as="h3"
        // color="violet"
      >
        App Name:<strong>{this.state.appInfo.name}</strong>
      </Header>
    );
  }
  setCore() {
    console.log(this.state.core);
    const content = [];
    for (let x in this.state.core) {
      console.log(this.state.core[x].name);
      let rowTitle = (
        <Table color="violet">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Port</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.state.core[x].name}</Table.Cell>
              <Table.Cell>//</Table.Cell>
              <Table.Cell>//</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
      content.push(rowTitle);
    }
    return (
      <ul>
        {content.map((value, ind) => (
          <li key={ind}>{value}</li>
        ))}
      </ul>
    );
  }
  setMpkg() {}

  setStorage() {}

  render() {
    return (
      <div className="appConfig">
        {this.state.loaded && this.setAppInfo()}
        {this.state.loaded && this.setCore()}
      </div>
    );
  }
  componentWillMount() {
    if (this.state.environment != undefined) {
      let query = "config";
      api.read(this.state.environment, query, this.getConfigData);
    }
  }
}

export default AppConfig;
