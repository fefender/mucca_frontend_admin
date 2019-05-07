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

const options = [
  { key: "string", text: "string", value: "string" },
  { key: "int", text: "int", value: "int" },
  { key: "boolean", text: "boolean", value: "boolean" }
];

class AddService extends Component {
  state = {
    active0: true,
    duration: 200,
    count: 0,
    sName: "",
    sOwner: "",
    pName: "",
    pType: "",
    value: "3",
    valueOw: "3",
    pRequired: true,
    pUnicIndx: false,
    obj: {},
    userEnv: cookies.get("userEnv"),
    modalOpen: false
  };

  //Visibility Handlers
  handleClick0 = e => {
    this.setState({
      active0: !this.state.active0
    });
  };
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
    window.location.reload();
  };

  //inputs hanlders
  typeHandler = (event, { value }) => {
    this.setState({ pType: value });
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleIndx = (e, { value }) => {
    this.setState({ value: value });
    if (value === "1") {
      this.setState({ pUnicIndx: true });
    } else {
      this.setState({ pUnicIndx: false });
    }
  };

  handleOwn = (e, { value }) => {
    this.setState({ valueOw: value, sOwner: value });
  };

  //Sets model
  propertyObj = () => {
    let obj = {
      required: [],
      modelname: "",
      properties: {},
      uniqueindex: []
    };
    this.setState({ obj: obj });
  };

  //Adds new property to model
  addProperty = e => {
    let prev = this.state.obj;
    let sName = this.state.sName;
    let pName = this.state.pName;
    let prevReq = prev.required;
    let prevProp = prev.properties;
    let prevIndx = prev.uniqueindex;
    // if (this.state.pRequired) {
    prevReq.push(this.state.pName);
    // }
    if (this.state.pUnicIndx) {
      prevIndx.push(this.state.pName);
    }
    if (this.state.pName && this.state.pType) {
      let uno = {
        bsonType: this.state.pType,
        description: pName
      };
      let prp = { [pName]: uno };
      Object.assign(prevProp, prp);
    }
    let newObj = {
      required: prevReq,
      modelname: sName,
      properties: prevProp,
      uniqueindex: prevIndx
    };
    this.setState({
      obj: newObj,
      pName: "",
      pType: "",
      value: "3",
      pRequired: true,
      pUnicIndx: false,
      count: this.state.count + 1
    });
  };

  //Add new model in view
  checkArray = val => {
    for (let x in this.state.obj.uniqueindex) {
      if (val === this.state.obj.uniqueindex[x]) {
        return true;
      }
    }
    return false;
  };
  generateProp = () => {
    const content = [];
    let obj = this.state.obj;
    let name = "";
    let type = "";
    let required = false;
    let unicIndx = false;
    let count = 0;
    console.log("***", obj.properties);
    for (let x in obj.properties) {
      unicIndx = this.checkArray(obj.properties[x].description);

      let form = (
        <Container fluid color="red">
          {/* <br /> */}
          <Header as="h4" color="red" className="servTitle">
            <Icon name="folder open" />
            {x}
          </Header>
          <p>
            {" "}
            <strong>Name: </strong>
            {obj.properties[x].description}
          </p>
          <p>
            {" "}
            <strong>Type: </strong>
            {obj.properties[x].bsonType}
          </p>
          <p>
            {" "}
            <strong>Unique Index: </strong>
            {unicIndx ? "Yes" : "No"}
          </p>
        </Container>
      );
      content.push(form);
      count++;
    }
    return content.map((value, ind) => (
      <Card fluid key={ind}>
        {value}
      </Card>
    ));
  };

  //Send new model
  submitModel = () => {
    // let env = Promise.resolve(cookies.get("userEnv")).then(
    api.create(
      this.state.userEnv,
      "model",
      this.state.sName,
      this.state.obj,
      this.createResponse
    );
    // );
  };

  createResponse = res => {
    if (res && res.status === 201) {
      console.log(res.status);
      this.updateConfig();
    }
  };
  //Send new config
  updateConfig = () => {
    let config = {
      datamodel: true,
      ownerfilter: this.state.sOwner,
      modelname: this.state.sName
    };
    api.create(
      this.state.userEnv,
      "config",
      "mpkg",
      config,
      this.configResponse
    );
  };

  configResponse = res => {
    if (res && res.status === 201) {
      console.log(res.status);
      this.setState({ modalOpen: true });
    }
  };

  render() {
    return (
      <div>
        <Accordion exclusive={false}>
          <Accordion.Title onClick={this.handleClick0}>
            <Header as="h3" color="green">
              Add New Service
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
              <Segment color="green">
                <Header as="h4"> Service Info:</Header>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Service name"
                      placeholder="Service name"
                      name="sName"
                      onChange={this.handleChange}
                      // required
                    />
                  </Form.Group>
                  <Form.Group inline>
                    <label>Service Visibility:</label>
                    <Form.Field
                      control={Radio}
                      label="Owner Only"
                      value="1"
                      checked={this.state.valueOw === "1"}
                      onChange={this.handleOwn}
                    />
                    <Form.Field
                      control={Radio}
                      label="Public"
                      value="0"
                      checked={this.state.valueOw === "0"}
                      onChange={this.handleOwn}
                    />
                  </Form.Group>
                  <Header as="h4"> Add Properties:</Header>
                  <Segment>
                    <Form.Group widths="equal">
                      <Form.Input
                        label="Property Name"
                        placeholder="Property name"
                        name="pName"
                        value={this.state.pName}
                        onChange={this.handleChange}
                        // required
                      />
                      <Form.Select
                        fluid
                        label="Property type"
                        options={options}
                        value={this.state.pType}
                        placeholder="Property type"
                        onChange={this.typeHandler}
                      />
                    </Form.Group>
                    <Form.Group inline>
                      <label>Unique Index</label>
                      <Form.Field
                        control={Radio}
                        label="Yes"
                        value="1"
                        checked={this.state.value === "1"}
                        onChange={this.handleIndx}
                      />
                      <Form.Field
                        control={Radio}
                        label="No"
                        value="2"
                        checked={this.state.value === "2"}
                        onChange={this.handleIndx}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      basic
                      color="violet"
                      // compact
                      onClick={this.addProperty}
                    >
                      Add
                    </Button>
                  </Segment>
                  <Header as="h4"> Properties Added:</Header>
                  <Segment color="red">
                    <Card.Group itemsPerRow={3}>
                      {this.generateProp()}
                      <br />
                    </Card.Group>
                    <br />
                    {this.state.count > 0 && (
                      <Button
                        type="submit"
                        basic
                        fluid
                        color="violet"
                        // compact
                        onClick={this.submitModel}
                      >
                        Create MicroService
                      </Button>
                    )}
                  </Segment>
                </Form>
              </Segment>
            </Accordion.Content>
          </Transition>
        </Accordion>
        <Modal
          // trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
          dimmer="inverted"
        >
          <Header icon="browser" content="Great!" />
          <Modal.Content>
            <h3>Your new microservice has been created.</h3>
            <h3>
              {" "}
              If you're done click on "build" to compose your application, if
              not continue adding more microservices
            </h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
  componentWillMount() {
    console.log("will mount");
    this.propertyObj();
  }
}

export default AddService;
