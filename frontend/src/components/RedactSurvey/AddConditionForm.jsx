import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useRedactSurvey } from './RedactSurveyProvider';
import Condition from './Condition';
import { v4 as uuidv4 } from 'uuid';
import s from './AddConditionForm.module.css';
import DangerAlert from '../../components/UI/DangerAlert';

const checkCondition = condition => {
  let res = true;
  for (let i = 0; i < condition.length; i++) {
    if (i === 0) {
      if (condition[0].Operator === '' || condition[0].blockId === '')
        res = false;
      continue;
    }
    if (condition[i].questionId === '' || condition[i].answer?.id === '') {
      res = false;
    }
  }
  return res;
};

function AddConditionForm({
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
  const [showAlert, setShowAlert] = useState(false);

  console.log('survey', survey);
  console.log('[...condition]', [...condition]);

  const addCondition = () => {
    if (!checkCondition(condition)) {
      setShowAlert(true);
      return;
    }
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
      <DangerAlert
        show={showAlert}
        title={'При добавлении условия произошла ошибка'}
        message={'Возможно не все поля заполнены верно'}
        onHide={() => setShowAlert(false)}
      />
      <Form style={{ padding: 30 }}>
        <Modal.Header className='mb-2'>
          <Modal.Title>{'Форма добавления условия'}</Modal.Title>
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
            selected={condition.blockId}
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

        <div
          className={s.addBtn}
          onClick={() =>
            setCondition([...condition, { questionId: '', answer: { id: '' } }])
          }
        >
          Добавить вопрос
        </div>
        <div className={s.btns}>
          <div
            className={s.closeBtn}
            onClick={() => {
              setShow(false);
              setCondition([{ Operator: 'and', blockId: '' }]);
            }}
          >
            Закрыть
          </div>
          <div className={s.editBtn} onClick={addCondition}>
            Создать условие
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default AddConditionForm;
