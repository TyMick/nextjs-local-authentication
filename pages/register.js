"use strict";

import React from "react";
import "../styles.scss";

import Layout from "../components/layout";
import Container from "react-bootstrap/Container";
import RegistrationForm from "../components/registration-form";

export default () => (  
  <Layout title="Login">
    <Container>
      <RegistrationForm />
    </Container>
  </Layout>
);
