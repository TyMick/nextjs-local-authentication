"use strict";

import React from "react";
import PageLayout from "../components/page-layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Groups = () => (
  <PageLayout title="Groups">
    
  </PageLayout>
);

export default withAuthSync(Groups);
