import { $authHost, $host } from './index';

export const getSurvey = async () => {
  const survey = await $authHost.get('api/quiz');
  return survey.data;
};
export const getOneSurvey = async id => {
  const getedSurvey = await $authHost.get(`api/quiz/${id}/`);
  return getedSurvey.data;
};
