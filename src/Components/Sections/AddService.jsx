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
  Radio
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
    value: false,
    count: 5
  };

  //Segment Visibility Handlers
  handleClick0 = e => {
    this.setState({
      active0: !this.state.active0
    });
  };

  generateProp = () => {
    // da utilizzare per visualizzare le proprietà salvate
    const content = [];
    let form = (
      <Segment>
        <Form.Group widths="equal">
          <Form.Input
            label="Property Name"
            placeholder="Property name"
            required
          />
          <Form.Select
            fluid
            label="Property type"
            options={options}
            placeholder="Gender"
          />
        </Form.Group>
        <Form.Group inline>
          <label>Required</label>
          <Form.Field
            control={Radio}
            label="Yes"
            value="1"
            checked={this.state.value === "1"}
            // onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label="No"
            value="2"
            checked={this.state.value === "2"}
            // onChange={this.handleChange}
          />
        </Form.Group>
      </Segment>
    );

    for (let x = 0; x < this.state.count; x++) {
      content.push(form);
      console.log(content);
    }
    return content.map((value, ind) => <Segment key={ind}>{value}</Segment>);
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
                      required
                    />
                  </Form.Group>
                  <Header as="h4"> Add Properties:</Header>
                  <Segment>
                    <Form.Group widths="equal">
                      <Form.Input
                        label="Property Name"
                        placeholder="Property name"
                        required
                      />
                      <Form.Select
                        fluid
                        label="Property type"
                        options={options}
                        placeholder="Gender"
                      />
                    </Form.Group>
                    <Form.Group inline>
                      <label>Required</label>
                      <Form.Field
                        control={Radio}
                        label="Yes"
                        value="1"
                        checked={this.state.value === "1"}
                        // onChange={this.handleChange}
                      />
                      <Form.Field
                        control={Radio}
                        label="No"
                        value="2"
                        checked={this.state.value === "2"}
                        // onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Segment>
                  {this.generateProp()}
                </Form>
              </Segment>
            </Accordion.Content>
          </Transition>
        </Accordion>
      </div>
    );
  }
}

export default AddService;
