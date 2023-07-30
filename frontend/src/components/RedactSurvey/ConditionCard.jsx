import React, { useEffect, useState } from 'react';
import s from './ConditionCard.module.css';
import { useRedactSurvey } from './RedactSurveyProvider';
function ConditionCard({ sourceBlockId, targetBlockId, index }) {
  const redact = useRedactSurvey();
  const [sourceBlock, setSourceBlock] = useState({ title: '' });
  const [targetBlock, setTargetBlock] = useState({ title: '' });

//   console.log('sourceBlock', sourceBlock);
//   console.log('targetBlock', targetBlock);
  useEffect(() => {
    const source = redact.getBlockById(sourceBlockId);
    const target = redact.getBlockById(targetBlockId);

    setSourceBlock(source);
    setTargetBlock(target);
  }, []);
  return (
    <div>
      <div>{`Приоритет ${index + 1}`}</div>
      <div>{`${sourceBlock.title} --> ${targetBlock.title}`}</div>
    </div>
  );
}

export default ConditionCard;
