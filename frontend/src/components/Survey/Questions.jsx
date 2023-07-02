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

function Questions({ setIsStarted }) {
  const survey = useSurveyService();
  const [question, setQuestion] = useState(survey.getQuestion());
  const [isFinally, setIsFinally] = useState(false);
  const [report, setReport] = useState({});



  const interviewer = useSurveyInformation();
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
    const res = survey.goBack();
    if (res === 0) setIsStarted(false);
    setQuestion(survey.getQuestion());
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: 'calc(100vh - 55px)' }}
    >
      {isFinally ? (
        <EndSurveyForm report={report} setIsStarted={setIsStarted} />
      ) : (
        <Question
          question={question}
          answerTheQuestion={answerTheQuestion}
          goBack={goBack}
        />
      )}
    </div>
  );
}

export default Questions;
