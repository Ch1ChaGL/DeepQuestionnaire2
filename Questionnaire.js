'use strict';
const { readLine, rl } = require('./readLine');

const SINGLE_CHOISE_TYPE = 'singleChoice';
const MULTIPLE_CHOISE_TYPE = 'multipleChoice';


class Questionnaire {
  constructor(blocks) {
    /**
     * Все блоки вопросов
     */
    this.blocks = blocks;
    /**
     * Текущий блок вопросов
     */
    this.currentBlock = blocks[0];
    /**
     * Map с ключем - Id вопроса / Значение - Ответ
     */
    this.answerQuestion = new Map();
    this.currentQuestion = 1;
  }

  /**
   * !(DELETE) Вот это вроде можно удалить (DELETE)
   */
  /**
   * @param {block} block - блок вопросов
   */
  async processBlock(block) {
    console.log(`--${block['title']}--`);
    for (const question of block['questions']) {
      console.log('Внимание вопрос:', question['text']);
      let answer;

      if (question['type'] === 'singleChoice') {
        console.log('Варианты ответов:');

        console.log('question["options"] ', question['options']);

        question['options'].forEach((option, index) => {
          // console.log(`${index + 1}. ${option['text']}`);
          console.log(`${index + 1}. ${option}`);
        });

        answer = await readLine('Введите номер вашего ответа: ');
        const answerId = parseInt(answer);
        answer = question['options'][answerId - 1];
      } else if (question['type'] === 'text') {
        answer = await readLine('Введите текст ответа: ');
      }

      this.answerQuestion.set(question['id'], answer);
    }

    const nextBlock = this.getNextBlock(block, this.answerQuestion);

    if (nextBlock) {
      await this.processBlock(nextBlock);
    } else {
      console.log('Опрос завершен!');
      rl.close();
    }
  }

  /**
   * Только возвращает следующий блок, и итерируется по условиям, логика в приватной функции _CheckConditional
   * @param {PreviousBlock} PreviousBlock - предыдущий блок
   * @param {answerQuestion} answerQuestion - Вопрос-Ответ
   */
  getNextBlock(PreviousBlock, answerQuestion) {
    // console.log('Предыдущий блок:', PreviousBlock);
    // console.log('Вопрос-Ответ:', answerQuestion);

    const conditions = PreviousBlock['nextBlock']?.['condition'];
    if (!conditions) return null;

    let nextBlockId = null;

    for (const condition of conditions) {
      nextBlockId = this._CheckConditional(condition, answerQuestion);
      if (nextBlockId) break;
    }

    return this.blocks.find(block => block['id'] === nextBlockId);
  }

  /**
   * Проверка условия
   * @param {condition} condition - условие
   * @param {answerQuestion} answerQuestion - Вопрос-Ответ
   */
  //Нужно просмотреть предложенный блок, его условие, и если оно верное, то вернуть следующий блок иначе вернуть null
  _CheckConditional(conditions, answerQuestion) {
    const { Operator, blockId } = conditions[0];

    if (Operator === 'and') {
      for (let i = 1; i < conditions.length; i++) {
        const questionId = conditions[i]['questionId'];
        const answer = conditions[i]['answer'];

        if (answerQuestion.get(questionId) !== answer) {
          return null;
        }
      }

      return blockId;
    } else if (Operator === 'or') {
      let orCondition = false;

      for (let i = 1; i < conditions.length; i++) {
        const questionId = conditions[i]['questionId'];
        const answer = conditions[i]['answer'];

        if (answerQuestion.get(questionId) === answer) {
          orCondition = true;
        }
      }

      if (orCondition) return blockId;
    } else return null;
  }

  /**
   *
   * @returns Текущий вопрос с овтетами и типом ответов
   */
  getQuestion() {
    return this.currentBlock['questions'][this.currentQuestion - 1];
  }

  /**
   * @param {object} question - Объект вопроса
   * @param {Int|Array<Int>} answer - Порядковый номер/номера ответа в зависимости от типа вопроса 
   */
  _checkCountOptions(question, answer) {
    if(question['type'] === SINGLE_CHOISE_TYPE){
      const countOptions =
        question['hasOtherOption'] === true
          ? question['options'].length + 1
          : question['options'].length;

      if (answer > countOptions)
        throw new Error('Вопрос не содержит такого варианта ответа');
    }
    if(question['type'] === MULTIPLE_CHOISE_TYPE){
      const countOptions =
        question['hasOtherOption'] === true
          ? question['options'].length + 1
          : question['options'].length;
        answer.forEach(answerNum => 
          {
            if(answerNum > countOptions){
              throw new Error('Один из ответов не содержится в возможных вариантах ответов');
            }
          }
        )
    }
  }


  /**
   * Установка текущего блока вопроса, если это последний вопрос и заверешение опроса если следующего блока нет, в остальных случаях ничего не происходит
   * @param {object} question 
   * @returns {Map<Int, string| Array<string> >} - Если это последний вопрос, вернется Map с ответами
   */
  _setCurrentBlockOrEndQuestionnaire(question){
    if (this._isLastQuestionInBlock(this.currentBlock, question)) {
      this.currentBlock = this.getNextBlock(
        this.currentBlock,
        this.answerQuestion,
      );

      this.currentQuestion = 1;
    }
    if (!this.currentBlock) {
      return this.endQuestionnaire();
    }
  }

  /**
   * @param {object} question - вопрос полученный из метода getQuestion
   * @param {Int} answerNumber - порядковый номер ответа
   */
  AnswerTheQuestion(question, answerNumber) {
    if(question['type'] === SINGLE_CHOISE_TYPE){
      this._checkCountOptions(question, answerNumber);

      const answer = question['options'][answerNumber - 1];
      const questionId = question['id'];

      this.answerQuestion.set(questionId, answer);
      this.currentQuestion++;

      const resultAnswer = this._setCurrentBlockOrEndQuestionnaire(question);
       if(resultAnswer){
        return resultAnswer
       }
      
    }
    if(question['type'] === MULTIPLE_CHOISE_TYPE){
      this._checkCountOptions(question, answerNumber);
      const questionId = question['id'];
      let answer = [];
      for (const answerNum of answerNumber) {
        answer.push(question['options'][answerNum - 1]);
      }
      this.answerQuestion.set(questionId, answer);
      this.currentQuestion++;

       const resultAnswer = this._setCurrentBlockOrEndQuestionnaire(question);
       if(resultAnswer){
        return resultAnswer
       }
    }
  }

  /**
   * @param {object} block - блок вопросов
   * @param {object} question - вопрос
   */
  _isLastQuestionInBlock(block, question) {
    return block['questions'].at(-1) === question;
  }

  /**
   * Заканчивает опрос
   * @returns {Map<int, string>} объект с ответами
   */
  endQuestionnaire() {
    console.log('Опрос завершен!');
    return (this.answerQuestion);
  }
}

module.exports = Questionnaire;
