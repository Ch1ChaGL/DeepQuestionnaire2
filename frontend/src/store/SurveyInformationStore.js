import { makeAutoObservable } from 'mobx';

export default class SurveyInformationStore {
  constructor() {
    makeAutoObservable(this);
    this.CompanyName = '';
    this.RespondentName = '';
    this.JobTitle = '';
    this.PhoneNumber = '';
    this.Email = '';
    this.QuizTime = null;
  }

  setInformation(information) {
    this.CompanyName = information.CompanyName;
    this.RespondentName = information.RespondentName;
    this.JobTitle = information.JobTitle;
    this.PhoneNumber = information.PhoneNumber;
    this.Email = information.Email;
    this.QuizTime = information.QuizTime;
  }
  getInformation() {
    return {
      CompanyName: this.CompanyName,
      RespondentName: this.RespondentName,
      JobTitle: this.JobTitle,
      PhoneNumber: this.PhoneNumber,
      Email: this.Email,
      QuizTime: this.QuizTime,
    };
  }
}
