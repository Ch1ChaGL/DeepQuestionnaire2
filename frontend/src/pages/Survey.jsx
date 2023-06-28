import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { getSurvey } from "../API/surveyApi";

function Survey() {
  const [survey, setSurvey] = useState([]);
  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    const survey = await getSurvey();
    console.log("survey", survey);
    setSurvey(survey);
  };

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card className="p-4" style={{ width: "700px" }}>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text id="FullName">ФИО</InputGroup.Text>
            <Form.Control
              placeholder="Введите ФИО"
              aria-label="FullName"
              aria-describedby="FullName"
              type="text"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="CompanyName">
              Название компании
            </InputGroup.Text>
            <Form.Control
              placeholder="Введите название компании"
              aria-label="CompanyName"
              aria-describedby="CompanyName"
              type="text"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="PhoneNumber">Номер телефона</InputGroup.Text>
            <Form.Control
              placeholder="Введите номер телефона"
              aria-label="PhoneNumber"
              aria-describedby="PhoneNumber"
              type="text"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="Email">Email</InputGroup.Text>
            <Form.Control
              placeholder="Введите Email"
              aria-label="Email"
              aria-describedby="Email"
              type="text"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="Survey">Опрос</InputGroup.Text>
            <Form.Select aria-label="Survey">
              <option>Выберите опрос перед началом</option>
              {survey.map((currentSurvey) => (
                <option key={currentSurvey.QuizId} value={currentSurvey.QuizId}>
                  {currentSurvey.Name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Form>
        <Button variant="outline-success">Начать</Button>
      </Card>
    </Container>
  );
}

export default Survey;
