import React, { useState } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useRedactSurvey } from './RedactSurveyProvider';
import Condition from './Condition';
import { v4 as uuidv4 } from 'uuid';

function AddAndEditConditionForm({
  isAdd = false,
  isEdit = false,
  show,
  setShow,
  selectedBlock,
  setSurveyFn,
  setSelectedBlock,
}) {
  const redact = useRedactSurvey();
  const [survey, setSurvey] = useState(redact.getCurrentSurvey());
  const [condition, setCondition] = useState([
    { Operator: 'and', blockId: '' },
  ]);

  console.log('survey', survey);
  console.log('[...condition]', [...condition]);

  const addCondition = () => {
    redact.addCondition(
      condition,
      selectedBlock,
      setSurveyFn,
      setSelectedBlock,
    );
    setShow(false);
  };
  return (
    <Modal show={show}>
      <Form style={{ padding: 30 }}>
        <Modal.Header className='mb-2'>
          <Modal.Title>
            {isAdd ? 'Форма добавления условия' : 'Форма обновления условия'}
          </Modal.Title>
        </Modal.Header>
        <FloatingLabel controlId='fromBlock' label='from' className='mb-2'>
          <Form.Select disabled={true} value={selectedBlock}>
            <option value={selectedBlock}>
              {selectedBlock.data.block.title}
            </option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId='toBlock' label='to' className='mb-2'>
          <Form.Select
            onChange={e => {
              const newBlockId = e.target.value;
              setCondition(prevCondition => [
                { ...prevCondition[0], blockId: newBlockId },
                ...prevCondition.slice(1), // оставляем остальные элементы без изменений
              ]);
            }}
          >
            <option>Выберите блок</option>
            {survey.Survey.blocks.map(block => {
              if (block.id + '' === selectedBlock.id) return <></>;
              return <option value={block.id}>{block.title}</option>;
            })}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId='toBlock' label='Условие' className='mb-2'>
          <Form.Select
            onChange={e => {
              const newOperator = e.target.value;
              setCondition(prevCondition => [
                { ...prevCondition[0], Operator: newOperator },
                ...prevCondition.slice(1), // оставляем остальные элементы без изменений
              ]);
            }}
          >
            <option value={'and'}>And</option>
            <option value={'or'}>Or</option>
          </Form.Select>
        </FloatingLabel>

        {condition.map((currentCondition, index) => {
          if (index === 0) return <></>;
          return (
            <Condition
              selectedBlock={selectedBlock}
              currentCondition={currentCondition}
              condition={condition}
              setCondition={setCondition}
              index={index}
              key={index}
            />
          );
        })}

        <Button
          variant='success'
          onClick={() =>
            setCondition([...condition, { questionId: '', answer: { id: '' } }])
          }
        >
          Добавить вопрос
        </Button>
        <Button
          onClick={() => {
            setShow(false);
            setCondition([{ Operator: 'and', blockId: '' }]);
          }}
        >
          Закрыть
        </Button>
        <Button variant='warning' onClick={addCondition}>
          Создать условие
        </Button>
      </Form>
    </Modal>
  );
}

export default AddAndEditConditionForm;
