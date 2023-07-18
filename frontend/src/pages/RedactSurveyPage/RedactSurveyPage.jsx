import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getOneSurvey } from '../../API/surveyApi';
import RedactMap from './RedactMap';
import QuestionBlock from '../../components/EditSurvey/QuestionBlock';
import { RedactSurveyProvider } from '../../components/RedactSurvey/RedactSurveyProvider';
const nodeTypes = { questionBlock: QuestionBlock };

function RedactSurveyPage() {
  const location = useLocation();
  const QuizId = parseInt(location.pathname.split('/').slice(-1)[0]);
  const [survey, setSurvey] = useState({ blocks: [] });
  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    const getedSurvey = await getOneSurvey(QuizId);
    const parsedSurvey = JSON.parse(getedSurvey.Survey);
    console.log('parsedSurvey', parsedSurvey);
    setSurvey(parsedSurvey);
  };

  return (
    <RedactSurveyProvider>
      <div style={{ height: '100vh', paddingTop: 80 }}>
        <RedactMap survey={survey} nodeTypes={nodeTypes} />
      </div>
    </RedactSurveyProvider>
  );
}

export default RedactSurveyPage;
