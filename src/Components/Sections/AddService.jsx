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
    pName: "",
    pType: "",
    value: "3",
    pRequired: false,
    obj: {}
  };

  //Segment Visibility Handlers
  handleClick0 = e => {
    this.setState({
      active0: !this.state.active0
    });
  };

  typeHandler = (event, { value }) => {
    console.log("TYPE", value);
    this.setState({ pType: value });
  };

  handleChange = (e, { name, value }) => {
    console.log("HANDLE CHANGE", name, value);
    this.setState({ [name]: value });
  };

  handleReq = (e, { value }) => {
    console.log("REQ", value);
    this.setState({ value: value });
    if (value === "1") {
      this.setState({ pRequired: true });
      console.log("VALUE IS 1");
    } else {
      this.setState({ pRequired: false });
      console.log("VALUE IS 2");
    }
  };

  propertyObj = () => {
    let obj = {
      required: [],
      modelname: "",
      properties: {}
    };
    this.setState({ obj: obj });
  };
  addProperty = e => {
    let prev = this.state.obj;
    let sName = this.state.sName;
    let pName = this.state.pName;
    let prevReq = prev.required;
    let prevProp = prev.properties;
    if (this.state.pRequired) {
      prevReq.push(this.state.pName);
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
      properties: prevProp
    };
    console.log("OBJ", this.state.obj);
    this.setState({
      obj: newObj,
      pName: "",
      pType: "",
      value: "3",
      pRequired: false,
      count: this.state.count + 1
    });
  };

  checkArray = val => {
    for (let x in this.state.obj.required) {
      if (val === this.state.obj.required[x]) {
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
    let count = 0;
    console.log("***", obj.properties);
    for (let x in obj.properties) {
      required = this.checkArray(obj.properties[x].description);

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
            <strong>Required: </strong>
            {required ? "Yes" : "No"}
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

  submitModel = () => {
    let env = Promise.resolve(cookies.get("userEnv")).then(
      api.create(
        "model",
        env,
        this.state.sName,
        this.state.obj,
        this.createResponse
      )
    );
  };

  createResponse = res => {
    if (res && res.status === 201) {
      console.log(res.status);
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
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Service name"
                      placeholder="Service name"
                      name="sName"
                      onChange={this.handleChange}
                      required
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
                        required
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
                      <label>Required</label>
                      <Form.Field
                        control={Radio}
                        label="Yes"
                        value="1"
                        checked={this.state.value === "1"}
                        onChange={this.handleReq}
                      />
                      <Form.Field
                        control={Radio}
                        label="No"
                        value="2"
                        checked={this.state.value === "2"}
                        onChange={this.handleReq}
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
                    {this.state.count > 1 && (
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
      </div>
    );
  }
  componentWillMount() {
    console.log("will mount");
    this.propertyObj();
  }
}

export default AddService;
