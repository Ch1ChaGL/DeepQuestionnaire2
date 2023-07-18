import { makeAutoObservable } from 'mobx';

export default class RedactSurveyStore {
  constructor() {
    makeAutoObservable(this);
    this.currentSurvey = {};
  }

  setCurrentSurvey(survey) {
    if (typeof survey !== 'object')
      throw new TypeError('Тип данных не подходит');
    this.currentSurvey = survey;
  }

  setOnlySurvey(survey) {
    this.currentSurvey.Survey = survey;
  }
  getCurrentSurvey(){
    return this.currentSurvey;
  }
  get Survey() {
    return this.currentSurvey.Survey;
  }
}

//    const parsedSurvey = JSON.parse(getedSurvey.Survey);
