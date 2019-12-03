"use strict";

import React from "react";
import PageLayout from "../components/page-layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Dashboard = () => (
  <PageLayout title="Dashboard">
    
  </PageLayout>
);

export default withAuthSync(Dashboard);
