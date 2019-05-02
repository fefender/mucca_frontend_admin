import React, { Component } from "react";
import Cookies from "universal-cookie";
import {
  Image,
  Input,
  Button,
  Icon,
  Grid,
  Container,
  Select,
  Header
} from "semantic-ui-react";

const cookies = new Cookies();
const options = [
  { key: "develop", text: "develop", value: "develop" },
  { key: "production", text: "production", value: "production" },
  { key: "stage", text: "stage", value: "stage" }
];

class TopControl extends Component {
  state = {
    environment: cookies.get("userEnv")
  };

  envHandler = (event, { value }) => {
    this.setState({ environment: value });
  };

  changeEnv = e => {
    cookies.remove("userEnv");
    return cookies.set("userEnv", this.state.environment);
  };

  render() {
    return (
      <div className="topcontrol">
        <Grid columns={3}>
          <Grid.Row floated="right">
            <Grid.Column>
              <Container />
            </Grid.Column>
            <Grid.Column>
              <Button.Group icon compact>
                <Button inverted size="small">
                  <span className="btnlabel">Start </span>
                  <Icon name="play" circular color="violet" size="small" />
                </Button>
                <span className="buttondivider" />
                <Button inverted size="small">
                  <span className="btnlabel">Stop </span>

                  <Icon name="pause" circular color="violet" size="small" />
                </Button>
              </Button.Group>
              <Select
                floated="right"
                size="mini"
                options={options}
                defaultValue={this.state.environment}
                onChange={this.envHandler}
              />
              <span className="spazio" />
              <Button
                type="submit"
                basic
                color="violet"
                // compact
                onClick={this.changeEnv}
              >
                ok
              </Button>
            </Grid.Column>
            <Grid.Column floated="right">
              <Container />
              {/* <Button.Group icon compact>
                <Button inverted size="small">
                  <span className="btnlabel">Start </span>
                  <Icon name="play" circular color="violet" size="small" />
                </Button>
                <span className="buttondivider" />
                <Button inverted size="small">
                  <span className="btnlabel">Stop </span>

                  <Icon name="pause" circular color="violet" size="small" />
                </Button>
              </Button.Group>
              <Select
                floated="right"
                size="mini"
                options={options}
                defaultValue={this.state.environment}
                onChange={this.envHandler}
              />
              <Button
                type="submit"
                color="violet"
                compact
                onClick={this.changeEnv}
              >
                ok
              </Button> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default TopControl;
