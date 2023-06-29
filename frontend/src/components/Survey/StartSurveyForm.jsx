import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { getSurvey } from '../../API/surveyApi';
import { useSurveyUpdater, useSurveyInformation } from './SurveyProvider';
import { useNavigate } from 'react-router-dom';
import { SURVEY_ROUTE } from '../../utils/consts';
import DangerAlert from '../UI/DangerAlert';

const ALERT_TITTLE='При начале опроса произошла ошибка';
const ALERT_MESSAGE='Пожалуйста, убедитесь, что все важные поля заполнены'

function StartSurveyForm({ setIsStarted }) {
  const [selectedSurveyId, setSelectedSurveyId] = useState(0);
  const [survey, setSurvey] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [CompanyName, setCompanyName] = useState('');
  const [RespondentName, setRespondentName] = useState('');
  const [JobTitle, setJobTitle] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Email, setEmail] = useState('');

  useEffect(() => {
    fetchSurvey();
  }, []);

  //хуки для работы с опросом
  //Для обновления блоков вопросов
  const updateSurveyData = useSurveyUpdater();
  const updateSurveyInformation = useSurveyInformation();

  const fetchSurvey = async () => {
    const survey = await getSurvey();
    console.log('survey', survey);
    setSurvey(survey);
  };

  const start = () => {
    console.log('selectedSurveyId', selectedSurveyId);
    if (selectedSurveyId === 0) {
      console.log('Я тут');
      setShowAlert(true);
      return;
    }
    const selectedSurvey = survey.find(
      survey => survey.QuizId === selectedSurveyId,
    );
    console.log('selectedSurvey', selectedSurvey);
    updateSurveyData(selectedSurvey);

    //Добавляем в стор данные о опросе
    updateSurveyInformation.setInformation({
      CompanyName,
      RespondentName,
      JobTitle,
      PhoneNumber,
      Email,
      QuizTime: new Date(),
    });

    setIsStarted(true);
  };

  const selectSurvey = e => {
    const id = parseInt(e.target.value);
    setSelectedSurveyId(id);
    if (id === 0) {
      console.log(selectedSurveyId);
      setIsValid(false);
      return;
    }
    setIsValid(true);
  };

  return (
    <Container
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center'
    >
      {showAlert && (
        <DangerAlert show={showAlert} onHide={() => setShowAlert(false)} title={ALERT_TITTLE} message={ALERT_MESSAGE}/>
      )}
      <Card className='p-4' style={{ width: '700px' }}>
        <Form noValidate>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='FullName'>ФИО</InputGroup.Text>
            <Form.Control
              placeholder='Введите ФИО'
              aria-label='FullName'
              aria-describedby='FullName'
              type='text'
              value={RespondentName}
              onChange={e => setRespondentName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='CompanyName'>Должность</InputGroup.Text>
            <Form.Control
              placeholder='Введите должность'
              aria-label='JobTitle'
              aria-describedby='JobTitle'
              type='text'
              value={JobTitle}
              onChange={e => setJobTitle(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='CompanyName'>
              Название компании
            </InputGroup.Text>
            <Form.Control
              placeholder='Введите название компании'
              aria-label='CompanyName'
              aria-describedby='CompanyName'
              type='text'
              value={CompanyName}
              onChange={e => setCompanyName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='PhoneNumber'>Номер телефона</InputGroup.Text>
            <Form.Control
              placeholder='Введите номер телефона'
              aria-label='PhoneNumber'
              aria-describedby='PhoneNumber'
              type='text'
              value={PhoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='Email'>Email</InputGroup.Text>
            <Form.Control
              placeholder='Введите Email'
              aria-label='Email'
              aria-describedby='Email'
              type='text'
              value={Email}
              onChange={e => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-3' hasValidation>
            <InputGroup.Text id='Survey'>Опрос</InputGroup.Text>
            <Form.Select
              aria-label='Survey'
              onChange={selectSurvey}
              isValid={isValid}
              isInvalid={!isValid}
            >
              <option value={0}>Выберите опрос перед началом</option>
              {survey.map(currentSurvey => (
                <option key={currentSurvey.QuizId} value={currentSurvey.QuizId}>
                  {currentSurvey.Name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Form>
        <Button variant='outline-success' onClick={start}>
          Начать
        </Button>
      </Card>
    </Container>
  );
}

export default StartSurveyForm;
