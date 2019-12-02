"use strict";

import React from "react";
import "../styles.scss";

import PageLayout from "../components/page-layout";
import Container from "react-bootstrap/Container";
import LoginForm from "../components/login-form";

export default () => (  
  <PageLayout title="Login">
    <Container>
      <LoginForm />
    </Container>
  </PageLayout>
);
