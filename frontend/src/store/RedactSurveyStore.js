import { makeAutoObservable } from 'mobx';

export default class RedactSurveyStore {
  constructor() {
    makeAutoObservable(this);
    this.currentSurvey = {};
  }

  
  addQuestion(setSurvey) {
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === 4,
    );
    if (block) {
      block.questions.push({
        id: 10,
        text: 'Вопрос 3 в блоке 4',
        type: 'multipleChoice',
        options: ['123', '234'],
        hasOtherOption: true,
      });
    }

    setSurvey({ ...this.currentSurvey });
  }
  setCurrentSurvey(survey) {
    if (typeof survey !== 'object')
      throw new TypeError('Тип данных не подходит');
    this.currentSurvey = survey;
  }

  setBlockPosition(blockId, newPosition, setSurvey) {
    // //console.log('this.currentSurvey.Survey', this.currentSurvey.Survey);
    // const block = this.currentSurvey.Survey.blocks.find(
    //   block => block.id === blockId,
    // );
    // //console.log('bl0ock', block);
    // if (block) {
    //   block.position = newPosition;
    // }
    // //console.log('this.currentSurvey', this.currentSurvey);
    /**
     * ! пиздецу
     *  */
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === blockId,
    );
    if (block) {
      block.position = newPosition;
    }

    setSurvey({ ...this.currentSurvey });
  }

  setOnlySurvey(survey) {
    this.currentSurvey.Survey = survey;
  }
  getCurrentSurvey() {
    return this.currentSurvey;
  }
  get Survey() {
    return this.currentSurvey.Survey;
  }
}

//    const parsedSurvey = JSON.parse(getedSurvey.Survey);
