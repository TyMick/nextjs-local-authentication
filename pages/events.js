"use strict";

import React from "react";
import Layout from "../components/layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Events = () => (
  <Layout pageTitle="Events">
    
  </Layout>
);

export default withAuthSync(Events);
