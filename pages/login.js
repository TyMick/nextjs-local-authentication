"use strict";

import React from "react";
import "../styles.scss";

import Layout from "../components/layout";
import Container from "react-bootstrap/Container";
import LoginForm from "../components/login-form";

export default () => (  
  <Layout title="Login">
    <Container>
      <LoginForm />
    </Container>
  </Layout>
);
