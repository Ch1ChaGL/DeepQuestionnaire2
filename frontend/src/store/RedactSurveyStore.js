import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export default class RedactSurveyStore {
  constructor() {
    makeAutoObservable(this);
    this.currentSurvey = {};
  }

  addQuestion(setSurvey, question, selectedBlock, setSelectedBlock) {
    console.log('selectedBlock ', selectedBlock);
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    if (block) {
      const newId = uuidv4();
      block.questions.push({
        ...question,
        id: newId,
      });
    }

    const newBlock = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    setSelectedBlock(prevState => ({
      ...prevState,
      data: { block: newBlock },
    }));
    console.log('block', block);
    console.log('this.currentSurvey ', this.currentSurvey);
    setSurvey({ ...this.currentSurvey });

    //setSurvey({ ...this.currentSurvey });
  }
  /**
   * Сетает текущий опрос
   * @param {Object} survey - весь объект опроса с названием
   */
  setCurrentSurvey(survey) {
    if (typeof survey !== 'object')
      throw new TypeError('Тип данных не подходит');
    this.currentSurvey = survey;
  }

  /**
   *
   * @param {int} blockId - id блока
   * @param {object} newPosition - объект с полями x и y
   * @param {function} setSurvey - сетает опрос
   */
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

  /**
   *
   * @param {object} survey - опрос именно сами вопросы и ответы
   */
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
