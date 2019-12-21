"use strict";

import Head from "next/head";
import Navbar from "./navbar";
import Container from "react-bootstrap/Container";
import PageNav from "./page-nav";

export default ({ children, title }) => (
  <div className="bg-light">
    <Head>
      <title>{"Stars Align" + (title && " | " + title)}</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
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
