import React from "react";
import AppConfig from "../Sections/AppConfig";
import { Message, Icon, Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

let tok = cookies.get("userToken");
let key = cookies.get("userKey");

const LogoutView = () => {
  return (
    <div className="logout">
      <Container>
        <Message positive>
          <Message.Header>Successfully Logged Out!</Message.Header>
        </Message>
      </Container>
      {/* {tok === undefined && key === undefined && (
        <Redirect from="/logout" to="/" />
      )} */}
      <Redirect from="/logout" to="/" path="/" />
    </div>
  );
};

export default LogoutView;
