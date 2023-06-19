'use strict';
const { readLine, rl } = require('./readLine');

class Questionnaire {
  constructor(blocks) {
    this.blocks = blocks;
    this.currentBlock = null;
    this.answerQuestion = new Map();
  }

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
      } else if (question['type'] === 'text') {
        answer = await readLine('Введите текст ответа: ');
      }

      this.answerQuestion.set(question['id'], answer);
    }

    console.log("block['id']" + block['id']);
    const nextBlock = this.blocks.find(b => b['parentBlock'] === block['id']);
    console.log('nextBlock ', nextBlock);

    if (nextBlock) {
      await this.processBlock(nextBlock);
    } else {
      console.log('Опрос завершен!');
      rl.close();
    }
  }
}

module.exports = Questionnaire;
