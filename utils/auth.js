"use strict";

import Cookies from "js-cookie";
import Router from "next/router";

export const login = ({ token }) => {
  Cookies.set("token", token);
  Router.push("/dashboard");
};
