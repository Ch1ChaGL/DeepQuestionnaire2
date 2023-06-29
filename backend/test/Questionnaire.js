'use strict';

const SINGLE_CHOISE_TYPE = 'singleChoice';
const MULTIPLE_CHOISE_TYPE = 'multipleChoice';

function binarySearch(blocks, blockId) {
  let low = 0;
  let high = blocks.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = blocks[mid].id;
    if (guess === blockId) return mid;
    if (guess > blockId) high = mid - 1;
    else {
      low = mid + 1;
    }
  }
  return false;
}
function quicksort(blocks) {
  if (blocks.length < 2) return blocks;
  else {
    const pivot = blocks[0];
    const less = blocks.filter(elem => elem.id < pivot.id);
    const greater = blocks.filter(elem => elem.id > pivot.id);
    return [...quicksort(less), pivot, ...quicksort(greater)];
  }
}

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
   * @param {object} interviewee -  объект опрашиваемого
   * @param {object} blocks - блоки вопросов
   * @param {Map<int,string>} answerQuestion - ответы
   * @returns объект отчета
   */
  static createReport(interviewee, blocks, answerQuestion) {
    const { CompanyName, RespondentName, JobTitle, QuizTime, PhoneNumber, Email } = interviewee;
    const report = { CompanyName, RespondentName, JobTitle, QuizTime, PhoneNumber, Email };
    const sortedBlocks = quicksort(blocks);
    report['Survey'] = {};
    for (let question of answerQuestion) {
      const [idQuestion, answerBlock] = question;
      const { block, answer } = answerBlock;
      const blockId = block.id;

      const blockInBlocks = sortedBlocks[binarySearch(blocks, blockId)];
      const questions = blockInBlocks.questions;
      const questionInQuestions =
        questions[binarySearch(questions, idQuestion)];

      const questionText = questionInQuestions.text;

      report['Survey'][questionText] = answer;
    }

    return report;
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
        const answerInCondition = conditions[i]['answer'];
        const getedAnswer = answerQuestion.get(questionId);

        if (answerInCondition.isOtherOption && getedAnswer.isOtherOption) {
          continue;
        }
        if (getedAnswer === undefined) {
          return null;
        }

        const answer = getedAnswer.answer;
        console.log('answer', answer);
        if (answerInCondition.toString() !== answer.toString()) {
          return null;
        }
      }

      return blockId;
    } else if (Operator === 'or') {
      let orCondition = false;

      for (let i = 1; i < conditions.length; i++) {
        const questionId = conditions[i]['questionId'];
        const answerInCondition = conditions[i]['answer'];
        const getedAnswer = answerQuestion.get(questionId);

        if (getedAnswer === undefined) {
          return null;
        }
        const answer = getedAnswer.answer;

        if (answerInCondition.toString() === answer.toString()) {
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
    if (question['type'] === SINGLE_CHOISE_TYPE) {
      const countOptions =
        question['hasOtherOption'] === true
          ? question['options'].length + 1
          : question['options'].length;

      if (answer[0] > countOptions)
        throw new Error('Вопрос не содержит такого варианта ответа');
    }
    if (question['type'] === MULTIPLE_CHOISE_TYPE) {
      const countOptions =
        question['hasOtherOption'] === true
          ? question['options'].length + 1
          : question['options'].length;

      console.log('answer', answer);
      answer.forEach(answerNum => {
        if (answerNum > countOptions) {
          throw new Error(
            'Один из ответов не содержится в возможных вариантах ответов',
          );
        }
      });
    }
  }

  /**
   * Установка текущего блока вопроса, если это последний вопрос и заверешение опроса если следующего блока нет, в остальных случаях ничего не происходит
   * @param {object} question
   * @returns {Map<Int, string| Array<string> >} - Если это последний вопрос, вернется Map с ответами
   */
  _setCurrentBlockOrEndQuestionnaire(question) {
    const PreviousBlockId = this.currentBlock.id;
    if (this._isLastQuestionInBlock(this.currentBlock, question)) {
      this.currentBlock = this.getNextBlock(
        this.currentBlock,
        this.answerQuestion,
      );
      this.currentQuestion = 1;
      if (this.currentBlock) {
        this.currentBlock.parentBlock = PreviousBlockId;
      }
    }
    if (!this.currentBlock) {
      console.log('No current');
      return this.endQuestionnaire();
    }
  }

  /**
   * Метод для поддержки ответа на вопрос текстом, которого нет в вариантах ответа, если это возможно
   * @param {object} question - вопрос полученный из метода getQuestion
   * @param {string} answer - Ответ в качестве строки
   * @returns в случае окончания вопросов, возвращает Map с ответами пользователя за весь опрос
   */
  _AnswerTheQuestionWithOtherOption(question, answer) {
    if (question.hasOtherOption === false)
      throw new Error('Вопрос не поддерживает другие ответы');

    const questionId = question['id'];

    const block = this.currentBlock;
    this.answerQuestion.set(questionId, { block, answer, isOtherOption: true });
    console.log(this.answerQuestion);
    this.currentQuestion++;

    const resultAnswer = this._setCurrentBlockOrEndQuestionnaire(question);
    return resultAnswer;
  }
  /**
   * @param {object} question - вопрос полученный из метода getQuestion
   * @param {Int | Array<Int> | string} Answer - порядковый номер ответа | массив ответов | строка с ответом
   * @param {Boolean} isOtherQuestion - флаг указывающий на то, является ли ответ одним из выбранных, или этот ответ, содержит иной текст ответа
   */
  AnswerTheQuestion(question, Answer, isOtherOption = false) {
    if (isOtherOption) {
      const resultAnswer = this._AnswerTheQuestionWithOtherOption(
        question,
        Answer,
      );
      if (resultAnswer) {
        return resultAnswer;
      }
      return;
    }
    if (question['type'] === SINGLE_CHOISE_TYPE) {
      this._checkCountOptions(question, Answer);

      const answer = question['options'][Answer - 1];
      const questionId = question['id'];

      const block = this.currentBlock;
      this.answerQuestion.set(questionId, { block, answer });

      this.currentQuestion++;

      const resultAnswer = this._setCurrentBlockOrEndQuestionnaire(question);
      if (resultAnswer) {
        return resultAnswer;
      }
    }
    if (question['type'] === MULTIPLE_CHOISE_TYPE) {
      this._checkCountOptions(question, Answer);
      const questionId = question['id'];
      let answer = [];
      for (const answerNum of Answer) {
        answer.push(question['options'][answerNum - 1]);
      }

      const block = this.currentBlock;
      this.answerQuestion.set(questionId, { block, answer });

      this.currentQuestion++;

      const resultAnswer = this._setCurrentBlockOrEndQuestionnaire(question);
      if (resultAnswer) {
        return resultAnswer;
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
    return this.answerQuestion;
  }

  goBack() {
    const keysArray = Array.from(this.answerQuestion.keys());
    const lastKey = keysArray[keysArray.length - 1];

    const valuesArray = Array.from(this.answerQuestion.values());
    const lastValue = valuesArray[valuesArray.length - 1];

    if (this.currentQuestion === 1) {
      const prevQuestionPosition = lastValue.block.questions.length;
      this.currentQuestion = prevQuestionPosition;
    } else {
      this.currentQuestion--;
    }
    this.currentBlock = lastValue.block;
    this.answerQuestion.delete(lastKey);
  }

  getJSON(report){
    return JSON.stringify(report);
  }
}

module.exports = Questionnaire;
