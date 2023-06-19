'use strict';

const surveys = require('./survey.js');
const Questionnaire = require('./Questionnaire.js')
const quest = new Questionnaire(surveys.blocks);

const main = async () => {
  console.log('блоки вопросов',surveys);
  console.log('1 блок вопросов',surveys.blocks[0]);
  quest.processBlock(surveys.blocks[0]);
};
main();
