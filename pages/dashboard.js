"use strict";

import React from "react";
import { Container } from "reactstrap";
import Layout from "../components/layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Dashboard = () => (
  <Layout pageTitle="Dashboard">
    <div className="content">
      <Container fluid>
        <div className="h4 text-center"><em>This page intentionally left blank.</em></div>
      </Container>
    </div>
  </Layout>
);

export default withAuthSync(Dashboard);
