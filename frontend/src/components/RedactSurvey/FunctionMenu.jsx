import React, { useState } from 'react';
import s from './FunctionMenu.module.css';
import RedactQuestionCard from './RedactQuestionCard';
import EditAndAddQuestionForm from './EditAndAddQuestionForm';
function FunctionMenu({ selectedBlock, showFunctionMenu }) {
  console.log('selectedBlock', selectedBlock);
  const [show, setShow] = useState(false);
  if (!showFunctionMenu) return <></>;
  return (
    <div className={s.container}>
      <EditAndAddQuestionForm show={show} setShow={setShow} isAdd/>
      <div className={s.content}>
        {selectedBlock.data.block.questions.map(block => (
          <RedactQuestionCard question={block} selectedBlock={selectedBlock} />
        ))}
        <div className={s.addQuestion} onClick={() => setShow(true)}>
          Добавить
        </div>
      </div>
    </div>
  );
}

export default FunctionMenu;
