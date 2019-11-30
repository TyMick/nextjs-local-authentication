"use strict";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export default () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return (  
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="mx-auto" style={{ width: "100%", maxWidth: "420px" }}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="at">@</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required />
        <Form.Control.Feedback type="invalid">
          Please choose a password.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
};
