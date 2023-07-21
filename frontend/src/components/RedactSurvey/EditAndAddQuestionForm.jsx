import { Switch, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { Modal, Form, FloatingLabel } from 'react-bootstrap';
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
    options: ['Ответ 1', 'Ответ 2'],
    hasOtherOption: false,
  });

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
          {question.options.map(option => {
            return <OptionCard option={option} setQuestion={setQuestion} />;
          })}
        </Form>
      ) : (
        <></>
      )}
      {isEdit ? <></> : <></>}
    </Modal>
  );
}

export default EditAndAddQuestionForm;
