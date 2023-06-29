import React, { useEffect, useState } from 'react';
import { SurveyProvider } from '../components/Survey/SurveyProvider';
import StartSurveyForm from '../components/Survey/StartSurveyForm';
import Questions from '../components/Survey/Questions';

function Survey() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <SurveyProvider>
      {isStarted ? (
        <Questions setIsStarted={setIsStarted} />
      ) : (
        <StartSurveyForm setIsStarted={setIsStarted} />
      )}
    </SurveyProvider>
  );
}

export default Survey;
