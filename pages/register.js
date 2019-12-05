"use strict";

import React from "react";
import "../styles.scss";

import PageLayout from "../components/page-layout";
import Container from "react-bootstrap/Container";
import RegistrationForm from "../components/registration-form";

export default () => (  
  <PageLayout title="Login">
    <Container>
      <RegistrationForm />
    </Container>
  </PageLayout>
);
