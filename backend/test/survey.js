const survey = {
  blocks: [
    {
      id: 1,
      title: 'Блок 1',
      parentBlock: null,
      questions: [
        {
          id: 1,
          text: 'Вопрос 1 в блоке 1',
          type: 'singleChoice',
          options: [
            { id: 1, answer: 'Ответ 1' },
            { id: 2, answer: 'Ответ 2' },
            { id: 3, answer: 'Ответ 3' },
          ],
          hasOtherOption: true,
        },
        {
          id: 2,
          text: 'Вопрос 2 в блоке 1',
          type: 'singleChoice',
          options: [
            { id: 4, answer: 'Ответ 1' },
            { id: 5, answer: 'Ответ 2' },
            { id: 6, answer: 'Ответ 3' },
          ],
          hasOtherOption: true,
        },
        {
          id: 3,
          text: 'Вопрос 3 в блоке 1',
          type: 'multipleChoice',
          options: [
            { id: 7, answer: 'Ответ 1' },
            { id: 8, answer: 'Ответ 2' },
            { id: 9, answer: 'Ответ 3' },
          ],
          hasOtherOption: true,
        },
      ],
      nextBlock: {
        condition: [
          [
            {
              Operator: 'and',
              blockId: 4,
            },
            {
              questionId: 1,
              answer: { isOtherOption: true },
            },
            {
              questionId: 2,
              answer: { isOtherOption: true },
            },
          ],
          [
            {
              Operator: 'and',
              blockId: 2,
            },
            {
              questionId: 1,
              answerId: 2,
            },
            {
              questionId: 2,
              answerId: 6,
            },
          ],
          [
            {
              Operator: 'and',
              blockId: 3,
            },
            {
              questionId: 3,
              answerId: [7, 8],
            },
          ],
          [
            {
              Operator: 'or',
              blockId: 4,
            },
            {
              questionId: 1,
              answerId: 1,
            },
            {
              questionId: 2,
              answerId: 6,
            },
          ],
        ],
      },
    },
    {
      id: 2,
      title: 'Блок 2',
      questions: [
        {
          id: 1,
          text: 'Вопрос 1 в блоке 2',
          type: 'singleChoice',
          options: [
            { id: 10, answer: 'Ответ 1' },
            { id: 11, answer: 'Ответ 2' },
            { id: 12, answer: 'Ответ 3' },
          ],
          hasOtherOption: true,
        },
        {
          id: 2,
          text: 'Вопрос 2 в блоке 2',
          type: 'singleChoice',
          options: [
            { id: 13, answer: 'Ответ 1' },
            { id: 14, answer: 'Ответ 2' },
            { id: 15, answer: 'Ответ 3' },
          ],
          hasOtherOption: true,
        },
      ],
      nextBlock: {
        condition: [
          [
            {
              Operator: 'and',
              blockId: 3,
            },
            {
              questionId: 1,
              answer: 'Ответ 2',
            },
            {
              questionId: 2,
              answer: 'Ответ 3',
            },
          ],
        ],
      },
    },
    {
      id: 3,
      title: 'Блок 3',
      questions: [
        {
          id: 6,
          text: 'Вопрос 1 в блоке 3',
          type: 'singleChoice',
          options: ['Ответ 1', 'Ответ 2', 'Ответ 3'],
          hasOtherOption: true,
        },
        {
          id: 7,
          text: 'Вопрос 2 в блоке 3',
          type: 'singleChoice',
          options: ['Ответ 1', 'Ответ 2', 'Ответ 3'],
          hasOtherOption: true,
        },
      ],
      nextBlock: {
        condition: [
          [
            {
              Operator: 'and',
              blockId: 4,
            },
            {
              questionId: 6,
              answer: 'Ответ 2',
            },
            {
              questionId: 7,
              answer: 'Ответ 3',
            },
          ],
        ],
      },
    },
    {
      id: 4,
      title: 'Блок 4',
      questions: [
        {
          id: 8,
          text: 'Вопрос 1 в блоке 4',
          type: 'singleChoice',
          options: ['Ответ 1', 'Ответ 2', 'Ответ 3'],
          hasOtherOption: true,
        },
        {
          id: 9,
          text: 'Вопрос 2 в блоке 4',
          type: 'singleChoice',
          options: ['Ответ 1', 'Ответ 2', 'Ответ 3'],
          hasOtherOption: true,
        },
      ],
      nextBlock: null,
    },
  ],
};
module.exports = survey;
