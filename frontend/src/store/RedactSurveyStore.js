import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export default class RedactSurveyStore {
  constructor() {
    makeAutoObservable(this);
    this.currentSurvey = {};
  }

  deleteCondition = (
    block,
    index,
    setSurvey,
    selectedBlock,
    setSelectedBlock,
  ) => {
    console.log('block', block);
    console.log('index', index);
    const blockId = block.id;

    const blockInSurvey = this.currentSurvey.Survey.blocks.find(
      block => block.id === blockId,
    );

    if (blockInSurvey) {
      console.log('blockInSurvey', blockInSurvey);
      blockInSurvey.nextBlock?.condition.splice(index, 1);

      const newSelectedBlock = { ...selectedBlock };
      newSelectedBlock.data.block = blockInSurvey;
      //console.log('selectedBlock', selectedBlock);
      setSelectedBlock(newSelectedBlock);
    }

    setSurvey({ ...this.currentSurvey });
  };

  _changeConditionAfterDeleteBlock(blockId) {
    const blocks = this.currentSurvey.Survey.blocks;
    for (const block of blocks) {
      if (block.nextBlock === null) continue;
      const conditions = block.nextBlock.condition;

      for (let i = conditions.length - 1; i >= 0; i--) {
        const condition = conditions[i];
        if (condition[0].blockId + '' === blockId) {
          conditions.splice(i, 1);
          block.nextBlock.unconditionallyJump = -1; // Удаляем блок условия, если blockId совпадает
        }
      }
    }
  }
  /**
   * !Вернуться когда будут переделаны условия перехода
   */
  deleteBlockFn(setSurvey, selectedBlock) {
    const blockId = selectedBlock.id;
    // Находим индекс выбранного блока в массиве блоков опроса
    const index = this.currentSurvey.Survey.blocks.findIndex(
      block => blockId === block.id + '',
    );
    // Если блок найден (индекс не равен -1), удаляем его из массива блоков
    if (index !== -1) {
      this.currentSurvey.Survey.blocks.splice(index, 1);

      console.log(
        'this.currentSurvey.Survey.blocks',
        this.currentSurvey.Survey.blocks,
      );
      this._changeConditionAfterDeleteBlock(blockId);
      // Обновляем опрос с обновленными данными
      setSurvey({ ...this.currentSurvey });
    }
  }

  _changeConditionAfterDeleteQuestion(questionId, block) {
    const conditions = block.nextBlock.condition;
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      for (let j = 1; j < condition.length; j++) {
        if (condition[j].questionId === questionId) {
          condition.splice(j, 1); // Удаляем объект с указанным questionId из условия
          if (condition.length === 1) {
            conditions.splice(i, 1); // Если после удаления объекта остался только один объект с оператором и blockId, удаляем весь блок условия
            i--;
          }
          break;
        }
      }
    }
  }
  /**
   * !Переделать удаление вопроса, удалить все условия связанные с этим вопросом
   */
  deleteQuestion(setSurvey, question, selectedBlock, setSelectedBlock) {
    console.log('question', question);
    console.log('selectedBlock', selectedBlock);

    const questionId = question.id;

    //Нашли блок в котором надо удалить
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );
    this._changeConditionAfterDeleteQuestion(questionId, block);
    console.log('block before', { ...block });
    if (block) {
      block.questions = block.questions.filter(a => a.id !== question.id);
    }
    console.log('block after', block);

    setSelectedBlock(prevState => ({
      ...prevState,
      data: { block: block },
    }));

    setSurvey({ ...this.currentSurvey });
  }

  addQuestion(setSurvey, question, selectedBlock, setSelectedBlock) {
    console.log('selectedBlock ', selectedBlock);
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    if (block) {
      const newId = uuidv4();
      block.questions.push({
        ...question,
        id: newId,
      });
    }

    const newBlock = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    setSelectedBlock(prevState => ({
      ...prevState,
      data: { block: newBlock },
    }));

    setSurvey({ ...this.currentSurvey });

    //setSurvey({ ...this.currentSurvey });
  }

  addQuestionBlock(setSurvey, nameBlock) {
    const newBlock = {
      id: uuidv4(),
      position: { x: 300, y: 300 },
      title: nameBlock,
      questions: [],
      nextBlock: { condition: [], unconditionallyJump: -1 },
    };

    this.currentSurvey.Survey.blocks.push(newBlock);
    setSurvey({ ...this.currentSurvey });
  }
  _findMissingIds(newArray, oldArray) {
    const newIds = new Set(newArray.map(obj => obj.id));
    const missingIds = [];

    for (const obj of oldArray) {
      if (!newIds.has(obj.id)) {
        missingIds.push(obj.id);
      }
    }

    return missingIds;
  }
  _changeConditionAfterDeleteOption(missingIds, block) {
    const conditions = block.nextBlock.condition;
    for (const id of missingIds) {
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        const operator = condition[0].Operator;

        switch (operator) {
          case 'and':
            let deleteBlock = false;
            for (let j = 1; j < condition.length; j++) {
              const answer = condition[j].answer.id;
              if (Array.isArray(answer)) {
                const index = answer.indexOf(id);
                if (index !== -1) {
                  answer.splice(index, 1); // Удаляем id из массива answer
                  if (answer.length === 0) {
                    condition.splice(j, 1); // Удаляем пустой объект с answer из условия
                    if (condition.length === 1) {
                      conditions.splice(i, 1); // Если остался только один объект с оператором и blockId, удаляем весь блок условия
                      i--;
                    }
                    break;
                  }
                }
              } else if (id === answer) {
                condition.splice(j, 1); // Удаляем конкретный объект с answer из условия
                if (condition.length === 1) {
                  conditions.splice(i, 1); // Если остался только один объект с оператором и blockId, удаляем весь блок условия
                  i--;
                }
                break;
              }
            }
            break;

          case 'or':
            for (let j = 1; j < condition.length; j++) {
              const answer = condition[j].answer.id;
              if (Array.isArray(answer)) {
                const index = answer.indexOf(id);
                if (index !== -1) {
                  answer.splice(index, 1); // Удаляем id из массива answer
                  if (answer.length === 0) {
                    condition.splice(j, 1); // Удаляем пустой объект с answer из условия
                    if (condition.length === 1) {
                      conditions.splice(i, 1); // Если остался только один объект с оператором и blockId, удаляем весь блок условия
                      i--;
                    }
                    break;
                  }
                }
              } else if (id === answer) {
                condition.splice(j, 1); // Удаляем конкретный объект с answer из условия
                if (condition.length === 1) {
                  conditions.splice(i, 1); // Если остался только один объект с оператором и blockId, удаляем весь блок условия
                  i--;
                }
                break;
              }
            }
            break;

          default:
            throw new Error('Ошибка в condition');
        }
      }
    }
  }
  _changeConditonAfterChangeOtherOption(questionId, block) {
    const conditions = block.nextBlock.condition;
    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i];
      for (let j = 1; j < condition.length; j++) {
        const answer = condition[j].answer;
        if (
          condition[j].questionId === questionId &&
          answer.isOtherOption === true
        ) {
          condition.splice(j, 1); // Удаляем объект с ответом { hasOtherOption: true }
          if (condition.length === 1) {
            conditions.splice(i, 1); // Если после удаления объекта остался только один объект с оператором и blockId, удаляем весь блок условия
            i--;
          }
          break;
        }
      }
    }
  }
  updateQuestion(setSurvey, question, selectedBlock, setSelectedBlock) {
    //Нашли блок в котором надо обновить
    const questionId = question.id;

    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    if (question.hasOtherOption === false)
      this._changeConditonAfterChangeOtherOption(questionId, block);

    console.log('block', { ...block });
    if (!block) throw new Error('Нет такого блока');

    const index = block.questions.findIndex(a => a.id === question.id);

    const questionOptions = question.options;
    const currentOptions = block.questions[index].options;

    const missingIds = this._findMissingIds(questionOptions, currentOptions);
    this._changeConditionAfterDeleteOption(missingIds, block);
    // console.log('questionOptions', questionOptions);
    // console.log('currentOptions', currentOptions);
    console.log('missingIds', missingIds);
    console.log('block', block);
    if (index !== -1) {
      block.questions[index] = { ...question };
    }

    setSelectedBlock(prevState => ({
      ...prevState,
      data: { block: block },
    }));

    setSurvey({ ...this.currentSurvey });
  }

  /**
   * Сетает текущий опрос
   * @param {Object} survey - весь объект опроса с названием
   */
  setCurrentSurvey(survey) {
    if (typeof survey !== 'object')
      throw new TypeError('Тип данных не подходит');
    this.currentSurvey = survey;
  }

  /**
   *
   * @param {int} blockId - id блока
   * @param {object} newPosition - объект с полями x и y
   * @param {function} setSurvey - сетает опрос
   */
  setBlockPosition(blockId, newPosition, setSurvey) {
    // //console.log('this.currentSurvey.Survey', this.currentSurvey.Survey);
    // const block = this.currentSurvey.Survey.blocks.find(
    //   block => block.id === blockId,
    // );
    // //console.log('bl0ock', block);
    // if (block) {
    //   block.position = newPosition;
    // }
    // //console.log('this.currentSurvey', this.currentSurvey);
    /**
     * ! пиздецу
     *  */

    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === blockId,
    );

    if (block) {
      block.position = newPosition;
    }

    setSurvey({ ...this.currentSurvey });
  }

  setBlockName(selectedBlock, newName, setSurvey) {
    console.log('selectedBlock', selectedBlock);
    console.log('newName', newName);
    console.log('this.currentSurvey', this.currentSurvey.Survey.blocks);
    const index = this.currentSurvey.Survey.blocks.findIndex(block => {
      const id = Number(selectedBlock.id) || selectedBlock.id;
      console.log('id', id);
      return block.id === id;
    });
    console.log('index', index);
    if (index !== -1) {
      this.currentSurvey.Survey.blocks[index].title = newName;
    }

    setSurvey({ ...this.currentSurvey });
  }
  /**
   *
   * @param {object} survey - опрос именно сами вопросы и ответы
   */
  setOnlySurvey(survey) {
    this.currentSurvey.Survey = survey;
  }
  getCurrentSurvey() {
    return this.currentSurvey;
  }
  get Survey() {
    return this.currentSurvey.Survey;
  }
  getBlockById(id) {
    return (
      this.currentSurvey.Survey.blocks.find(block => block.id === id) || -1
    );
  }

  addCondition(condition, selectedBlock, setSurvey, setSelectedBlock) {
    console.log('condition', condition);
    console.log('selectedBlock', selectedBlock);
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    if (!block) throw new Error('Нет такого блока');

    // if (!block.nextBlock) {
    //   block.nextBlock = { condition: [condition] };
    // } else {
    block.nextBlock.condition.push(condition);
    // }

    const newSelectedBlock = { ...selectedBlock };
    newSelectedBlock.data.block = block;

    setSelectedBlock(newSelectedBlock);

    setSurvey({ ...this.currentSurvey });
  }

  updateCondition(
    index,
    newCondition,
    selectedBlock,
    setSurvey,
    setSelectedBlock,
  ) {
    console.log('==index==', index);
    console.log('==newCondition==', newCondition);
    console.log('==selectedBlock==', selectedBlock);

    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );
    if (!block) throw new Error('Нет такого блока');

    block.nextBlock.condition[index] = newCondition;

    const newSelectedBlock = { ...selectedBlock };
    newSelectedBlock.data.block = block;

    setSelectedBlock(newSelectedBlock);

    setSurvey({ ...this.currentSurvey });
  }

  updateUnconditionallyJump(
    unconditionallyJump,
    selectedBlock,
    setSelectedBlock,
    setSurvey,
  ) {
    const block = this.currentSurvey.Survey.blocks.find(
      block => block.id === selectedBlock.data.block.id,
    );

    if (!block) throw new Error('Нет такого блока');
    block.nextBlock.unconditionallyJump = unconditionallyJump;

    const newSelectedBlock = { ...selectedBlock };
    newSelectedBlock.data.block = block;

    setSelectedBlock(newSelectedBlock);
    setSurvey({ ...this.currentSurvey });
  }
}

//    const parsedSurvey = JSON.parse(getedSurvey.Survey);
