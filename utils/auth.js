"use strict";

import Cookies from "js-cookie";
import Router from "next/router";

export const login = ({ token }, remember) => {
  remember
    ? Cookies.set("token", token, { expires: 14 })
    : Cookies.set("token", token);
  Router.push("/dashboard");
};
