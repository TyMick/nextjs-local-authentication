/*

This component has been adapted from Paper Dashboard React, v1.1.0, by Creative Tim.

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
          {"Next.js local authentication" + (props.pageTitle && " – " + props.pageTitle)}
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
