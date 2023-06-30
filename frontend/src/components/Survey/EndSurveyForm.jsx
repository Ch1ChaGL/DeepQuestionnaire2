import React from 'react';
import { Container, Form, Button, Card, InputGroup } from 'react-bootstrap';

function EndSurveyForm({ report }) {
  const {
    CompanyName,
    Email,
    JobTitle,
    PhoneNumber,
    QuizTime,
    RespondentName,
    Survey,
  } = report;

  const formattedQuizTime = QuizTime.toLocaleString();

  return (
    <Container
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center'
    >
      <div>
        <h2>Отчет</h2>
        <p>Название компании: {CompanyName}</p>
        <p>Email: {Email}</p>
        <p>Должность: {JobTitle}</p>
        <p>Номер телефона: {PhoneNumber}</p>
        <p>Время опроса: {formattedQuizTime}</p>
        <p>ФИО респондента: {RespondentName}</p>
        <h3>Результаты опроса</h3>
        {Object.entries(Survey).map(([question, answer], index) => (
          <div key={index}>
            <p>
              {question}: {Array.isArray(answer) ? answer.join(', ') : answer}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default EndSurveyForm;
