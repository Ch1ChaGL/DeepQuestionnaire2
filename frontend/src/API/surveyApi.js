import { $authHost, $host } from './index';

export const getSurvey = async () => {
  const survey = await $authHost.get('api/quiz');
  return survey.data;
};
export const getOneSurvey = async id => {
  const getedSurvey = await $authHost.get(`api/quiz/${id}/`);
  return getedSurvey.data;
};

export const updateSurvey = async survey => {
  const updatedSurvey = await $authHost.put('api/quiz', survey);
  return updatedSurvey;
};

export const addSurvey = async survey => {
  const res = await $authHost.post('api/quiz', survey);
  return res;
};

export const deleteSurvey = async id => {
  const res = await $authHost.delete(`api/quiz/${id}`);
  return res;
}