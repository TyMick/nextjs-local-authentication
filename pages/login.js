"use strict";

import React from "react";
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
  Row
} from "reactstrap";
import LoginLayout from "../components/login-layout";
import { Formik } from "formik";
import * as Yup from "yup";
import fetch from "isomorphic-unfetch";
import { login } from "../utils/auth";

import "../styles.scss";

export default () => (
  <LoginLayout pageTitle="Login">
    <Formik
      initialValues={{ username: "", password: "", remember: false }}
      validationSchema={Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required(),
        remember: Yup.boolean()
      })}
      onSubmit={async values => {
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
            <Label for="username" className="text-dark">Username</Label>
            <Input
              name="username"
              id="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              invalid={formik.touched.username && !!formik.errors.username}
            />
            <FormFeedback>
              {formik.errors.username}
            </FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="password" className="text-dark">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              invalid={formik.touched.password && !!formik.errors.password}
            />
            <FormFeedback>
              {formik.errors.password}
            </FormFeedback>
          </FormGroup>

          <FormGroup>
            <Input
              name="remember"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.retypePassword}
              invalid={
                formik.touched.retypePassword &&
                formik.values.retypePassword != formik.values.password
              }
            />
            <Label for="remember" className="text-dark">Remember me</Label>
          </FormGroup>

          <Row>
            <div className="update ml-auto mr-auto">
              <Button className="btn-round" color="primary" type="submit">
                Register
              </Button>
            </div>
          </Row>
        </Form>
      )}
    </Formik>
  </LoginLayout>
);
