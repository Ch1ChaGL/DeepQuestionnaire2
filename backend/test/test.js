function _changeConditionAfterDeleteQuestion(missingIds, block) {
  const conditions = block.nextBlock.condition;
  console.log(conditions === block.nextBlock.condition);
  for (const id of missingIds) {
    for (const condition of conditions) {
      const operator = condition[0].Operator;
      switch (operator) {
        case 'and':
          for (let i = 1; i < condition.length; i++) {
            const answer = condition[i].answer.id;
            if (Array.isArray(answer)) {

            }
            else {
                if(id !== answer) continue;

            }
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

const missingIds = ['q1o2'];
_changeConditionAfterDeleteQuestion(missingIds, block);

console.log('res:', block.nextBlock);
