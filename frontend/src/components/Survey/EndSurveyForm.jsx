import React from 'react';
import {
  Container,
  Form,
  Button,
  Card,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import EditSurveyForm from './EditSurveyForm';

function EndSurveyForm({ report, setIsStarted }) {
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
      className='d-flex justify-content-center'
      style={{ paddingTop: '10vh' }}
    >
      <EditSurveyForm report={report} setIsStarted={setIsStarted} isPushed={true}/>
    </Container>
  );
}

export default EndSurveyForm;
