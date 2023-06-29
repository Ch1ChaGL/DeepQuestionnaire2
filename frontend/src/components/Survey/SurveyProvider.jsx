import React, { createContext, useContext, useState } from "react";
import Questionnaire from "../../API/Questionnaire";
import SurveyInformationStore from "../../store/SurveyInformationStore";
const SurveyContext = createContext();
function SurveyProvider({ children }) {
  const [surveyService, setSurveyService] = useState(null);

  const updateSurveyData = (newData) => {
    const newSurveyService = new Questionnaire(newData);
    setSurveyService(newSurveyService);
  };

  return (
    <SurveyContext.Provider
      value={{
        surveyService,
        updateSurveyData,
        information: new SurveyInformationStore(),
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

const useSurveyService = () => {
  return useContext(SurveyContext).surveyService;
};

const useSurveyUpdater = () => {
  return useContext(SurveyContext).updateSurveyData;
};

const useSurveyInformation = () => {
  return useContext(SurveyContext).information;
};
export { SurveyProvider, useSurveyService, useSurveyUpdater, useSurveyInformation };
