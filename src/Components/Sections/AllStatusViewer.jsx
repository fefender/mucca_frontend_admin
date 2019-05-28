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
  Card,
  Table
} from "semantic-ui-react";
import ServiceHandler from "../Sections/ServiceHandler";

const api = new Api();
const cookies = new Cookies();

class AllStatusViewer extends Component {
  state = {
    group: this.props.group,
    environment: cookies.get("userEnv"),
    core: "",
    coreEventConsumer: "",
    mpkg: "",
    dependencies: "",
    reverseproxy: "",
    storage: "",
    loaded: false
  };

  triggerResponse = res => {
    console.log(res);
    if (res && res.status === 200) {
      this.setState({
        core: res.data.data.core,
        coreEventConsumer: res.data.data.coreEventConsumer,
        mpkg: res.data.data.mpkg,
        dependencies: res.data.data.dependencies,
        reverseproxy: res.data.data.reverseproxy,
        storage: res.data.data.storage,
        loaded: true
      });
    }
  };

  genericSetter = (data, group) => {
    const content = [];
    for (let x in data) {
      let rowTitle = (
        <Table.Row>
          <Table.Cell>
            <strong className="servName">{data[x].name}</strong>
          </Table.Cell>
          <Table.Cell>{data[x].status}</Table.Cell>
          <Table.Cell textAlign="center">
            <ServiceHandler sName={data[x].name} sGroup={group} />
          </Table.Cell>
        </Table.Row>
      );
      content.push(rowTitle);
    }
    return (
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Group name</Table.HeaderCell>
            <Table.HeaderCell> </Table.HeaderCell>
            <Table.HeaderCell textAlign="center"> Handlers</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell className="servGrTitle" textAlign="center">
              {group}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {" "}
              Handle all services in this group{" "}
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              {" "}
              <ServiceHandler sName={group} sGroup={group} />
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Handlers</Table.HeaderCell>
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
      <div>
        <Header as="h3" color="violet" textAlign="center">
          Application Status
        </Header>
        <Segment color="violet">
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Header as="h4" color="violet" textAlign="center">
                  Core
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.state.loaded &&
                  this.genericSetter(this.state.core, "core")}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.state.loaded &&
                  this.genericSetter(
                    this.state.coreEventConsumer,
                    "coreEventConsumer"
                  )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.state.loaded &&
                  this.genericSetter(this.state.dependencies, "dependencies")}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.state.loaded &&
                  this.genericSetter(this.state.reverseproxy, "reverseproxy")}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.state.loaded &&
                  this.genericSetter(this.state.storage, "storage")}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h4" color="red" textAlign="center">
                  Custom
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.state.loaded &&
                  this.genericSetter(this.state.mpkg, "mpkg")}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
  componentWillMount() {
    api.trigger(this.state.environment, "status", this.triggerResponse);
  }
}

export default AllStatusViewer;
