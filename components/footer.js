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

import React from "react";
import { Container, Row } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={
          "mt-auto footer" + (this.props.default ? " footer-default" : "")
        }
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="#">Link one</a>
                </li>
                <li>
                  <a href="#">Link two</a>
                </li>
                <li>
                  <a href="#">Link three</a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <div className="copyright">
                &copy; {new Date().getFullYear()} Tyler Westin Mick
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
