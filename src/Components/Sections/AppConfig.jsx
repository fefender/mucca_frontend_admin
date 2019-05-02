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
  Accordion,
  Grid,
  Segment,
  Transition
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
    loaded: false,
    active0: true,
    active1: true,
    active2: false,
    active3: true,
    active4: false,
    active5: false,
    duration: 200
  };

  //Segment Visibility Handlers
  handleClick0 = e => {
    this.setState({
      active0: !this.state.active0
    });
  };
  handleClick1 = e => {
    this.setState({ active1: !this.state.active1 });
  };
  handleClick2 = e => {
    this.setState({ active2: !this.state.active2 });
  };
  handleClick3 = e => {
    this.setState({ active3: !this.state.active3 });
  };
  handleClick4 = e => {
    this.setState({ active4: !this.state.active4 });
  };
  handleClick5 = e => {
    this.setState({ active5: !this.state.active5 });
  };

  //Data getters
  getConfigData = res => {
    console.log(res.data);
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

  //Data Setters
  setAppInfo() {
    return (
      <Table>
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
      <Table>
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
        <br />
        <Container fluid>
          <Segment inverted color="blue" size="mini">
            <Header as="h5" textAlign="center">
              APPLICATION
            </Header>
          </Segment>
          <Accordion exclusive={false}>
            <Accordion.Title onClick={this.handleClick0}>
              <Header as="h3" color="blue">
                Application Info
                <Icon
                  name="angle down"
                  flipped={this.state.active0 ? "vertically" : "horizontally"}
                />
              </Header>
            </Accordion.Title>
            <Transition
              animation="slide down"
              duration={this.state.duration}
              visible={this.state.active0}
            >
              <Accordion.Content active={this.state.active0}>
                <Segment color="blue">
                  {this.state.loaded && this.setAppInfo()}
                </Segment>
              </Accordion.Content>
            </Transition>
          </Accordion>
        </Container>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <br />
              <Segment inverted color="violet" size="mini">
                <Header as="h5" textAlign="center">
                  CORE
                </Header>
              </Segment>
              <Accordion exclusive={false}>
                <Accordion.Title onClick={this.handleClick1}>
                  <Header as="h3" color="violet">
                    Core Services
                    <Icon
                      name="angle down"
                      flipped={
                        this.state.active1 ? "vertically" : "horizontally"
                      }
                    />
                  </Header>
                </Accordion.Title>
                <Transition
                  animation="slide down"
                  duration={this.state.duration}
                  visible={this.state.active1}
                >
                  <Accordion.Content active={this.state.active1}>
                    <Segment color="violet">
                      {this.state.loaded && this.genericSetter(this.state.core)}
                    </Segment>
                  </Accordion.Content>
                </Transition>
                <Accordion.Title onClick={this.handleClick2}>
                  <Header as="h3" color="purple">
                    Core Consumers
                    <Icon
                      name="angle down"
                      flipped={
                        this.state.active2 ? "vertically" : "horizontally"
                      }
                    />
                  </Header>
                </Accordion.Title>
                <Transition
                  animation="slide down"
                  duration={this.state.duration}
                  visible={this.state.active2}
                >
                  <Accordion.Content active={this.state.active2}>
                    <Segment color="purple">
                      {this.state.loaded &&
                        this.genericSetter(this.state.coreEventConsumer)}
                    </Segment>
                  </Accordion.Content>
                </Transition>
                <Accordion.Title onClick={this.handleClick5}>
                  <Header as="h3" color="teal">
                    Storage
                    <Icon
                      name="angle down"
                      flipped={
                        this.state.active5 ? "vertically" : "horizontally"
                      }
                    />
                  </Header>
                </Accordion.Title>
                <Transition
                  animation="slide down"
                  duration={this.state.duration}
                  visible={this.state.active5}
                >
                  <Accordion.Content active={this.state.active5}>
                    <Segment color="teal">
                      {this.state.loaded &&
                        this.genericSetter(this.state.storage)}
                    </Segment>
                  </Accordion.Content>
                </Transition>
              </Accordion>
            </Grid.Column>
            <Grid.Column>
              <br />
              <Segment inverted color="red" size="mini">
                <Header as="h5" textAlign="center">
                  CUSTOM
                </Header>
              </Segment>
              <Accordion exclusive={false}>
                <Accordion.Title onClick={this.handleClick3}>
                  <Header as="h3" color="red">
                    Custom Services
                    <Icon
                      name="angle down"
                      flipped={
                        this.state.active3 ? "vertically" : "horizontally"
                      }
                    />
                  </Header>
                </Accordion.Title>
                <Transition
                  animation="slide down"
                  duration={this.state.duration}
                  visible={this.state.active3}
                >
                  <Accordion.Content active={this.state.active3}>
                    <Segment color="red">
                      {this.state.loaded && this.genericSetter(this.state.mpkg)}
                    </Segment>
                  </Accordion.Content>
                </Transition>
                <Accordion.Title onClick={this.handleClick4}>
                  <Header as="h3" color="orange">
                    Custom Consumers
                    <Icon
                      name="angle down"
                      flipped={
                        this.state.active4 ? "vertically" : "horizontally"
                      }
                    />
                  </Header>
                </Accordion.Title>
                <Transition
                  animation="slide down"
                  duration={this.state.duration}
                  visible={this.state.active4}
                >
                  <Accordion.Content active={this.state.active4}>
                    <Segment color="orange">
                      {this.state.loaded &&
                        this.genericSetter(this.state.mpkgEventConsumer)}
                    </Segment>
                  </Accordion.Content>
                </Transition>
              </Accordion>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <Accordion exclusive={false}>
          <Accordion.Title onClick={this.handleClick0}>
            <Header as="h3" color="blue">
              Application Info
              <Icon
                name="angle down"
                flipped={this.state.active0 ? "vertically" : "horizontally"}
              />
            </Header>
          </Accordion.Title>
          <Transition
            animation="slide down"
            duration={this.state.duration}
            visible={this.state.active0}
          >
            <Accordion.Content active={this.state.active0}>
              <Segment color="blue">
                {this.state.loaded && this.setAppInfo()}
              </Segment>
            </Accordion.Content>
          </Transition>
          <Accordion.Title onClick={this.handleClick1}>
            <Header as="h3" color="violet">
              Core Services
              <Icon
                name="angle down"
                flipped={this.state.active1 ? "vertically" : "horizontally"}
              />
            </Header>
          </Accordion.Title>
          <Transition
            animation="slide down"
            duration={this.state.duration}
            visible={this.state.active1}
          >
            <Accordion.Content active={this.state.active1}>
              <Segment color="violet">
                {this.state.loaded && this.genericSetter(this.state.core)}
              </Segment>
            </Accordion.Content>
          </Transition>
          <Accordion.Title onClick={this.handleClick2}>
            <Header as="h3" color="purple">
              Core Consumers
              <Icon
                name="angle down"
                flipped={this.state.active2 ? "vertically" : "horizontally"}
              />
            </Header>
          </Accordion.Title>
          <Transition
            animation="slide down"
            duration={this.state.duration}
            visible={this.state.active2}
          >
            <Accordion.Content active={this.state.active2}>
              <Segment color="purple">
                {this.state.loaded &&
                  this.genericSetter(this.state.coreEventConsumer)}
              </Segment>
            </Accordion.Content>
          </Transition>
          <Accordion.Title onClick={this.handleClick3}>
            <Header as="h3" color="red">
              Custom Services
              <Icon
                name="angle down"
                flipped={this.state.active3 ? "vertically" : "horizontally"}
              />
            </Header>
          </Accordion.Title>
          <Transition
            animation="slide down"
            duration={this.state.duration}
            visible={this.state.active3}
          >
            <Accordion.Content active={this.state.active3}>
              <Segment color="red">
                {this.state.loaded && this.genericSetter(this.state.mpkg)}
              </Segment>
            </Accordion.Content>
          </Transition>
          <Accordion.Title onClick={this.handleClick4}>
            <Header as="h3" color="orange">
              Custom Consumers
              <Icon
                name="angle down"
                flipped={this.state.active4 ? "vertically" : "horizontally"}
              />
            </Header>
          </Accordion.Title>
          <Transition
            animation="slide down"
            duration={this.state.duration}
            visible={this.state.active4}
          >
            <Accordion.Content active={this.state.active4}>
              <Segment color="orange">
                {this.state.loaded &&
                  this.genericSetter(this.state.mpkgEventConsumer)}
              </Segment>
            </Accordion.Content>
          </Transition>
          <Accordion.Title onClick={this.handleClick5}>
            <Header as="h3" color="teal">
              Storage
              <Icon
                name="angle down"
                flipped={this.state.active5 ? "vertically" : "horizontally"}
              />
            </Header>
          </Accordion.Title>
          <Transition
            animation="slide down"
            duration={this.state.duration}
            visible={this.state.active5}
          >
            <Accordion.Content active={this.state.active5}>
              <Segment color="teal">
                {this.state.loaded && this.genericSetter(this.state.storage)}
              </Segment>
            </Accordion.Content>
          </Transition>
        </Accordion> */}
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
