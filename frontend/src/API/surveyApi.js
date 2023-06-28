import { $authHost, $host } from "./index";

export const getSurvey = async () => {
  const survey = await $authHost.get("api/quiz");
  return survey.data;
};
