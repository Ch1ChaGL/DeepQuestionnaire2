import React, { createContext, useContext, useState, useMemo } from 'react';
import RedactSurveyStore from '../../store/RedactSurveyStore';

const RedactSurveyContext = createContext();

function RedactSurveyProvider({ children }) {
  const RedactSurveyInformation = new RedactSurveyStore();
    return (
    <RedactSurveyContext.Provider
      value={{
        RedactSurveyInformation,
      }}
    >
      {children}
    </RedactSurveyContext.Provider>
  );
}

const useRedactSurvey = () => {
  return useContext(RedactSurveyContext).RedactSurveyInformation;
};

export { RedactSurveyProvider, useRedactSurvey };
