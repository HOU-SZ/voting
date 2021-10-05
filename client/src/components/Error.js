import React, { Redirect } from "react";
import NavBar from "./NavBar";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";

export default function Error() {
  return (
    <div>
      <NavBar />
      <div>
        <Container>
          <p></p>
          <Alert variant="danger">
            <Alert.Heading>Oops! You got an error!</Alert.Heading>
            <p>
              It appears the page you're looking for is not available. Check the
              link or your input and try again.
            </p>
          </Alert>
        </Container>
      </div>
    </div>
  );
}
