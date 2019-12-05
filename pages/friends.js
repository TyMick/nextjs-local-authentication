"use strict";

import React from "react";
import PageLayout from "../components/page-layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Friends = () => (
  <PageLayout title="Friends">
    
  </PageLayout>
);

export default withAuthSync(Friends);
