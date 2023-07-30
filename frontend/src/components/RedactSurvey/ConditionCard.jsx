import React, { useEffect, useState } from 'react';
import s from './ConditionCard.module.css';
import { useRedactSurvey } from './RedactSurveyProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ConditionCard({ sourceBlockId, targetBlockId, index }) {
  const redact = useRedactSurvey();
  const [sourceBlock, setSourceBlock] = useState({ title: '' });
  const [targetBlock, setTargetBlock] = useState({ title: '' });

  useEffect(() => {
    const source = redact.getBlockById(sourceBlockId);
    const target = redact.getBlockById(targetBlockId);

    setSourceBlock(source);
    setTargetBlock(target);
  }, []);

  return (
    <div className={s.content}>
      <div className={s.title}>{`Приоритет ${index + 1}`}</div>
      <div className={s.condition}>
        <FontAwesomeIcon icon={faArrowRight} className='me-2'/>
        {`${targetBlock.title}`}
      </div>
    </div>
  );
}

export default ConditionCard;
