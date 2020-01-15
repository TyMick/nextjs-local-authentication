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
import { useRouter } from "next/router";
import Link from "next/link";
import { Nav } from "reactstrap";

export default ({ bgColor, activeColor, routes }) => {
  const router = useRouter();

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.pathname === routeName ? "active" : "";
  }

  return (
    <div
      className="sidebar"
      data-color={bgColor}
      data-active-color={activeColor}
    >
      <div className="logo">
        <a href="#" className="simple-text logo-mini">
          <div className="logo-img">
            <img src="/apple-touch-icon.png" alt="Stars Align logo" />
          </div>
        </a>
        <a href="#" className="simple-text logo-normal">
          Stars Align
        </a>
      </div>
      <div className="sidebar-wrapper">
        <Nav>
          {routes.map((route, key) => {
            return (
              <li className={activeRoute(route.path)} key={key}>
                <Link href={route.path}>
                  <a className={"nav-link " + activeRoute(route.path)}>
                    <i className={route.icon} />
                    {route.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}
