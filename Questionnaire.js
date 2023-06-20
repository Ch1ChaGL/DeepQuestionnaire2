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
   * 
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
   * @param {PreviousBlock} PreviousBlock - предыдущий блок
   * @param {answerQuestion} answerQuestion - Вопрос-Ответ
   */
  getNextBlock(PreviousBlock, answerQuestion){
    console.log('Предыдущий блок:', PreviousBlock);
    console.log('Вопрос-Ответ:', answerQuestion);
    const conditions = PreviousBlock['nextBlock']?.['condition'];
    if(!conditions) return null;
    for (const condition of conditions) {
      const questionId = condition['questionId'];
      const answer = condition['answer'];
      if(answerQuestion.get(questionId) !== answer) {
        return null;
      }
    }
    const nextBlockId = PreviousBlock['nextBlock']['blockId'];
    return this.blocks.find(block=> block['id'] === nextBlockId)
  }

}

module.exports = Questionnaire;
