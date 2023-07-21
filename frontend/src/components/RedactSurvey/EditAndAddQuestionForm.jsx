import { Switch, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap';
import OptionCard from './OptionCard';

function EditAndAddQuestionForm({
  show,
  setShow,
  isAdd = false,
  isEdit = false,
}) {
  const [question, setQuestion] = useState({
    text: '',
    type: '',
    options: [],
    hasOtherOption: false,
  });

  console.log('question', question);

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
            <Form.Control type='text' />
          </FloatingLabel>
          <FloatingLabel
            controlId='questiontType'
            label='Тип ответов'
            className='mb-2'
          >
            <Form.Select>
              <option>Одиночный выбор</option>
              <option>Множественный выбор</option>
            </Form.Select>
          </FloatingLabel>

          <FormControlLabel
            control={<Switch name='gilad' />}
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
                type: '',
                options: [],
                hasOtherOption: false,
              });
            }}
          >
            Закрыть
          </Button>
        </Form>
      ) : (
        <></>
      )}
      {isEdit ? <></> : <></>}
    </Modal>
  );
}

export default EditAndAddQuestionForm;
