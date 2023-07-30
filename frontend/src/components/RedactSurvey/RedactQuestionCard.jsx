import React, { useState } from 'react';
import s from './RedactQuestionCard.module.css';
import { Button } from 'react-bootstrap';
import { useRedactSurvey } from './RedactSurveyProvider';
import EditAndAddQuestionForm from './EditAndAddQuestionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

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
        <div className={s.buttons}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => setShowEditMenu(true)}
            className={s.editBtn}
          />
          <FontAwesomeIcon
            onClick={() =>
              redact.deleteQuestion(
                setSurvey,
                question,
                selectedBlock,
                setSelectedBlock,
              )
            }
            icon={faTrash}
            className={s.deleteBtn}
          />
        </div>
      </div>
    </>
  );
}

export default RedactQuestionCard;
