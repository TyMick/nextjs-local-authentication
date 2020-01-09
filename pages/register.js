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

export default function Register() {
  const [loading, setLoading] = useState(false);

  return (
    <LoginLayout pageTitle="Register">
      <Formik
        initialValues={{ username: "", password: "", retypePassword: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .matches(
              /^\w+$/,
              "Usernames can only consist of letters, numbers, and underscores."
            )
            .required("Please choose a username."),
          password: Yup.string().required("Please choose a password."),
          retypePassword: Yup.string().required("Just to make sure.")
        })}
        onSubmit={async values => {
          if (values.password != values.retypePassword) {
            setFieldError(
              "retypePassword",
              "Oops, your passwords don't match!"
            );
          } else {
            setLoading(true);

            try {
              const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
              });
              if (response.status === 200) {
                const { token } = await response.json();
                login({ token }, false);
              } else if (response.status === 409) {
                setFieldError("username", "That username is already taken.");
              } else {
                console.log("Registration failed.");
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
              <Label for="username" className="text-dark">
                Username
              </Label>
              <InputGroup>
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
                <FormFeedback>{formik.errors.username}</FormFeedback>
              </InputGroup>
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
              <FormFeedback>{formik.errors.password}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="retypePassword" className="text-dark">
                Retype password
              </Label>
              <Input
                name="retypePassword"
                id="retypePassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.retypePassword}
                invalid={
                  formik.touched.retypePassword &&
                  formik.values.retypePassword != formik.values.password
                }
              />
              <FormFeedback>
                {formik.errors.retypePassword ||
                  "Oops, your passwords don't match!"}
              </FormFeedback>
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
                    Register
                  </Button>
                )}
              </div>
            </Row>

            <Row>
              <div className="update ml-auto mr-auto mb-2">
                Already have an account?{" "}
                <Link href="/login">
                  <a>Log in</a>
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
