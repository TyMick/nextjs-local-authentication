"use strict";

import React from "react";
import Layout from "../components/layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Dashboard = () => (
  <Layout title="Dashboard">
    
  </Layout>
);

export default withAuthSync(Dashboard);
