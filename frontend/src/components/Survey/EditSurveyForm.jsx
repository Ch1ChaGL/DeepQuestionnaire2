import React, { useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import MyDateTimePicker from '../UI/MyDateTimePicker';
import ScrollButton from '../UI/ScrollButton';

function EditSurveyForm({ report }) {
  const [editedReport, setEditedReport] = useState(report);
  const { QuizTime } = report;
  const formattedQuizTime = QuizTime.toLocaleString();

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

  const handleSubmit = e => {
    e.preventDefault();
    // Handle the edited report data
    console.log(editedReport);
    // Perform any necessary actions, such as updating the report on the server
  };

  //Тут можно было спокойно пройтись map по editedReport
  return (
    <>
      <ScrollButton />
      <Card className='p-5 mb-5' style={{ width: '700px' }}>
        <Form onSubmit={handleSubmit}>
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
          <button
            onClick={() => console.log('МОЕ ВРЕМЯ', editedReport.QuizTime)}
          >
            Сохранить
          </button>
        </Form>
      </Card>
    </>
  );
}

export default EditSurveyForm;
