"use strict";

import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import "../styles.scss";

export default () => {
  const router = useRouter();
  return (
    <Layout pageTitle="">
      <div className="content">
        {router.pathname}
      </div>
    </Layout>
  );
};
