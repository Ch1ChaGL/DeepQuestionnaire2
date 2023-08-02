import React, { useEffect, useState } from 'react';
import s from './ConditionCard.module.css';
import { useRedactSurvey } from './RedactSurveyProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import EditConditionForm from './EditConditionForm';

function ConditionCard({
  sourceBlockId,
  targetBlockId,
  index,
  setSurvey,
  selectedBlock,
  setSelectedBlock,
}) {
  const redact = useRedactSurvey();
  const [sourceBlock, setSourceBlock] = useState({ title: '' });
  const [targetBlock, setTargetBlock] = useState({ title: '' });

  const [show, setShow] = useState(false);

  useEffect(() => {
    const source = redact.getBlockById(sourceBlockId);
    const target = redact.getBlockById(targetBlockId);

    setSourceBlock(source);
    setTargetBlock(target);
  }, []);

  const deleteCondition = () => {
    redact.deleteCondition(
      sourceBlock,
      index,
      setSurvey,
      selectedBlock,
      setSelectedBlock,
    );
  };

  const updateCondition = () => {
    setShow(true);
  };

  return (
    <div className={s.content}>
      {show ? (
        <EditConditionForm
          show={show}
          setShow={setShow}
          selectedBlock={selectedBlock}
          setSurveyFn={setSurvey}
          setSelectedBlock={setSelectedBlock}
          index={index}
        />
      ) : (
        <></>
      )}
      <div className={s.title}>
        <div>{`Приоритет ${index + 1}`}</div>
        <div className={s.btns}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className={s.editBtn}
            size='sm'
            onClick={updateCondition}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className={s.deleteBtn}
            onClick={deleteCondition}
            size='sm'
          />
        </div>
      </div>
      <div className={s.condition}>
        <FontAwesomeIcon icon={faArrowRight} className='me-2' />
        {`${targetBlock.title}`}
      </div>
    </div>
  );
}

export default ConditionCard;
