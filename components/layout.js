"use strict";

import React, { useState } from "react";

import Head from "next/head";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Footer from "./footer";

import routes from "../utils/routes";

function Layout(props) {
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [activeColor, setActiveColor] = useState("info");

  return (
    <div className="wrapper">
      <Head>
        <title>
          {"Stars Align" + (props.pageTitle && " – " + props.pageTitle)}
        </title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        />
      </Head>

      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel d-flex flex-column min-vh-100">
        <Navbar {...props} />
        {props.children}
        <Footer fluid />
      </div>
    </div>
  );
}

export default Layout;
