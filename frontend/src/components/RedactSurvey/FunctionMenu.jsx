import React, { useState } from 'react';
import s from './FunctionMenu.module.css';
import RedactQuestionCard from './RedactQuestionCard';
import EditAndAddQuestionForm from './EditAndAddQuestionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function FunctionMenu({
  selectedBlock,
  showFunctionMenu,
  setSurvey,
  setShowFunctionMenu,
  setSelectedBlock
}) {
  console.log('Рисую с ', selectedBlock);
  const [show, setShow] = useState(false);
  return (
    <div className={`${s['container']} ${showFunctionMenu ? s['show'] : ''}`}>
      {showFunctionMenu ? (
        <>
          <EditAndAddQuestionForm
            show={show}
            setShow={setShow}
            isAdd
            setSurvey={setSurvey}
            selectedBlock={selectedBlock}
            setSelectedBlock={setSelectedBlock}
          />
          <div className={s.content}>
            {selectedBlock.data.block.questions.map(block => (
              <RedactQuestionCard
                question={block}
                selectedBlock={selectedBlock}
                key={block.id}
              />
            ))}

            <div className={s.addQuestion} onClick={() => setShow(true)}>
              <FontAwesomeIcon icon={faPlus} /> Новый вопрос
            </div>
            <div
              onClick={() => setShowFunctionMenu(false)}
              className={s.closeBtn}
            >
              Закрыть
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FunctionMenu;
