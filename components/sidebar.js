"use strict";

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Nav } from "reactstrap";

function Sidebar(props) {
  const router = useRouter();

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
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
          {props.routes.map((route, key) => {
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

export default Sidebar;
