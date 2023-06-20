const survey = {
     "blocks": [
      {
        "id": 1,
        "title": "Блок 1",
        "parentBlock": null,
        "questions": [
          {
            "id": 1,
            "text": "Вопрос 1 в блоке 1",
            "type": "singleChoice",
            "options": ["Ответ 1", "Ответ 2", "Ответ 3"],
            "hasOtherOption": true
          },
          {
            "id": 2,
            "text": "Вопрос 2 в блоке 1",
            "type": "singleChoice",
            "options": ["Ответ 1", "Ответ 2", "Ответ 3"],
            "hasOtherOption": true
          }
        ],
        "nextBlock": {
          "condition": [
            {
              "questionId": 1,
              "answer": "Ответ 2"
            },
            {
              "questionId": 2,
              "answer": "Ответ 3"
            }
          ],
          "blockId": 2
        }
      },
      {
        "id": 2,
        "title": "Блок 2",
        "parentBlock": 1,
        "questions": [
          {
            "id": 3,
            "text": "Вопрос 1 в блоке 2",
            "type": "singleChoice",
            "options": ["Ответ 1", "Ответ 2", "Ответ 3"],
            "hasOtherOption": true
          },
          {
            "id": 4,
            "text": "Вопрос 2 в блоке 2",
            "type": "singleChoice",
            "options": ["Ответ 1", "Ответ 2", "Ответ 3"],
            "hasOtherOption": true
          }
        ],
        "nextBlock": {
          "condition": [
            {
              "questionId": 3,
              "answer": "Ответ 2"
            },
            {
              "questionId": 4,
              "answer": "Ответ 3"
            }
          ],
          "blockId": 3
        }
      },
      {
        "id": 3,
        "title": "Блок 3",
        "parentBlock": 2,
        "questions": [
          {
            "id": 5,
            "text": "Вопрос 1 в блоке 3",
            "type": "singleChoice",
            "options": ["Ответ 1", "Ответ 2", "Ответ 3"],
            "hasOtherOption": true
          },
          {
            "id": 6,
            "text": "Вопрос 2 в блоке 3",
            "type": "singleChoice",
            "options": ["Ответ 1", "Ответ 2", "Ответ 3"],
            "hasOtherOption": true
          }
        ],
        "nextBlock": {
          "condition": [
            {
              "questionId": 5,
              "answer": "Ответ 2"
            },
            {
              "questionId": 6,
              "answer": "Ответ 3"
            }
          ],
          "blockId": 4
        }
      },
      {
        "id": 4,
        "title": "Блок 4",
        "parentBlock": 3,
        "questions": [
          {
            "id": 7,
            "text": "Вопрос 1 в блоке 4",
            "type": "singleChoice",
            "options": ["Ответ 1", "Ответ 2", "Ответ 3"],
            "hasOtherOption": true
          },
          {
            "id": 8,
            "text": "Вопрос 2 в блоке 4",
            "type": "singleChoice",
            "options": ["Ответ 1", "Ответ 2", "Ответ 3"],
            "hasOtherOption": true
          }
        ],
        "nextBlock": null
      }
    ]
  }
 module.exports = survey;