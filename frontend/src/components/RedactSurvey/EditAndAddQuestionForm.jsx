import { Switch, FormControlLabel } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap';
import OptionCard from './OptionCard';
import s from './EditAndAddQuestionForm.module.css';
import { useRedactSurvey } from './RedactSurveyProvider';
import { v4 as uuidv4 } from 'uuid';
function EditAndAddQuestionForm({
  show,
  setShow,
  isAdd = false,
  isEdit = false,
  setSurvey,
  selectedBlock,
  setSelectedBlock,
  selectedQuestion,
}) {
  const redact = useRedactSurvey();
  console.log('selectedQuestion', selectedQuestion);
  const [question, setQuestion] = useState(
    selectedQuestion || {
      text: '',
      type: 'singleChoice',
      options: [],
      hasOtherOption: false,
    },
  );

  console.log('question', question);
  const addQuestion = () => {
    redact.addQuestion(setSurvey, question, selectedBlock, setSelectedBlock);
    setShow(false);

    setQuestion({
      text: '',
      type: 'singleChoice',
      options: [],
      hasOtherOption: false,
    });
  };

  const updateQuestion = () => {
    console.log('Обновление');
    redact.updateQuestion(setSurvey, question, selectedBlock, setSelectedBlock);
    setShow(false);
    setQuestion({
      text: '',
      type: 'singleChoice',
      options: [],
      hasOtherOption: false,
    });
  };
  const handleAddOption = () => {
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      options: [
        ...prevQuestion.options,
        { id: uuidv4(), answer: 'Новый ответ' },
      ],
    }));
  };

  if (isAdd && isEdit)
    throw new Error('Компонент не может быть и добавляющим и изменяющим');
  return (
    <Modal show={show}>
      <Form style={{ padding: 30 }}>
        <Modal.Header className='mb-2'>
          <Modal.Title>
            {isAdd ? 'Форма добавления вопроса' : 'Форма обновления вопроса'}
          </Modal.Title>
        </Modal.Header>
        <FloatingLabel controlId='questionText' label='Вопрос' className='mb-2'>
          <Form.Control
            type='text'
            value={question.text}
            onChange={e => setQuestion({ ...question, text: e.target.value })}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId='questiontType'
          label='Тип ответов'
          className='mb-2'
        >
          <Form.Select
            onChange={e => setQuestion({ ...question, type: e.target.value })}
            value={question.type}
          >
            <option value={'singleChoice'}>Одиночный выбор</option>
            <option value={'multipleChoice'}>Множественный выбор</option>
          </Form.Select>
        </FloatingLabel>

        <FormControlLabel
          control={
            <Switch
              checked={question.hasOtherOption}
              onChange={e =>
                setQuestion({
                  ...question,
                  hasOtherOption: !question.hasOtherOption,
                })
              }
            />
          }
          label='Можно ответить по-другому'
        />
        <Modal.Title>Варианты ответов</Modal.Title>
        {question.options.map((option, index) => {
          return (
            <OptionCard
              key={option.id}
              option={option}
              index={index}
              setQuestion={setQuestion}
              question={question}
            />
          );
        })}
        <div onClick={handleAddOption} className={s.addQuestionbtn}>
          Добавить вариант ответа
        </div>
        <div className={s.buttons}>
          <div
            className={s.close}
            onClick={() => {
              setShow(false);
              setQuestion({
                text: '',
                type: 'singleChoice',
                options: [],
                hasOtherOption: false,
              });
            }}
          >
            Закрыть
          </div>
          <div
            onClick={isAdd ? addQuestion : updateQuestion}
            className={s.save}
          >
            {isAdd ? 'Добавить вопрос' : 'Обновить вопрос'}
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default EditAndAddQuestionForm;
