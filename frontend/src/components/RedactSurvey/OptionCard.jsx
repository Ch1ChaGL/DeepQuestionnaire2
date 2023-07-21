import React, { useState } from 'react';
import s from './OptionCard.module.css';
import { Button, Form } from 'react-bootstrap';

function OptionCard({ option, setQuestion, question, index }) {
  const [questionTexs, setQuestionTexs] = useState(option);

  const handleChangeOption = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    setQuestion(prevQuestion => ({ ...prevQuestion, options: updatedOptions }));
  };

  const handleRemoveOption = index => {
    const updatedOptions = question.options.filter((_, i) => i !== index);
    console.log('index:', index);
    console.log('updatedOptions', updatedOptions);
    setQuestion(prevQuestion => ({ ...prevQuestion, options: updatedOptions }));
  };

  return (
    <div className={s.container}>
      <Form.Control
        type='text'
        value={option}
        onChange={event => handleChangeOption(index, event.target.value)}
      />
      <Button onClick={() => handleRemoveOption(index)}>Удалить</Button>
    </div>
  );
}

export default OptionCard;
