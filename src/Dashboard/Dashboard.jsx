import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  Header,
  Grid,
  Icon,
  Container,
  Button,
  Input
} from "semantic-ui-react";
import LeftMenu from "../Components/Sections/LeftMenu";
import HomeView from "../Components/Views/HomeView";
// import VideoView from "../components/views/Video/Video";
// import PlaylistView from "../components/views/Playlist/Playlist";
// import PublishersView from "../components/views/Publishers/Publishers";
import SettingsView from "../Components/Views/SettingsView";
// import SingleView from "../components/views/Single/Single";
// import NotFoundView from "../components/views/NotFound/NotFound";
// import UserController from "../components/widgets/userController";
import TopControl from "../Components/Sections/TopControl";
import "./dashboard.css";

export class Dashboard extends Component {
  renderDashboard = () => {
    return (
      <div className="dashboard">
        {/* <Header as="h2" color="grey" dividing>
          Mucca Admin Dashboard
        </Header> */}
        <LeftMenu />
        <TopControl />
        <div className="dashboard-content">
          <Grid container columns="equal">
            {/* <Grid.Column floated="left">
              <LeftMenu />
            </Grid.Column> */}
            <Grid.Column>
              <Switch>
                <Route path="/" exact render={HomeView} />
                {/* <Route path="/video" render={VideoView} />
              <Route path="/playlists" render={PlaylistView} />
              <Route path="/publishers" render={PublishersView} /> */}
                <Route path="/settings" render={SettingsView} />
                {/* <Route path="/player/:type/:id" render={SingleView} />
              <Route path="/logout" render={LogoutView} />
              <Route render={NotFoundView} /> */}
              </Switch>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  };
}

export default Dashboard;
