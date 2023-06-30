import React, { useEffect, useState } from 'react';
import { useSurveyService, useSurveyInformation } from './SurveyProvider';
import {
  Container,
  Form,
  Card,
  Col,
  FloatingLabel,
  Row,
  Button,
} from 'react-bootstrap';
import Question from './Question';
import EndSurveyForm from './EndSurveyForm';



function Questions() {
  const survey = useSurveyService();
  const [question, setQuestion] = useState(survey.getQuestion());
  const [isFinally, setIsFinally] = useState(false);
  const [report, setReport] = useState({});


  const interviewer = useSurveyInformation();
  console.log('interviewer.getInformation()', interviewer.getInformation());
  const answerTheQuestion = (answerText, isOtherOptions) => {

    const res = survey.AnswerTheQuestion(question, answerText, isOtherOptions);
    if (res) {
      setIsFinally(true);
      console.log('question', question);
      console.log(res);
      setReport(survey.createReport(interviewer.getInformation(), res));
      setQuestion(question);
    } else {
      setIsFinally(false);
      setQuestion(survey.getQuestion());
    }
  };

  const goBack = () => {
    survey.goBack();
    setQuestion(survey.getQuestion());
  };


  return (
    <Container
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center'
    >
      {isFinally ? (
        <EndSurveyForm report={report}/>
      ) : (
        <Question
          question={question}
          answerTheQuestion={answerTheQuestion}
          goBack={goBack}
        />
      )}
    </Container>
  );
}

export default Questions;
