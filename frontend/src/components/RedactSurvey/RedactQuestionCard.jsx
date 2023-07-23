import React, { useState } from 'react';
import s from './RedactQuestionCard.module.css';
import { Button } from 'react-bootstrap';
import { useRedactSurvey } from './RedactSurveyProvider';
import EditAndAddQuestionForm from './EditAndAddQuestionForm';
function RedactQuestionCard({
  question,
  selectedBlock,
  setSurvey,
  setSelectedBlock,
}) {
  const redact = useRedactSurvey();
  const [showEditMenu, setShowEditMenu] = useState(false);
  return (
    <>
      {question && showEditMenu ? (
        <EditAndAddQuestionForm
          show={showEditMenu}
          setShow={setShowEditMenu}
          isEdit
          setSurvey={setSurvey}
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
          selectedQuestion={question}
        />
      ) : (
        <></>
      )}
      <div className={s.container}>
        <div className={s.content}>{question.text}</div>
        <Button onClick={() => setShowEditMenu(true)}>Редактировать</Button>
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
    </>
  );
}

export default RedactQuestionCard;
