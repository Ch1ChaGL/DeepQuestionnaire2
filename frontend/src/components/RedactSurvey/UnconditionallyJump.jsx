import React, { useEffect, useState } from 'react';
import s from './UnconditionallyJump.module.css';
import { Form } from 'react-bootstrap';
import { useRedactSurvey } from './RedactSurveyProvider';
import { useSurvey } from './SurveysProvider';
function UnconditionallyJump({ selectedBlock, setSelectedBlock, setSurvey }) {
  const redact = useRedactSurvey();

  //console.log('redact.getCurrentSurvey()', redact.getCurrentSurvey());

  const survey = useSurvey();
  const [unconditionalJump, setUnconditionalJump] = useState(
    selectedBlock.data.block.nextBlock?.unconditionallyJump || -1,
  );

  const [blocks, setBlocks] = useState([]);
  useEffect(() => {
    setBlocks(redact.getCurrentSurvey().Survey.blocks);
  }, [survey]);

  useEffect(() => {
    setUnconditionalJump(
      selectedBlock.data.block.nextBlock?.unconditionallyJump || -1,
    );
  }, [selectedBlock]);

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
        {blocks.map(block => {
          if (block.id === selectedBlock.id || block.id === '1') return <></>;
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
