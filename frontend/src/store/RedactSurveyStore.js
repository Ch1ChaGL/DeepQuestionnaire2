import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export default class RedactSurveyStore {
  constructor() {
    makeAutoObservable(this);
    this.currentSurvey = {};
  }


  /**
   * !Вернуться когда будут переделаны условия перехода
   */
  deleteBlock(setSurvey, selectedBlock, setSelectedBlock) {




    setSurvey({ ...this.currentSurvey });
  }
  /**
   * !Переделать удаление вопроса, удалить все условия связанные с этим вопросом
   */
  deleteQuestion(setSurvey, question, selectedBlock, setSelectedBlock) {
    console.log('question', question);
    console.log('selectedBlock', selectedBlock);

    //Нашли блок в котором надо удалить
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    console.log('block before', { ...block });
    if (block) {
      block.questions = block.questions.filter(a => a.id !== question.id);
    }
    console.log('block after', block);

    setSelectedBlock(prevState => ({
      ...prevState,
      data: { block: block },
    }));

    setSurvey({ ...this.currentSurvey });
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

    setSurvey({ ...this.currentSurvey });

    //setSurvey({ ...this.currentSurvey });
  }

  addQuestionBlock(setSurvey, nameBlock) {
    const newBlock = {
      id: uuidv4(),
      position: { x: 300, y: 300 },
      title: nameBlock,
      parentBlock: null,
      questions: [],
      nextBlock: null,
    };

    this.currentSurvey.Survey.blocks.push(newBlock);
    setSurvey({ ...this.currentSurvey });
  }

  updateQuestion(setSurvey, question, selectedBlock, setSelectedBlock) {
    //Нашли блок в котором надо обновить
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    if (!block) throw new Error('Нет такого блока');

    const index = block.questions.findIndex(a => a.id === question.id);
    if (index !== -1) {
      block.questions[index] = { ...question };
    }

    setSelectedBlock(prevState => ({
      ...prevState,
      data: { block: block },
    }));

    setSurvey({ ...this.currentSurvey });
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

  setBlockName(selectedBlock, newName, setSurvey) {
    console.log('selectedBlock', selectedBlock);
    console.log('newName', newName);
    console.log('this.currentSurvey', this.currentSurvey.Survey.blocks);
    const index = this.currentSurvey.Survey.blocks.findIndex(block => {
      const id = Number(selectedBlock.id) || selectedBlock.id;
      console.log('id', id);
      return block.id === id;
    });
    console.log('index', index);
    if (index !== -1) {
      this.currentSurvey.Survey.blocks[index].title = newName;
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
