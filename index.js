'use strict';

const surveys = require('./survey.js');
const Questionnaire = require('./Questionnaire.js');
const { readLine, rl } = require('./readLine.js');
const quest = new Questionnaire(surveys.blocks);

async function quize() {
  let condition = true;
  while (condition) {
    const question = quest.getQuestion();
    const title = question.text;
    const type = question.type;

    console.log(title);
    console.log(type);
    console.log(
      'Поддерживает ли вопрос, ответ текстом? ',
      question.hasOtherOption,
    );

    for (let i = 0; i < question.options.length; i++) {
      console.log(`${i + 1}`, question.options[i]);
    }

    console.log('Для ответа на вопрос текстом нажмите кнопку 9');
    console.log('Для того, чтобы вернуться назад нажмите 0');
    let myAnswer = await readLine('Введите номер(а) вашего ответа: ');
    if (parseInt(myAnswer) === 9) {
      let answerText = await readLine('Введите текст ответа: ');
      const res = quest.AnswerTheQuestion(question, answerText, true);
      if (res) {
        condition = false;
        console.log(res);
        return res;
      }
    }else if(parseInt(myAnswer) === 0){
        quest.goBack();
        continue;
    } 
    else {
      myAnswer = myAnswer.split(',');
      myAnswer = myAnswer.map(num => parseInt(num));
      const res = quest.AnswerTheQuestion(question, myAnswer);
      if (res) {
        condition = false;
        console.log(res);
        return res;
      }
    }
  }
}
const interviewee = {
  CompanyName: 'ИСПО',
  FullName: 'Марков Данил Петрович',
  JobTitle: 'Студент',
};
const main = async () => {
  const res = await quize();
  const rep = Questionnaire.createReport(interviewee, surveys.blocks, res);
  console.log(rep);
  // console.log(quest.getQuestion());

  // quest.AnswerTheQuestion(question, 2);
  // question = quest.getQuestion();
  // console.log(question);
  // quest.AnswerTheQuestion(question, 3);
  // question = quest.getQuestion();
  // console.log(question);
  // quest.AnswerTheQuestion(question, [1, 2]);
  // question = quest.getQuestion();
  // console.log(question);
  // quest.AnswerTheQuestion(question, 1);
  // question = quest.getQuestion();
  // console.log(question);
  // console.log(quest.AnswerTheQuestion(question, 1));
};
main();
