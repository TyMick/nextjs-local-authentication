"use strict";

import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import Head from "next/head";
import { Card } from "reactstrap";
import Footer from "./footer";

let ps;

class LoginLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info"
    };
    this.mainPanel = React.createRef();
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  // MAKE SURE LINKS ALWAYS SCROLL TO TOP IN ALL PANELS BEFORE DELETING
  // Below function is from paper-dashboard but isn't compatible with my routing
  // Next.js <Link> *should* take care of scrolling, though https://nextjs.org/docs#disabling-the-scroll-changes-to-top-on-page
  // componentDidUpdate(e) {
  //   if (e.history.action === "PUSH") {
  //     this.mainPanel.current.scrollTop = 0;
  //     document.scrollingElement.scrollTop = 0;
  //   }
  // }

  render() {
    return (
      <div className="wrapper">
        <Head>
          <title>{"Stars Align" + (this.props.pageTitle && " – " + this.props.pageTitle)}</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
        
        <div className="bg-dark text-light d-flex flex-column min-vh-100" ref={this.mainPanel}>
          <div className="h1 py-5 mx-auto">&#x1F320; Stars Align</div>
          <Card className="flex-grow-0 p-3 mx-auto">
            {this.props.children}
          </Card>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default LoginLayout;
