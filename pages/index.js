"use strict";

import React from "react";
import Link from "next/link";
import { Container, Card } from "reactstrap";
import Layout from "../components/layout";
import "../styles.scss";

export default () => {
  return (
    <Layout pageTitle="">
      <div className="content">
        <Container>
          <Card body>
            <h1 className="h4 mt-2 mb-4">
              Next.js local authentication with MongoDB
            </h1>

            <p>Greetings, traveler!</p>
            <p>
              This is the beginning stages of an app I'm building. As long as
              the app itself is half-finished, I figure this shell is a
              satisfactory portfolio piece in the meantime. Please enjoy{" "}
              <a href="https://github.com/TyWMick/nextjs-local-authentication">
                the source code
              </a>{" "}
              on GitHub, and observe the following features:
            </p>

            <h2 className="h6">Pages</h2>
            <ul>
              <li>
                This demo consists of five pages: this index,{" "}
                <Link href="/dashboard">
                  <a>/dashboard</a>
                </Link>
                ,{" "}
                <Link href="/settings">
                  <a>/settings</a>
                </Link>
                ,{" "}
                <Link href="/register">
                  <a>/register</a>
                </Link>
                , and{" "}
                <Link href="/login">
                  <a>/login</a>
                </Link>
                .
              </li>
              <li>
                The dashboard and settings pages require aunthentication, so if
                you try to visit either before logging in, you'll be redirected
                to the login page.
              </li>
            </ul>

            <h2 className="h6">Accounts</h2>
            <ul>
              <li>
                You can{" "}
                <Link href="/register">
                  <a>register</a>
                </Link>{" "}
                with any username (that doesn't currently exist in the database)
                and password you like, and your credentials (after your password
                has been hashed with{" "}
                <a href="https://github.com/kelektiv/node.bcrypt.js">bcrypt</a>)
                will be stored in a database managed by{" "}
                <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>{" "}
                on a free plan.
              </li>
              <li>
                If you'd rather not create an account, you can instead{" "}
                <Link href="/login">
                  <a>log in</a>
                </Link>{" "}
                with username <code>ty</code> and password <code>password</code>{" "}
                (I promise I never use that in real life).
              </li>
              <li>
                Once you've logged in, the{" "}
                <Link href="/dashboard">
                  <a>dashboard page</a>
                </Link>{" "}
                isn't terribly interesting, but if you head on over to{" "}
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
                , you can change your username and/or password and even delete
                your account, which completely removes its database entry.
              </li>
              <li>
                If you try fiddling around with multiple accounts, you'll see
                that you can't register an account with a username that already
                exists, and you also can't change your username to that of
                another account.
              </li>
            </ul>

            <h2 className="h6">Cookies</h2>
            <ul>
              <li>
                Authentication and session information are facilitated by a
                browser cookie named "token", which you can see with your
                browser's web development tools. If you do not check the
                "remember me" box on the login page, this cookie will expire
                when you end your browser session (i.e., quit the browser
                program, not just close the tab or window). If you do check the
                box, this cookie will expire in two weeks.
              </li>
              <li>
                If you open the dashboard and/or settings pages in multiple
                browser tabs, when you log out in one tab (in the profile
                dropdown in the top-right of the page), you'll automatically be
                logged out of all other tabs.
              </li>
            </ul>

            <h2 className="h6">Design</h2>
            <ul>
              <li>
                The design of this demo comes from{" "}
                <a href="https://www.creative-tim.com/product/paper-dashboard-react">
                  Paper Dashboard React
                </a>
                , v1.1.0, by{" "}
                <a href="https://www.creative-tim.com/">Creative Tim</a>, but I
                did{" "}
                <a href="https://github.com/TyWMick/nextjs-local-authentication/blob/master/styles.scss">
                  fix several parts
                </a>{" "}
                I found ugly or unwieldy.
              </li>
              <li>
                Design work also involved the{" "}
                <a href="https://getbootstrap.com/">Bootstrap</a> library via{" "}
                <a href="https://reactstrap.github.io/">reactstrap</a>. I'll
                admit, I like{" "}
                <a href="https://react-bootstrap.netlify.com/">
                  React Bootstrap
                </a>{" "}
                better, but Paper Dashboard React already uses reactstrap in its
                template.
              </li>
            </ul>

            <h2 className="h6">Serverless functions</h2>
            <ul>
              <li>
                This demo's APIs (and server-rendered pages) are serverless
                functions created using{" "}
                <a href="https://nextjs.org/">Next.js</a> and hosted on{" "}
                <a href="https://zeit.co/">ZEIT Now</a>.
              </li>
            </ul>

            <p>Thanks for checking out this demo!</p>

            <p>
              Sincerely,
              <br />
              <a href="http://tymick.me">Ty</a>
            </p>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};
