import React from 'react';
import s from './RedactQuestionCard.module.css';
import { Button } from 'react-bootstrap';
import { useRedactSurvey } from './RedactSurveyProvider';
function RedactQuestionCard({ question, selectedBlock, setSurvey, setSelectedBlock }) {
  console.log('question', question);
  console.log('selectedBlock', selectedBlock);
  const redact = useRedactSurvey();
  return (
    <div className={s.container}>
      <div className={s.content}>{question.text}</div>
      <Button>Редактировать</Button>
      <Button
        variant='danger'
        onClick={() =>
          redact.deleteQuestion(
            setSurvey,
            question,
            selectedBlock,
            setSelectedBlock,
          )
        }
      >
        Удалить
      </Button>
    </div>
  );
}

export default RedactQuestionCard;
