import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import Menu from "../menu/menu";
// import HomeView from "../components/views/Home/Home";
// import VideoView from "../components/views/Video/Video";
// import PlaylistView from "../components/views/Playlist/Playlist";
// import PublishersView from "../components/views/Publishers/Publishers";
// import SettingsView from "../components/views/Settings/Settings";
// import SingleView from "../components/views/Single/Single";
// import NotFoundView from "../components/views/NotFound/NotFound";
// import UserController from "../components/widgets/userController";
import { Container, Header, Input, Button } from "semantic-ui-react";
import "./dashboard.css";

export class Dashboard extends Component {
  renderDashboard = () => {
    return (
      <div className="dashboard">
        <h1>In Dashboard</h1>
        {/* <div className="top">
          <header>
            <ul>
              <li>
                <div
                  className="header-logo"
                  onMouseOver={eggOn}
                  onMouseOut={eggOff}
                >
                  <img
                    src={require("../img/logoIRCTV2.png")}
                    alt="logo"
                    id="mylogo"
                  />
                </div>
              </li>
              <li>
                <UserController />
              </li>
            </ul>
          </header>
        </div> */}
        {/* <div className="container">
          <div className="blue" tabIndex="-1" id="geg" />
          <div className="red" />
        </div> */}
        <div className="dashboard-content">
          <div className="left">{/* <Menu /> */}</div>
          <div className="right">
            {/* <Switch>
              <Route path="/" exact render={HomeView} />
              <Route path="/video" render={VideoView} />
              <Route path="/playlists" render={PlaylistView} />
              <Route path="/publishers" render={PublishersView} />
              <Route path="/settings" render={SettingsView} />
              <Route path="/player/:type/:id" render={SingleView} />
              <Route render={NotFoundView} />
            </Switch> */}
          </div>
        </div>
      </div>
    );
  };
}

export default Dashboard;
