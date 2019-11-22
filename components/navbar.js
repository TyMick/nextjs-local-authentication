"use strict";

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

export default props => (
  <Navbar bg="dark" variant="dark" className="justify-content-between">
    <Navbar.Brand>&#x2728; Stars Align &#x2728;</Navbar.Brand>
    <Nav>
      <Link href="/login" passHref><Nav.Link>Login</Nav.Link></Link>
      <Nav.Link href="#">Logout</Nav.Link>
    </Nav>
  </Navbar>
);
