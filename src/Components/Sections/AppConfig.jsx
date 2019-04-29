import React, { Component } from "react";
import Cookies from "universal-cookie";
import Api from "../../api";
import {
  Header,
  Icon,
  Container,
  Button,
  Table,
  Label,
  Grid
} from "semantic-ui-react";

const api = new Api();
const cookies = new Cookies();

class AppConfig extends Component {
  state = {
    environment: cookies.get("userEnv"),
    appInfo: "",
    superowner: "",
    core: "",
    mpkg: "",
    storage: "",
    portList: "",
    coreEventConsumer: "",
    mpkgEventConsumer: "",
    loaded: false
  };

  getConfigData = res => {
    if (res && res.status === 200) {
      this.setState({
        appInfo: res.data.data.appinfo,
        core: res.data.data.core,
        mpkg: res.data.data.mpkg,
        storage: res.data.data.storage,
        superowner: res.data.data.superowner,
        coreEventConsumer: res.data.data.coreEventConsumer,
        mpkgEventConsumer: res.data.data.mpkgEventConsumer,
        loaded: true
      });
    }
  };

  getPortList = res => {
    if (res && res.status === 200) {
      this.setState({ portList: res.data.data[this.state.environment] });
    }
  };

  setAppInfo() {
    return (
      <Table color="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>App Name</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Environment</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{this.state.appInfo.name}</Table.Cell>
            <Table.Cell> {this.state.superowner}</Table.Cell>
            <Table.Cell> {this.state.environment}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
  setCore() {
    const content = [];
    for (let x in this.state.core) {
      let rowTitle = (
        <Table.Row>
          <Table.Cell>{this.state.core[x].name}</Table.Cell>
          <Table.Cell>
            {this.state.portList[this.state.core[x].name]}
          </Table.Cell>
          <Table.Cell>
            <Icon name="checkmark" />
          </Table.Cell>
        </Table.Row>
      );
      content.push(rowTitle);
    }
    return (
      <Table color="teal">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {content.map((value, ind) => (
          <Table.Body key={ind}>{value}</Table.Body>
        ))}
      </Table>
    );
  }
  setMpkg() {
    const content = [];
    for (let x in this.state.mpkg) {
      let rowTitle = (
        <Table.Row>
          <Table.Cell>{this.state.mpkg[x].name}</Table.Cell>
          <Table.Cell>
            {this.state.portList[this.state.mpkg[x].name]}
          </Table.Cell>
          <Table.Cell>
            <Icon name="checkmark" />
          </Table.Cell>
        </Table.Row>
      );
      content.push(rowTitle);
    }
    return (
      <Table color="purple">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {content.map((value, ind) => (
          <Table.Body key={ind}>{value}</Table.Body>
        ))}
      </Table>
    );
  }

  setCoreEventConsumer = () => {
    const content = [];
    for (let x in this.state.coreEventConsumer) {
      let rowTitle = (
        <Table.Row>
          <Table.Cell>{this.state.coreEventConsumer[x].name}</Table.Cell>
          <Table.Cell>
            {this.state.portList[this.state.coreEventConsumer[x].name]}
          </Table.Cell>
          <Table.Cell>
            <Icon name="checkmark" />
          </Table.Cell>
        </Table.Row>
      );
      content.push(rowTitle);
    }
    return (
      <Table color="orange">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {content.map((value, ind) => (
          <Table.Body key={ind}>{value}</Table.Body>
        ))}
      </Table>
    );
  };

  setMpkgEventConsumer = () => {
    const content = [];
    for (let x in this.state.mpkgEventConsumer) {
      let rowTitle = (
        <Table.Row>
          <Table.Cell>{this.state.mpkgEventConsumer[x].name}</Table.Cell>
          <Table.Cell>
            {this.state.portList[this.state.mpkgEventConsumer[x].name]}
          </Table.Cell>
          <Table.Cell>
            <Icon name="checkmark" />
          </Table.Cell>
        </Table.Row>
      );
      content.push(rowTitle);
    }
    return (
      <Table color="olive">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {content.map((value, ind) => (
          <Table.Body key={ind}>{value}</Table.Body>
        ))}
      </Table>
    );
  };

  setStorage() {}

  genericSetter = data => {
    const content = [];
    for (let x in data) {
      let rowTitle = (
        <Table.Row>
          <Table.Cell>{data[x].name}</Table.Cell>
          <Table.Cell>{this.state.portList[data[x].name]}</Table.Cell>
          <Table.Cell>
            <Icon name="checkmark" />
          </Table.Cell>
        </Table.Row>
      );
      content.push(rowTitle);
    }
    return (
      <Table color="black">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {content.map((value, ind) => (
          <Table.Body key={ind}>{value}</Table.Body>
        ))}
      </Table>
    );
  };

  render() {
    return (
      <div className="appConfig">
        <Header as="h3" color="violet">
          Application Info{" "}
        </Header>
        {this.state.loaded && this.setAppInfo()}
        <Header as="h3" color="teal">
          Core Services{" "}
        </Header>
        {/* {this.state.loaded && this.genericSetter(this.state.core)} */}
        {this.state.loaded && this.setCore()}
        <Header as="h3" color="orange">
          Core Consumers{" "}
        </Header>
        {/* {this.state.loaded && this.genericSetter(this.state.coreEventConsumer)} */}
        {this.state.loaded && this.setCoreEventConsumer()}
        <Header as="h3" color="purple">
          Custom Services{" "}
        </Header>
        {/* {this.state.loaded && this.genericSetter(this.state.mpkg)} */}
        {this.state.loaded && this.setMpkg()}
        <Header as="h3" color="olive">
          Custom Consumers{" "}
        </Header>
        {/* {this.state.loaded && this.genericSetter(this.state.mpkgEventConsumer)} */}
        {this.state.loaded && this.setMpkgEventConsumer()}
      </div>
    );
  }
  componentWillMount() {
    if (this.state.environment !== undefined) {
      let query = "config";
      api.read(this.state.environment, query, this.getConfigData);
      let port = "portlist";
      api.read(this.state.environment, port, this.getPortList);
    }
  }
}

export default AppConfig;
