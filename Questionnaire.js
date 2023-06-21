'use strict';
const { readLine, rl } = require('./readLine');

class Questionnaire {
  constructor(blocks) {
    /**
     * Все блоки вопросов
     */
    this.blocks = blocks;
    /**
     * Текущий блок вопросов
     */
    this.currentBlock = null;
    /**
     * Map с ключем - Id вопроса / Значение - Ответ
     */
    this.answerQuestion = new Map();
  }

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
  getNextBlock(PreviousBlock, answerQuestion){
    console.log('Предыдущий блок:', PreviousBlock);
    console.log('Вопрос-Ответ:', answerQuestion);

    const conditions = PreviousBlock['nextBlock']?.['condition'];
    if(!conditions) return null;

    let nextBlockId = null;

    for (const condition of conditions) {
      console.log('я тут');
      nextBlockId = this._CheckConditional(condition, answerQuestion);
      if(nextBlockId) break;
    }

    return this.blocks.find(block => block['id'] === nextBlockId)
  }

  /**
   * Проверка условия
   * @param {condition} condition - условие
   * @param {answerQuestion} answerQuestion - Вопрос-Ответ
   */
  //Нужно просмотреть предложенный блок, его условие, и если оно верное, то вернуть следующий блок иначе вернуть null
  _CheckConditional(conditions, answerQuestion){
    console.log('Я тут');
    const {Operator, blockId} = conditions[0];
    console.log('conditions',conditions);
    console.log('answerQuestion',answerQuestion);
    console.log('Operator',Operator);
    console.log('blockId',blockId);
    console.log("Operator === 'and'", Operator === 'and');
    if(Operator === 'and'){
      console.log('Я в and');
      console.log('conditions', conditions.length);
      for (let i = 1; i < conditions.length; i++) {
        console.log('-------------');
        const questionId = conditions[i]['questionId'];
        console.log('questionId',questionId);
        const answer = conditions[i]['answer'];
        console.log('answer',answer);

        if(answerQuestion.get(questionId) !== answer) {
          return null;
        }
      }

      return blockId;
    }
    else if(Operator === 'or'){
      let orCondition = false;
      for (let i = 1; i < conditions.length; i++) {
        const questionId = conditions[i]['questionId'];
        const answer = conditions[i]['answer'];

        if(answerQuestion.get(questionId) === answer) {
          orCondition = true;
        }
      }

      if(orCondition) return blockId;
    }
    else return null;
    
  }
}

module.exports = Questionnaire;
