import React, { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import s from './Condition.module.css';
function Condition({ selectedBlock, condition, setCondition, index }) {
  console.log('selectedBlock', selectedBlock);

  console.log('condition', condition);
  const [options, setOptions] = useState({
    type: 'singleChoice',
    options: [],
    hasOtherOption: false,
  });
  const [isOtherOption, setIsOtherOption] = useState(false);
  const [questionId, setQuestionId] = useState('');
  useEffect(() => {
    const getedQuestionId = condition[index].questionId;
    const question = selectedBlock.data.block.questions.find(
      question => question.id + '' === getedQuestionId + '',
    );

    if (question) {
      console.log('&&&question&&&', question);
      setOptions({
        type: question.type,
        options: question.options,
        hasOtherOption: question.hasOtherOption,
      });
      setQuestionId(getedQuestionId);
      if (condition[index].answer?.isOtherOption) {
        setIsOtherOption(condition[index].answer?.isOtherOption);
      }
    } else {
      setOptions({
        type: 'singleChoice',
        options: [],
        hasOtherOption: false,
      });
      setQuestionId('');
    }
  }, []);
  console.log('<--options-->', options);

  const changeQuestion = e => {
    const questionId = e.target.value;
    console.log('questionId', questionId);
    const question = selectedBlock.data.block.questions.find(
      question => question.id + '' === questionId + '',
    );
    console.log('question', question);
    setOptions({
      type: question.type,
      options: question.options,
      hasOtherOption: question.hasOtherOption,
    });

    console.log('condition', condition);
    const newCondition = [...condition];

    // Находим элемент с нужным индексом и обновляем его свойство questionId
    newCondition[index] = {
      ...newCondition[index],
      questionId: questionId,
      answer: { id: '' },
    };

    // Устанавливаем обновленный массив в состояние
    setCondition(newCondition);
  };

  const changeSwitchHandler = () => {
    const newCondition = [...condition];

    setIsOtherOption(!isOtherOption);
    console.log('isOtherOption', isOtherOption);
    newCondition[index] = {
      ...newCondition[index],
      answer: !isOtherOption ? { isOtherOption: true } : { id: '' },
    };
    setCondition(newCondition);
  };

  const radioChangeHandler = e => {
    const answerId = e.target.value;
    const newAnswer = { id: answerId };

    setCondition(prevCondition => {
      const newCondition = [...prevCondition];
      newCondition[index] = {
        ...newCondition[index],
        answer: newAnswer,
      };
      return newCondition;
    });
  };

  const checkboxChangeHandler = e => {
    const answerId = e.target.value;

    setCondition(prevCondition => {
      const newCondition = [...prevCondition];
      const answerArray = Array.isArray(newCondition[index].answer.id)
        ? newCondition[index].answer.id
        : [];

      const updatedAnswer = e.target.checked
        ? [...answerArray, answerId] // Добавляем новый элемент в массив, если checkbox выбран
        : answerArray.filter(item => item !== answerId); // Удаляем элемент из массива, если checkbox не выбран

      newCondition[index] = {
        ...newCondition[index],
        answer: { id: updatedAnswer },
      };

      return newCondition;
    });
  };

  console.log('options', options);
  return (
    <div className={s.container}>
      <FloatingLabel label={'Вопрос'}>
        <Form.Select
          onChange={changeQuestion}
          value={condition[index].questionId}
        >
          <option value='' disabled selected>
            Выберите вопрос
          </option>
          {selectedBlock.data.block.questions.map(question => (
            <option
              value={question.id}
              selectedBlock={question.id === questionId}
            >
              {question.text}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      {options.type === 'singleChoice'
        ? options.options.map(option => (
            <Form.Check
              name={condition[index].questionId + `-${index}`}
              type={'radio'}
              value={option.id}
              disabled={isOtherOption}
              label={option.answer}
              checked={option.id === condition[index].answer.id}
              onChange={radioChangeHandler}
            />
          ))
        : options.options.map(option => (
            <Form.Check
              type={'checkbox'}
              disabled={isOtherOption}
              name={condition[index].questionId + `-${index}`}
              value={option.id}
              label={option.answer}
              checked={
                !isOtherOption &&
                Array.isArray(condition[index].answer.id) &&
                condition[index].answer.id.includes(option.id)
              }
              onChange={checkboxChangeHandler}
            />
          ))}
      {options.hasOtherOption ? (
        <Form.Check
          type='switch'
          id='custom-switch'
          label='Ответ текстом'
          onChange={changeSwitchHandler}
          checked={isOtherOption}
        />
      ) : (
        <></>
      )}
      <Button
        className='mt-2'
        variant='danger'
        onClick={() => {
          const newCondition = [...condition];
          newCondition.splice(index, 1); // Удаляем 1 элемент с указанного индекса
          setCondition(newCondition);
        }}
      >
        Удалить
      </Button>
    </div>
  );
}

export default Condition;
