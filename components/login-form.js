"use strict";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import fetch from "isomorphic-unfetch";
import { login } from "../utils/auth";

export default () => {
  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "", remember: false }}
      validationSchema={Yup.object({
        usernameOrEmail: Yup.string().required(),
        password: Yup.string().required(),
        remember: Yup.boolean()
      })}
      onSubmit={async values => {
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
      }}
    >
      {formik => (
        <Form
          noValidate
          onSubmit={formik.handleSubmit}
          className="mx-auto"
          style={{ width: "100%", maxWidth: "420px" }}
        >
          <Form.Group controlId="usernameOrEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="usernameOrEmail"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              isInvalid={formik.touched.username && !!formik.errors.username}
            />
            {/* <Form.Control.Feedback type="invalid">
              {formik.errors.usernameOrEmail}
            </Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            {/* <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group>
            <Form.Check
              name="remember"
              id="remember"
              label="Remember me"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.remember}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form>
      )}
    </Formik>
  );
};
