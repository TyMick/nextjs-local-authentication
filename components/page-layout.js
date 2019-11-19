"use strict";

import Head from "next/head";
import Navbar from "./navbar";
import Container from "react-bootstrap/Container";
import TabNav from "./tab-nav";

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{"Stars Align" + (title && " | " + title)}</title>
    </Head>

    <header>
      <Navbar />
    </header>

    <main>
      <Container fluid className="pt-3">
        <TabNav active={title.toLowerCase()} />

        {children}
      </Container>
    </main>
  </div>
);
