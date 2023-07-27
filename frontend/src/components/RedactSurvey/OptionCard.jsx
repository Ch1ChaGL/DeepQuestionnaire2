import React, { useState } from 'react';
import s from './OptionCard.module.css';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
function OptionCard({ option, setQuestion, question, index }) {
  const [questionTexs, setQuestionTexs] = useState(option);

  const handleChangeOption = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index].answer = value;
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
      <input
        type='text'
        className={s.input}
        value={option.answer}
        onChange={event => handleChangeOption(index, event.target.value)}
      />
      <div onClick={() => handleRemoveOption(index)} className={s.deleteBtn}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default OptionCard;
