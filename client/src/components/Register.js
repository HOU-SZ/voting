import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import { useRegisterHook } from "../hooks/useRegisterHook";

export default function Register() {
  const {
    HandleChange,
    resetFormControls,
    submitRegister,
    registered,
    values,
    errors,
  } = useRegisterHook();

  return (
    <div>
      <NavBar />
      <main className="text-center py-4">
        <Container>
          <h1>Register</h1>
          <Form onSubmit={submitRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={HandleChange}
              />
              <Form.Text className="text-muted">{errors.name}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>alias</Form.Label>
              <Form.Control
                placeholder="Alias"
                name="alias"
                value={values.alias}
                onChange={HandleChange}
              />
              <Form.Text className="text-muted">{errors.alias}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="emailAddress"
                value={values.emailAddress}
                onChange={HandleChange}
              />
              <Form.Text className="text-muted">
                {errors.emailAddress
                  ? errors.emailAddress
                  : "We'll never share your email with anyone else."}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                placeholder="Password"
                onChange={HandleChange}
              />
              <Form.Text className="text-muted">
                {errors.password ? errors.password : "Min 8 characters"}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder="Password"
                onChange={HandleChange}
              />
              <Form.Text className="text-muted">
                {errors.confirmPassword
                  ? errors.confirmPassword
                  : "Min 8 characters"}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            {"  "}
            <Button
              variant="secondary"
              type="reset"
              onClick={resetFormControls}
            >
              Reset
            </Button>
          </Form>
        </Container>
      </main>

      {registered === "true" ? <Redirect to="/" /> : undefined}
    </div>
  );
}
