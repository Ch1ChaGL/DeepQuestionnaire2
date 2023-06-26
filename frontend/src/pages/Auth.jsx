import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Auth() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="p-5" style={{ width: "700px" }}>
        <h1 className="text-center">Авторизация</h1>
        <Form className="d-flex flex-column">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>

          <Row className="d-flex justify-content-between mt-3">
            <Col sm={9}>Нет аккаунта? Тогда иди на хуй</Col>
            <Col sm={3} className="text-end">
              <Button variant="outline-success">Войти</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default Auth;
