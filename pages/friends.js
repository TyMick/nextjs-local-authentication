"use strict";

import React from "react";
import Layout from "../components/layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Friends = () => (
  <Layout title="Friends">
    
  </Layout>
);

export default withAuthSync(Friends);
