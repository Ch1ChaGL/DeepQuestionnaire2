'use strict';

const surveys = require('./survey.js');
const Questionnaire = require('./Questionnaire.js')
const quest = new Questionnaire(surveys.blocks);

const main = async () => {
  console.log(quest.getQuestion());
  let question = quest.getQuestion();
  quest.AnswerTheQuestion(question, 2);
  question = quest.getQuestion();
  console.log(question);
  quest.AnswerTheQuestion(question, 3);
  question = quest.getQuestion();
  console.log(question);
  quest.AnswerTheQuestion(question, [1,2]);
  question = quest.getQuestion();
  console.log(question);
  quest.AnswerTheQuestion(question, 1);
  question = quest.getQuestion();
  console.log(question);
  console.log(quest.AnswerTheQuestion(question, 1));
};
main();
