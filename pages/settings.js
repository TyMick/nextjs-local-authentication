"use strict";

import React, { useState } from "react";
import {
  Container,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormFeedback,
  FormText,
  Spinner
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import nextCookie from "next-cookies";
import fetch from "isomorphic-unfetch";

import Layout from "../components/layout";
import "../styles.scss";
import { withAuthSync, logout } from "../utils/auth";

function Settings(props) {
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);

  return (
    <Layout pageTitle="Settings">
      <Container>
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">Edit profile</CardTitle>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{
                username: props.data.username,
                newPassword: "",
                confirmNewPassword: ""
              }}
              validationSchema={Yup.object({
                username: Yup.string().matches(
                  /^\w+$/,
                  "Usernames can only consist of letters, numbers, and underscores."
                )
                .required("You need a username."),
                newPassword: Yup.string(),
                confirmNewPassword: Yup.string()
              })}
              onSubmit={async values => {
                // Remove `profile updated` badge if there
                setUpdated(false);

                // Make sure password fields match
                if (values.newPassword != values.confirmNewPassword) {
                  setFieldError(
                    "confirmNewPassword",
                    "Oops, your passwords don't match!"
                  );
                } else {
                  // Make sure there are actually updates to send
                  let updates = {};
                  if (values.username != props.data.username) {
                    updates.username = values.username;
                  }
                  if (values.newPassword) {
                    updates.password = values.newPassword;
                  }
                  if (updates != {}) {
                    // Put loading symbol on submit button
                    setUpdating(true);

                    try {
                      // Send updates to API
                      const response = await fetch("/api/update-profile", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          userId: props.userId,
                          updates: updates
                        })
                      });

                      // Handle response from API
                      if (response.status === 200) {
                        setUpdated(true);
                        setUpdating(false);
                      } else if (response.status === 409) {
                        setFieldError(
                          "username",
                          "That username is already taken."
                        );
                        setUpdating(false);
                      } else if (response.status === 401) {
                        return logout();
                      } else {
                        console.log("User update failed.");
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

                    setUpdating(false);
                  }
                }
              }}
            >
              {formik => (
                <Form noValidate onSubmit={formik.handleSubmit}>
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
                        invalid={
                          formik.touched.username && !!formik.errors.username
                        }
                      />
                      <FormFeedback>{formik.errors.username}</FormFeedback>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="newPassword" className="text-dark">
                      New password
                    </Label>
                    <FormText color="muted">
                      Leave this blank if you don't want to change your
                      password.
                    </FormText>
                    <Input
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      invalid={
                        formik.touched.password && !!formik.errors.password
                      }
                    />
                    <FormFeedback>{formik.errors.password}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="confirmNewPassword" className="text-dark">
                      Confirm new password
                    </Label>
                    <Input
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmNewPassword}
                      invalid={
                        formik.touched.confirmNewPassword &&
                        formik.values.confirmNewPassword !=
                          formik.values.newPassword
                      }
                    />
                    <FormFeedback>
                      {formik.errors.retypePassword ||
                        "Oops, your passwords don't match!"}
                    </FormFeedback>
                  </FormGroup>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      {updating ? (
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                          disabled
                        >
                          <Spinner size="sm" />
                        </Button>
                      ) : (
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Update profile
                        </Button>
                      )}
                    </div>
                  </Row>

                  {updated && (
                    <Row>
                      <div className="ml-auto mr-auto text-success">
                        <i className="nc-icon nc-check-2" /> Your profile has
                        been updated!
                      </div>
                    </Row>
                  )}
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
}

// Get profile data for form
Settings.getInitialProps = async ctx => {
  // Grab user _id from auth cookie
  const { token } = nextCookie(ctx);

  try {
    // Ask for user data from profile API
    const response = await fetch("/api/profile", {
      credentials: "include",
      headers: {
        authorization: JSON.stringify({ token })
      }
    });

    if (response.status === 200) {
      // Insert profile data into props
      const props = response.json();
      props.userId = token;
      return props;
    } else {
      return logout();
    }
  } catch (err) {
    return logout();
  }
};

export default withAuthSync(Settings);
