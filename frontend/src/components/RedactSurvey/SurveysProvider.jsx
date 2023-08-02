import { createContext, useContext } from 'react';

const SurveyContext = createContext();

export function useSurvey() {
  return useContext(SurveyContext);
}

export function SurveyProvider({ children, survey }) {
  return (
    <SurveyContext.Provider value={survey}>{children}</SurveyContext.Provider>
  );
}
