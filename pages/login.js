"use strict";

import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
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
  const [networkErrors, setNetworkErrors] = useState(false);

  return (
    <LoginLayout pageTitle="Login">
      <Formik
        initialValues={{ username: "", password: "", remember: false }}
        validationSchema={Yup.object({
          username: Yup.string().required("Do not display this error message"),
          password: Yup.string().required("Do not display this error message"),
          remember: Yup.boolean()
        })}
        onSubmit={async (values, { setFieldError }) => {
          setNetworkErrors(false);
          setLoading(true);

          try {
            const response = await fetch("/api/login", {
              method: "POST",
              headhers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: values.username,
                password: values.password
              })
            });
            if (response.status === 200) {
              const { token } = await response.json();
              login({ token }, values.remember);
            } else if (response.status === 404) {
              setFieldError("username", "No such user exists.");
            } else if (response.status === 401) {
              setFieldError("password", "Incorrect password.");
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
            setNetworkErrors(true);
          }

          setLoading(false);
        }}
      >
        {formik => (
          <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="mx-auto"
          >
            <FormGroup>
              <Label for="username">Username</Label>
              <InputGroup className="mb-0">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id="at-sign">@</InputGroupText>
                </InputGroupAddon>
                <Input
                  name="username"
                  id="username"
                  aria-describedby="at-sign"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  invalid={formik.touched.username && !!formik.errors.username}
                />
                {formik.errors.username !==
                  "Do not display this error message" && (
                  <FormFeedback>{formik.errors.username}</FormFeedback>
                )}
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                invalid={formik.touched.password && !!formik.errors.password}
              />
              {formik.errors.password !==
                "Do not display this error message" && (
                <FormFeedback>{formik.errors.password}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup check>
              <Label check>
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
              <div className="update mx-auto">
                <Button
                  className="btn-round"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Log in"}
                </Button>
              </div>
            </Row>

            {networkErrors && (
              <Row>
                <div className="mx-auto text-danger">
                  One of us is experiencing network errors 😞
                </div>
              </Row>
            )}

            <Row>
              <div className="update mx-auto mb-2">
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
