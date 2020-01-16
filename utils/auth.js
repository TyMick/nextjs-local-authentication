/*
 *  This module has been adapted from the Next.js example app with-cookie-auth,
 *  by ZEIT, Inc.
 *    https://github.com/zeit/next.js/tree/canary/examples/with-cookie-auth
 */
"use strict";

import React, { useEffect } from "react";
import jsCookie from "js-cookie";
import Router from "next/router";
import nextCookies from "next-cookies";

export const login = ({ token }, remember) => {
  remember
    ? jsCookie.set("token", token, {
        expires: 14,
        secure: process.env.NODE_ENV === "production" ? true : false
      })
    : jsCookie.set("token", token, {
        secure: process.env.NODE_ENV === "production" ? true : false
      });
  Router.push("/dashboard");
};

export const logout = () => {
  jsCookie.remove("token");

  // Log out from all windows
  window.localStorage.setItem("logout", Date.now());

  Router.push("/login");
};

export const auth = ctx => {
  const { token } = nextCookies(ctx);

  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    } else {
      Router.push("/login");
    }
  }

  return token;
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
