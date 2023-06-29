import React from 'react';
import { useSurveyService } from './SurveyProvider';
import { Container } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
function Questions() {
  return (
    <Container
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center'
    >
      Мы начали
    </Container>
  );
}

export default Questions;
