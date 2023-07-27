import React, { useState } from 'react';
import {
  Container,
  Form,
  Card,
  Col,
  FloatingLabel,
  Row,
  Button,
  Divider,
} from 'react-bootstrap';
import DangerAlert from '../UI/DangerAlert';

const SINGLE_CHOISE_TYPE = 'singleChoice';
const MULTIPLE_CHOISE_TYPE = 'multipleChoice';

function Question({ question, answerTheQuestion, goBack }) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [isOthetAnswer, setIsOthetAnswer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleOptionChange = e => {
    setSelectedOption(e.target.value);
    console.log(e.target.value);
  };

  const handleCheckboxChange = e => {
    const value = e.target.value;

    // Проверяем, есть ли значение в массиве
    if (selectedOptions.includes(value)) {
      // Если значение уже есть в массиве, удаляем его
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      // Если значение отсутствует в массиве, добавляем его
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const zeroing = () => {
    setSelectedOption(0);
    setSelectedOptions([]);
    setAnswerText('');
    setIsOthetAnswer(false);
  };

  const answerClick = () => {
    if (
      !isOthetAnswer &&
      selectedOption === 0 &&
      selectedOptions.length === 0
    ) {
      setShowAlert(true);
      return;
    }
    if (isOthetAnswer) {
      answerTheQuestion(answerText, true);
    } else if (question.type === SINGLE_CHOISE_TYPE) {
      answerTheQuestion(selectedOption, false);
    } else if (question.type === MULTIPLE_CHOISE_TYPE) {
      console.log(selectedOptions);
      answerTheQuestion(selectedOptions, false);
    }
    zeroing();
  };

  const backClick = () => {
    zeroing();
    goBack();
  };

  return (
    <Card className='p-5' style={{ width: '700px' }}>
      {showAlert && (
        <DangerAlert
          show={showAlert}
          onHide={() => setShowAlert(false)}
          title={'При ответе на вопрос произошла ошибка'}
          message={
            'Пожалуйста убедитесь, что вы выбрали хотя бы один вариант ответа'
          }
        />
      )}
      <h1 className='text-left mb-4'>{question.text}</h1>
      <hr />
      <Form className='d-flex flex-column'>
        {question.type === SINGLE_CHOISE_TYPE ? (
          <div className='radioGroup'>
            {question.options.map((option, index) => (
              <Form.Check
                type={'radio'}
                value={option.id}
                label={`${option.answer}`}
                key={index}
                disabled={isOthetAnswer}
                name='radioGroup'
                checked={selectedOption === option.id}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        ) : (
          <div className='checkboxGroup'>
            {question.options.map((option, index) => (
              <Form.Check
                type={'checkbox'}
                label={`${option.answer}`}
                key={index}
                disabled={isOthetAnswer}
                value={option.id}
                name='checkboxGroup'
                checked={selectedOptions.includes(option.id)}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        )}
        <hr />
        {question.hasOtherOption ? (
          <Form.Group className='mb-3' controlId='anotherQuestion'>
            <Form.Check // prettier-ignore
              type='switch'
              id='custom-switch'
              label='Другой ответ'
              checked={isOthetAnswer}
              onChange={e => {
                setIsOthetAnswer(e.target.checked);
              }}
            />
            <Form.Label>Другое:</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              disabled={!isOthetAnswer}
              value={answerText}
              onChange={e => setAnswerText(e.target.value)}
            />
          </Form.Group>
        ) : (
          <></>
        )}

        <Row className='d-flex justify-content-between mt-3'>
          <Col>
            <Button variant='outline-danger' onClick={backClick}>
              Назад
            </Button>
          </Col>
          <Col className='text-end'>
            <Button variant='outline-success' onClick={answerClick}>
              Ответить
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default Question;
