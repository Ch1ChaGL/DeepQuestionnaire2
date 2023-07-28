function _changeConditionAfterDeleteQuestion(missingIds, block) {
  const conditions = block.nextBlock.condition;
  console.log(conditions === block.nextBlock.condition);
  for (const id of missingIds) {
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      const operator = condition[0].Operator;
      switch (operator) {
        case 'and':
          let deleteBlock = false;
          for (let j = 1; j < condition.length; j++) {
            const answer = condition[j].answer.id;
            if (Array.isArray(answer) && answer.includes(id)) {
              deleteBlock = true;
              break;
            } else if (id === answer) {
              deleteBlock = true;
              break;
            }
          }

          if (deleteBlock) {
            conditions.splice(i, 1);
            i--;
          }
          break;

        case 'or':
          
          break;
        default:
          throw new Error('Ошибка в condition');
      }
    }
  }
}

// Пример использования функции:
const block = {
  id: 1,
  // другие свойства блока
  nextBlock: {
    condition: [
      [
        { Operator: 'and', blockId: 4 },
        { questionId: 1, answer: { id: ['q1o1', 'q1o2'] } },
        { questionId: 2, answer: { id: 'q2o3' } },
      ],
      [
        { Operator: 'or', blockId: 5 },
        { questionId: 1, answer: { id: 'q2o1' } },
        { questionId: 2, answer: { id: 'q2o2' } },
      ],
    ],
  },
};

const missingIds = ['q1o1'];
_changeConditionAfterDeleteQuestion(missingIds, block);

console.log(block.nextBlock);
