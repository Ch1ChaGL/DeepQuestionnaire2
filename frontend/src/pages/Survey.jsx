import React, { useEffect, useState } from 'react';
import { SurveyProvider } from '../components/Survey/SurveyProvider';
import StartSurveyForm from '../components/Survey/StartSurveyForm';
import Questions from '../components/Survey/Questions';

function Survey() {
  const [isStarted, setIsStarted] = useState(false);
  const handleBeforeUnload = event => {
    event.preventDefault();
    event.returnValue = '';

    // Отображение диалогового окна с предупреждением
    const confirmationMessage =
      'Вы уверены, что хотите покинуть страницу? Все несохраненные данные будут потеряны.';
    event.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
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
