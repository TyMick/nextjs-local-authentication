"use strict";

import Head from "next/head";
import Navbar from "./navbar";
import Container from "react-bootstrap/Container";
import PageNav from "./page-nav";

export default ({ children, title }) => (
  <div className="bg-light">
    <Head>
      <title>{"Stars Align" + (title && " | " + title)}</title>
    </Head>

    <header>
      <Navbar />
    </header>

    <main>
      <PageNav active={title.toLowerCase()} />

      {children}
    </main>
  </div>
);
