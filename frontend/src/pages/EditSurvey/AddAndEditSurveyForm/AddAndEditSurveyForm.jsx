import React, { useState } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { addSurvey, getSurvey } from '../../../API/surveyApi';
import s from './AddAndEditSurveyForm.module.css';
const startBlock = {
  id: '1',
  title: 'Стартовый блок',
  position: { x: 300, y: 300 },
  questions: [],
  nextBlock: { condition: [], unconditionallyJump: -1 },
};

function AddAndEditSurveyForm({ show, setShow, setSurvey }) {
  const fetchSurvey = async () => {
    const getedSurvey = await getSurvey();
    setSurvey(getedSurvey);
  };

  const [NewSurvey, setNewSurvey] = useState({
    Name: '',
    Survey: {
      blocks: [startBlock],
    },
  });

  const addNewSurvey = async () => {
    const newSurvey = NewSurvey;

    setShow(false);
    console.log('newSurvey', newSurvey);
    await addSurvey(newSurvey);
    await fetchSurvey();
    setNewSurvey({
      Name: '',
      Survey: {
        blocks: [startBlock],
      },
    });
  };
  return (
    <Modal show={show}>
      <Form style={{ padding: 30 }}>
        <Modal.Header className='mb-2'>
          <Modal.Title>Форма добавления опроса</Modal.Title>
        </Modal.Header>
        <FloatingLabel label={'Название опроса'}>
          <Form.Control
            type='text'
            value={NewSurvey.Name}
            className='mb-2'
            maxLength={100}
            onChange={e => setNewSurvey({ ...NewSurvey, Name: e.target.value })}
          />
        </FloatingLabel>

        <div className={s.btns}>
          <div
            className={s.closeBtn}
            onClick={() => {
              setShow(false);
              setNewSurvey({
                Name: '',
                Survey: {
                  blocks: [startBlock],
                },
              });
            }}
          >
            Закрыть
          </div>
          <div onClick={addNewSurvey} className={s.addBtn}>
            Добавить
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default AddAndEditSurveyForm;
