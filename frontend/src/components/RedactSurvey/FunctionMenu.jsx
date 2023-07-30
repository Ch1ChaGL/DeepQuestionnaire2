import React, { useState, useEffect } from 'react';
import s from './FunctionMenu.module.css';
import RedactQuestionCard from './RedactQuestionCard';
import EditAndAddQuestionForm from './EditAndAddQuestionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRedactSurvey } from './RedactSurveyProvider';
import { Button } from 'react-bootstrap';
import ConditionCard from './ConditionCard';

function FunctionMenu({
  selectedBlock,
  showFunctionMenu,
  setSurvey,
  setShowFunctionMenu,
  setSelectedBlock,
}) {
  console.log('selectedBlock', selectedBlock);
  const redact = useRedactSurvey();
  const [conditions, setConditions] = useState(null);
  useEffect(() => {
    const conditions = selectedBlock.data.block.nextBlock?.condition || null;
    setConditions(conditions);
  }, [selectedBlock]);
 
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

  const deleteBlock = () => {
    redact.deleteBlockFn(setSurvey, selectedBlock);
    setShowFunctionMenu(false);
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
            <h1 className={s.title}>Вопросы</h1>
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

            <h1 className={s.title}>Условия перехода</h1>

            {conditions ? (
              conditions.map((condition, index) => (
                <ConditionCard
                  sourceBlockId={selectedBlock.data.block.id}
                  targetBlockId={condition[0].blockId}
                  index={index}
                />
              ))
            ) : (
              <></>
            )}

            <div
              onClick={() => setShowFunctionMenu(false)}
              className={s.closeBtn}
            >
              Закрыть
            </div>
            {selectedBlock.data.block.id === 1 ? (
              <></>
            ) : (
              <Button variant='danger' onClick={deleteBlock}>
                Удалить блок
              </Button>
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
