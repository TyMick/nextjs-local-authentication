"use strict";

import React from "react";
import PageLayout from "../components/page-layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Events = () => (
  <PageLayout title="Events">
    
  </PageLayout>
);

export default withAuthSync(Events);
