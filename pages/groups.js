"use strict";

import React from "react";
import Layout from "../components/layout";
import "../styles.scss";
import { withAuthSync } from "../utils/auth";

const Groups = () => (
  <Layout title="Groups">
    
  </Layout>
);

export default withAuthSync(Groups);
