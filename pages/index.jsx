"use strict";

import React from "react";
import Link from "next/link";
import { Container, Card } from "reactstrap";
import Layout from "../components/layout";
import Head from "next/head";

export default () => {
  return (
    <>
      {/* prettier-ignore */}
      <Head>
        <meta property="og:title" content="Next.js local authentication with MongoDB – Ty Mick" />
        <meta property="og:description" content="Next.js + MongoDB local authentication boilerplate employing serverless functions, hashing passwords with bcrypt, and implementing an open source Bootstrap/reactstrap dashboard design." />
        <meta property="og:image" content="https://nextjs-local-authentication.tymick.me/preview.png" />
        <meta property="og:url" content="https://nextjs-local-authentication.tymick.me/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Ty Mick" />
        <meta name="twitter:image:alt" content="A preview of the desktop version of this demo" />
        <meta name="twitter:site" content="@tywmick" />
      </Head>

      <Layout pageTitle="">
        <div className="content">
          <Container>
            <Card body>
              <h1 className="h4 mt-2 mb-4">
                Next.js local authentication with MongoDB
              </h1>

              <p>Greetings, traveler!</p>
              <p>
                This is the beginning stages of an app I&rsquo;m building. As
                long as the app itself is half-finished, I figure this shell is
                a satisfactory portfolio piece in the meantime. Please enjoy{" "}
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
                  The dashboard and settings pages require aunthentication, so
                  if you try to visit either before logging in, you&rsquo;ll be
                  redirected to the login page.
                </li>
              </ul>

              <h2 className="h6">Accounts</h2>
              <ul>
                <li>
                  You can{" "}
                  <Link href="/register">
                    <a>register</a>
                  </Link>{" "}
                  with any username (that doesn&rsquo;t currently exist in the
                  database) and password you like, and your credentials (after
                  your password has been hashed with{" "}
                  <a href="https://github.com/kelektiv/node.bcrypt.js">
                    bcrypt
                  </a>
                  ) will be stored in a database managed by{" "}
                  <a href="https://www.mongodb.com/cloud/atlas">
                    MongoDB Atlas
                  </a>{" "}
                  on a free plan.
                </li>
                <li>
                  If you&rsquo;d rather not create an account, you can instead{" "}
                  <Link href="/login">
                    <a>log in</a>
                  </Link>{" "}
                  with username <code>ty</code> and password{" "}
                  <code>password</code> (I promise I never use that in real
                  life).
                </li>
                <li>
                  Once you&rsquo;ve logged in, the{" "}
                  <Link href="/dashboard">
                    <a>dashboard page</a>
                  </Link>{" "}
                  isn&rsquo;t terribly interesting, but if you head on over to{" "}
                  <Link href="/settings">
                    <a>Settings</a>
                  </Link>
                  , you can change your username and/or password and even delete
                  your account, which completely removes its database entry.
                  Note, though, that you can do none of these things with the
                  demo <code>ty</code> account, for which the profile update and
                  delete account APIs will return <code>403</code> errors.
                </li>
                <li>
                  If you try fiddling around with multiple accounts,
                  you&rsquo;ll see that you can&rsquo;t register an account with
                  a username that already exists, and you also can&rsquo;t
                  change your username to that of another account.
                </li>
              </ul>

              <h2 className="h6">Cookies</h2>
              <ul>
                <li>
                  Authentication and session information are facilitated by a
                  browser cookie named &ldquo;token&rdquo;, which you can see
                  with your browser&rsquo;s web development tools. If you do not
                  check the &ldquo;remember me&rdquo; box on the login page,
                  this cookie will expire when you end your browser session
                  (i.e., quit the browser program, not just close the tab or
                  window). If you do check the box, this cookie will expire in
                  two weeks.
                </li>
                <li>
                  If you open the dashboard and/or settings pages in multiple
                  browser tabs, when you log out in one tab (in the profile
                  dropdown in the top-right of the page), you&rsquo;ll
                  automatically be logged out of all other tabs.
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
                  <a href="https://www.creative-tim.com/">Creative Tim</a>, but
                  I did{" "}
                  <a href="https://github.com/TyWMick/nextjs-local-authentication/blob/master/styles.scss">
                    fix several parts
                  </a>{" "}
                  I found ugly or unwieldy.
                </li>
                <li>
                  Design work also involved the{" "}
                  <a href="https://getbootstrap.com/">Bootstrap</a> library via{" "}
                  <a href="https://reactstrap.github.io/">reactstrap</a>.
                  I&rsquo;ll admit, I like{" "}
                  <a href="https://react-bootstrap.netlify.com/">
                    React Bootstrap
                  </a>{" "}
                  better, but Paper Dashboard React already uses reactstrap in
                  its template.
                </li>
              </ul>

              <h2 className="h6">Serverless functions</h2>
              <ul>
                <li>
                  This demo&rsquo;s APIs (and server-rendered pages) are
                  serverless functions created using{" "}
                  <a href="https://nextjs.org/">Next.js</a> and hosted on{" "}
                  <a href="https://vercel.com/">Vercel</a>.
                </li>
              </ul>

              <p>Thanks for checking out this demo!</p>

              <p>Sincerely,</p>
              <div className="signature">
                <a href="http://tymick.me">Ty</a>
              </div>
            </Card>
          </Container>
        </div>
      </Layout>
    </>
  );
};
