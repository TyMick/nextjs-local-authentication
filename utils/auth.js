"use strict";

import Cookies from "js-cookie";
import Router from "next/router";

export const login = ({ token }, remember) => {
  remember
    ? Cookies.set("token", token, { expires: 14 }) // Consider setting Secure attribute here
    : Cookies.set("token", token);
  Router.push("/dashboard");
};

export const logout = () => {
  Cookies.remove("token");

  // Log out from all windows
  window.localStorage.setItem("logout", Date.now());

  Router.push("/login");
};
