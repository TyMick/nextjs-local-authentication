"use strict";

import React from "react";
import PageLayout from "../components/page-layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Settings = () => (
  <PageLayout title="Settings">
    
  </PageLayout>
);

export default withAuthSync(Settings);
