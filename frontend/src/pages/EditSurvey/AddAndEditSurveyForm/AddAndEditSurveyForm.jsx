import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { addSurvey, getSurvey } from '../../../API/surveyApi';

const startBlock = {
  id: "1",
  title: 'Стартовый блок',
  position: { x: 300, y: 300 },
  questions: [],
  parentBlock: null,
  nextBlock: null,
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
        <Form.Control
          type='text'
          value={NewSurvey.Name}
          onChange={e => setNewSurvey({ ...NewSurvey, Name: e.target.value })}
        />
        <Button onClick={addNewSurvey}>Добавить</Button>
        <Button
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
        </Button>
      </Form>
    </Modal>
  );
}

export default AddAndEditSurveyForm;
