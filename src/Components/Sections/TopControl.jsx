import React, { Component } from "react";
import Cookies from "universal-cookie";
import {
  Modal,
  Input,
  Button,
  Icon,
  Grid,
  Container,
  Select,
  Header
} from "semantic-ui-react";
import LoginView from "../../Login/LoginView";

const cookies = new Cookies();
const options = [
  { key: "develop", text: "develop", value: "develop" },
  { key: "production", text: "production", value: "production" },
  { key: "stage", text: "stage", value: "stage" }
];

class TopControl extends Component {
  state = {
    environment: cookies.get("userEnv"),
    modalOpen: false,
    errOpen: false
  };

  envHandler = (event, { value }) => {
    this.setState({ environment: value });
  };

  changeEnv = e => {
    cookies.remove("userEnv");
    cookies.set("userEnv", this.state.environment);
    return window.location.reload();
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false, errOpen: false });

  handleOpenErr = () => this.setState({ errOpen: true });

  handleCloseErr = () => this.setState({ errOpen: false });

  checkStatus = res => {
    if (res) {
      this.changeEnv();
    } else {
      this.setState({ errOpen: true });
    }
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
                // onClick={this.changeEnv}
                onClick={this.handleOpen}
              >
                ok
              </Button>
            </Grid.Column>
            <Grid.Column floated="right">
              <Container />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
          dimmer="blurring"
        >
          <Modal.Content>
            {this.state.errOpen ? (
              <Container className="loginEnv">
                <Header
                  icon="warning sign"
                  content="Incorrect username or password"
                  color="red"
                  textAlign="center"
                />
              </Container>
            ) : (
              <LoginView
                status={this.checkStatus}
                env={this.state.environment}
              />
            )}
            {/* <LoginView status={this.checkStatus} env={this.state.environment} /> */}
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.handleClose}>
              <Icon name="remove" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
        {/* <Modal
          open={this.state.modalOpenErr}
          onClose={this.handleCloseErr}
          basic
          size="small"
          dimmer="blurring"
        >
          <Modal.Content>
            <Header
              icon="warning sign"
              content="Incorrect username or password"
              color="red"
              textAlign="center"
            />
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.handleCloseErr}>
              <Icon name="remove" /> Close
            </Button>
          </Modal.Actions>
        </Modal> */}
      </div>
    );
  }
}

export default TopControl;
