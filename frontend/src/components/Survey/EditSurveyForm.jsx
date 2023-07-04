import React, { useState, useContext } from 'react';
import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import MyDateTimePicker from '../UI/MyDateTimePicker';
import ScrollButton from '../UI/ScrollButton';
import NavigationPrompt from '../UI/NavigationPrompt';

function EditSurveyForm({ report, redBtn, greenBtn }) {
  const [editedReport, setEditedReport] = useState(report);
  const { QuizTime } = report;
  const formattedQuizTime = QuizTime.toLocaleString();
  console.log('QuizTime', QuizTime);
  console.log('formattedQuizTime', formattedQuizTime);
  const [showPromt, setShowPromt] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedReport(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = data => {
    console.log('editedReport.QuizTime', editedReport.QuizTime);
    setEditedReport(prevState => ({
      ...prevState,
      QuizTime: data.$d,
    }));
  };

  const handleSurveyInputChange = (e, question) => {
    const { value } = e.target;
    setEditedReport(prevState => ({
      ...prevState,
      Survey: {
        ...prevState.Survey,
        [question]: value,
      },
    }));
  };

  const showPromtfn = () => {
    setShowPromt(true);
  };

  //Тут можно было спокойно пройтись map по editedReport
  return (
    <>
      {showPromt ? (
        <NavigationPrompt
          title={redBtn.promptTitle}
          message={redBtn.promptMessage}
          onCancel={() => setShowPromt(false)}
          onConfirm={() => redBtn.fn(editedReport)}
          cancelText={redBtn.promptCancelText}
          confirmText={redBtn.promptConfirmText}
        />
      ) : (
        <></>
      )}

      <ScrollButton />
      <Card className='p-5 mb-5' style={{ width: '700px' }}>
        <Form>
          <h2>Отчет</h2>
          <Form.Group className='mb-3' controlId='FullName'>
            <Form.Label>ФИО</Form.Label>
            <Form.Control
              type='text'
              name='RespondentName'
              value={editedReport.RespondentName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='Email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              name='Email'
              value={editedReport.Email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='PhoneNumber'>
            <Form.Label>Номер телефона</Form.Label>
            <Form.Control
              type='text'
              name='PhoneNumber'
              value={editedReport.PhoneNumber}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='CompanyName'>
            <Form.Label>Название компании</Form.Label>
            <Form.Control
              type='text'
              name='CompanyName'
              value={editedReport.CompanyName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='JobTitle'>
            <Form.Label>Должность</Form.Label>
            <Form.Control
              type='text'
              name='JobTitle'
              value={editedReport.JobTitle}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='QuizTime'>
            <Form.Label style={{ display: 'block' }}>
              Дата и время прохождения опроса
            </Form.Label>
            <MyDateTimePicker
              name='QuizTime'
              initialSurveyData={formattedQuizTime}
              onDateChange={handleDateChange}
            />
          </Form.Group>

          <h2>Результат опроса</h2>
          {Object.entries(editedReport.Survey).map(([question, answer]) => (
            <Form.Group key={question} className='mb-3' controlId={question}>
              <Form.Label>{question}</Form.Label>
              <Form.Control
                type='text'
                name={question}
                value={answer}
                onChange={e => handleSurveyInputChange(e, question)}
              />
            </Form.Group>
          ))}
          <Row className='d-flex justify-content-between'>
            <Col>
              <Button variant='outline-danger' onClick={showPromtfn}>
                {redBtn.text}
              </Button>
            </Col>
            <Col className='text-end'>
              <Button
                variant='outline-success'
                onClick={() => greenBtn.fn(editedReport)}
              >
                {greenBtn.text}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}

export default EditSurveyForm;
