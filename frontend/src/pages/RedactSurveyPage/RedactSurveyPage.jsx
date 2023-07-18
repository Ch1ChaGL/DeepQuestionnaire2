import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getOneSurvey } from '../../API/surveyApi';
import RedactMap from './RedactMap';
import QuestionBlock from '../../components/EditSurvey/QuestionBlock';
import { RedactSurveyProvider, useRedactSurvey } from '../../components/RedactSurvey/RedactSurveyProvider';
const nodeTypes = { questionBlock: QuestionBlock };

function RedactSurveyPage() {
  const location = useLocation();
  const redact = useRedactSurvey();
  const QuizId = parseInt(location.pathname.split('/').slice(-1)[0]);
  const [survey, setSurvey] = useState({ Survey: { blocks: [] } });
  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    let getedSurvey = await getOneSurvey(QuizId);
    const parsedSurvey = JSON.parse(getedSurvey.Survey);
    getedSurvey = { ...getedSurvey, Survey: parsedSurvey };
    redact.setCurrentSurvey(getedSurvey);
    setSurvey(getedSurvey);
  };

  return (
    <div style={{ height: '100vh', paddingTop: 80 }}>
      <RedactMap survey={survey} nodeTypes={nodeTypes} />
    </div>
  );
}

export default RedactSurveyPage;
