import React, { Component } from "react";
import { Image, Input, Button, Icon, Grid, Container } from "semantic-ui-react";

class TopControl extends Component {
  state = {
    environment: ""
  };

  envHandler = event => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
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
              <Container />
            </Grid.Column>
            <Grid.Column floated="right">
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
              <Input
                floated="right"
                size="mini"
                list="environment"
                placeholder="Environment..."
                name="environment"
                value={this.state.environment}
                onChange={this.envHandler}
              />
              <datalist id="environment">
                <option value="develop" />
                <option value="production" />
                <option value="stage" />
              </datalist>
              <Button type="submit" color="violet" compact>
                ok
              </Button>
              {/* </Input> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default TopControl;
