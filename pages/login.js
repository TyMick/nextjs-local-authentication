"use strict";

import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
  Row,
  Spinner
} from "reactstrap";
import Link from "next/link";
import LoginLayout from "../components/login-layout";
import { Formik } from "formik";
import * as Yup from "yup";
import fetch from "isomorphic-unfetch";
import { login } from "../utils/auth";

import "../styles.scss";

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <LoginLayout pageTitle="Login">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "", remember: false }}
        validationSchema={Yup.object({
          usernameOrEmail: Yup.string().required(),
          password: Yup.string().required(),
          remember: Yup.boolean()
        })}
        onSubmit={async values => {
          setLoading(true);

          try {
            const response = await fetch("/api/login", {
              method: "POST",
              headhers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                usernameOrEmail: values.usernameOrEmail,
                password: values.password
              })
            });
            if (response.status === 200) {
              const { token } = await response.json();
              login({ token }, values.remember);
            } else {
              console.log("Login failed.");
              // https://github.com/developit/unfetch#caveats
              let error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
          } catch (err) {
            console.error(
              "You have an error in your code or there are network issues.",
              err
            );
          }

          setLoading(false);
        }}
      >
        {formik => (
          <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="mx-auto"
            style={{ width: "420px" }}
          >
            <FormGroup>
              <Label for="usernameOrEmail" className="text-dark">
                Username or email
              </Label>
              <Input
                name="usernameOrEmail"
                id="usernameOrEmail"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usernameOrEmail}
                invalid={
                  formik.touched.usernameOrEmail &&
                  !!formik.errors.usernameOrEmail
                }
              />
            </FormGroup>

            <FormGroup>
              <Label for="password" className="text-dark">
                Password
              </Label>
              <Input
                name="password"
                id="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                invalid={formik.touched.password && !!formik.errors.password}
              />
            </FormGroup>

            <FormGroup check>
              <Label check className="text-dark">
                <Input
                  name="remember"
                  type="checkbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remember}
                />{" "}
                Remember me
              </Label>
            </FormGroup>

            <Row>
              <div className="update ml-auto mr-auto">
                {loading ? (
                  <Button
                    className="btn-round"
                    color="primary"
                    type="submit"
                    disabled
                  >
                    <Spinner size="sm" />
                  </Button>
                ) : (
                  <Button className="btn-round" color="primary" type="submit">
                    Log in
                  </Button>
                )}
              </div>
            </Row>

            <Row>
              <div className="update ml-auto mr-auto mb-2">
                Don't have an account yet?{" "}
                <Link href="/register">
                  <a>Register</a>
                </Link>
                .
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </LoginLayout>
  );
}
