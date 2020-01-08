"use strict";

import React, { useState } from "react";
import { Container, Card, CardTitle, CardHeader, CardBody, Form } from "reactstrap";

import Layout from "../components/layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

function Settings() {
  const [loading, setLoading] = useState(false);

  return (
    <Layout pageTitle="Settings">
      <Container>
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">Edit profile</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>

            </Form>
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
}

export default withAuthSync(Settings);
