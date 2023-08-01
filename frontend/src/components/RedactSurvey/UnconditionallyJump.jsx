import React, { useEffect, useState } from 'react';
import s from './UnconditionallyJump.module.css';
import { Form } from 'react-bootstrap';
import { useRedactSurvey } from './RedactSurveyProvider';
function UnconditionallyJump({ selectedBlock, setSelectedBlock, setSurvey }) {
  const redact = useRedactSurvey();
  const surveyMy = redact.getCurrentSurvey();
  //console.log('redact.getCurrentSurvey()', redact.getCurrentSurvey());

  const [unconditionalJump, setUnconditionalJump] = useState(
    selectedBlock.data.block.nextBlock?.unconditionallyJump || -1,
  );

//   const [blocks, setBlocks] = useState([]);
//   useEffect(() => {
//     setBlocks();
//   }, [surveyMy]);

  useEffect(() => {
    setUnconditionalJump(
      selectedBlock.data.block.nextBlock?.unconditionallyJump || -1,
    );
  }, [selectedBlock]);

  console.log('selectedBlock в этом компонете', selectedBlock);
  const changeUnconditionallyJump = e => {
    redact.updateUnconditionallyJump(
      e.target.value,
      selectedBlock,
      setSelectedBlock,
      setSurvey,
    );
    setUnconditionalJump(e.target.value);
  };
  return (
    <div className={s.content}>
      <div className={s.title}>Переход без условия</div>
      <Form.Select
        value={unconditionalJump}
        onChange={changeUnconditionallyJump}
      >
        <option value={-1}>Нет</option>
        {redact.getCurrentSurvey().Survey.blocks.map(block => {
          if (block.id === selectedBlock.id) return <></>;
          return (
            <option value={block.id} key={block.id}>
              {block.title}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
}

export default UnconditionallyJump;
