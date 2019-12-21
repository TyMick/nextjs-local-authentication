"use strict";

import React from "react";
import Link from "next/link";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

let ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="#"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src="/apple-touch-icon.png" alt="Stars Align logo" />
            </div>
          </a>
          <a
            href="#"
            className="simple-text logo-normal"
          >
            Stars Align
          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((route, key) => {
              return (
                <li
                  className={this.activeRoute(route.path)}
                  key={key}
                >
                  <Link
                    href={route.path}
                    className={"nav-link " + this.activeRoute(route.path)}
                  >
                    <a><i className={prop.icon} />{prop.name}</a>
                  </Link>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
