import { Switch, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap';
import OptionCard from './OptionCard';
import { v4 as uuidv4 } from 'uuid';
import { useRedactSurvey } from './RedactSurveyProvider';
function EditAndAddQuestionForm({
  show,
  setShow,
  isAdd = false,
  isEdit = false,
  setSurvey,
  selectedBlock,
}) {
  const redact = useRedactSurvey();
  const [question, setQuestion] = useState({
    text: '',
    type: 'singleChoice',
    options: [],
    hasOtherOption: false,
  });

  console.log('question', question);

  const addQuestion = () => {
    redact.addQuestion(setSurvey, question, selectedBlock);
    setShow(false);
  };

  const handleAddOption = () => {
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      options: [...prevQuestion.options, 'Новый ответ'],
    }));
  };

  if (isAdd && isEdit)
    throw new Error('Компонент не может быть и добавляющим и изменяющим');
  return (
    <Modal show={show}>
      {isAdd ? (
        <Form style={{ padding: 30 }}>
          <Modal.Header className='mb-2'>
            <Modal.Title>Форма добавления вопроса</Modal.Title>
          </Modal.Header>
          <FloatingLabel
            controlId='questionText'
            label='Вопрос'
            className='mb-2'
          >
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
                //value={question.hasOtherOption}
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
                option={option}
                index={index}
                setQuestion={setQuestion}
                question={question}
              />
            );
          })}
          <Button onClick={handleAddOption}>Добавить вариант ответа</Button>
          <Button
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
          </Button>
          <Button onClick={addQuestion}>Добавить вопрос</Button>
        </Form>
      ) : (
        <></>
      )}
      {isEdit ? <></> : <></>}
    </Modal>
  );
}

export default EditAndAddQuestionForm;
