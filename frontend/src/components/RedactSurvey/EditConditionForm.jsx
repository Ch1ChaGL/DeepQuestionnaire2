import React, { useEffect, useState } from 'react';
import s from './EditConditionForm.module.css';
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap';
import Condition from './Condition';
import { useRedactSurvey } from './RedactSurveyProvider';
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

function EditConditionForm({
  show,
  setShow,
  selectedBlock,
  setSurveyFn,
  setSelectedBlock,
  index,
}) {
  const redact = useRedactSurvey();
  const [survey, setSurvey] = useState(redact.getCurrentSurvey());
  const [condition, setCondition] = useState(
    selectedBlock.data.block.nextBlock.condition[index],
  );
  const [showAlert, setShowAlert] = useState(false);
  //   console.log('seletedBLock', selectedBlock);
  console.log('condition', condition);

  const updateCondition = () => {
    if (!checkCondition(condition)) {
      setShowAlert(true);
      return;
    }
    redact.updateCondition(
      index,
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
        title={'При редактировании условия произошла ошибка'}
        message={'Возможно не все поля заполнены верно'}
        onHide={() => setShowAlert(false)}
      />
      <Form style={{ padding: 30 }}>
        <Modal.Header className='mb-2'>
          <Modal.Title>{'Форма обновления условия'}</Modal.Title>
        </Modal.Header>
        <FloatingLabel controlId='fromBlock' label='from' className='mb-2'>
          <Form.Select disabled={true}>
            <option value={selectedBlock} selected>
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
            {survey.Survey.blocks.map(block => {
              if (block.id + '' === selectedBlock.id) return <></>;
              return (
                <option
                  value={block.id}
                  selected={condition[0].blockId === block.id}
                >
                  {block.title}
                </option>
              );
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
            <option value={'and'} selected={condition[0].Operator === 'and'}>
              And
            </option>
            <option value={'or'} selected={condition[0].Operator === 'or'}>
              Or
            </option>
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
          variant='success'
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
            }}
          >
            Закрыть
          </div>
          <div
            className={s.editBtn}
            variant='warning'
            onClick={updateCondition}
          >
            Обновить условие
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default EditConditionForm;
