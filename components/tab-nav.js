"use strict";

import React from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";

const links = ["Dashboard", "Events", "Friends", "Groups", "Settings"];

export default props => (
  <Nav variant="tabs" activeKey={"/" + props.active}>
    {links.map(link => (
      <Link href={"/" + link.toLowerCase()} passHref key={link.toLowerCase()}>
        <Nav.Link>{link}</Nav.Link>
      </Link>
    ))}
  </Nav>
);
