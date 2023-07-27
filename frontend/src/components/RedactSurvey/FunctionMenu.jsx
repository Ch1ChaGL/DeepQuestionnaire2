import React, { useState, useEffect } from 'react';
import s from './FunctionMenu.module.css';
import RedactQuestionCard from './RedactQuestionCard';
import EditAndAddQuestionForm from './EditAndAddQuestionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRedactSurvey } from './RedactSurveyProvider';
import { Button } from 'react-bootstrap';
function FunctionMenu({
  selectedBlock,
  showFunctionMenu,
  setSurvey,
  setShowFunctionMenu,
  setSelectedBlock,
}) {
  console.log('selectedBlock', selectedBlock);
  const redact = useRedactSurvey();

  useEffect(
    () => setBlockName(selectedBlock.data.block.title),
    [selectedBlock],
  );
  const [show, setShow] = useState(false);
  const [blockName, setBlockName] = useState(selectedBlock.data.block.title);

  const nameChange = e => {
    const newName = e.target.value;
    setBlockName(newName);
    redact.setBlockName(selectedBlock, newName, setSurvey);
  };
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
            <input value={blockName} onChange={nameChange} />
            {selectedBlock.data.block.questions.map(block => (
              <RedactQuestionCard
                question={block}
                selectedBlock={selectedBlock}
                key={block.id}
                setSelectedBlock={setSelectedBlock}
                setSurvey={setSurvey}
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
            {selectedBlock.data.block.id === 1 ? (
              <></>
            ) : (
              <Button variant='danger'>Удалить</Button>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FunctionMenu;
