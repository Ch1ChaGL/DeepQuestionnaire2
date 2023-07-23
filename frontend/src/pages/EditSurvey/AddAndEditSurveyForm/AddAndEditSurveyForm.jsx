import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { addSurvey } from '../../../API/surveyApi';

function AddAndEditSurveyForm({ show, setShow, setSurvey }) {
  const [NewSurvey, setNewSurvey] = useState({
    Name: '',
    Survey: { blocks: [] },
  });

  const addNewSurvey = async () => {
    const newSurvey = NewSurvey;
    setSurvey(prev => [...prev, newSurvey]);
    setShow(false);
    await addSurvey(newSurvey);
    setNewSurvey({
      Name: '',
      Survey: { blocks: [] },
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
              QuizId: 0,
              Name: '',
              Survey: { blocks: [] },
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
