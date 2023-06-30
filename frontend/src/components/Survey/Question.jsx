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

const SINGLE_CHOISE_TYPE = 'singleChoice';
const MULTIPLE_CHOISE_TYPE = 'multipleChoice';

function Question({ question, answerTheQuestion, goBack }) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [isOthetAnswer, setIsOthetAnswer] = useState(false);

  console.log('options', question.options);
  const handleOptionChange = e => {
    setSelectedOption(parseInt(e.target.value));
    console.log(e.target.value);
  };

  const handleCheckboxChange = e => {
    const value = parseInt(e.target.value);

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
  };

  const answerClick = () => {
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
  } 

  return (
    <Card className='p-5' style={{ width: '700px' }}>
      <h1 className='text-left mb-4'>{question.text}</h1>
      <hr />
      <Form className='d-flex flex-column'>
        {question.type === SINGLE_CHOISE_TYPE ? (
          <div className='radioGroup'>
            {question.options.map((option, index) => (
              <Form.Check
                type={'radio'}
                value={index + 1}
                label={`${option}`}
                key={index}
                disabled={isOthetAnswer}
                name='radioGroup'
                checked={selectedOption === index + 1}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        ) : (
          <div className='checkboxGroup'>
            {question.options.map((option, index) => (
              <Form.Check
                type={'checkbox'}
                label={`${option}`}
                key={index}
                disabled={isOthetAnswer}
                value={index + 1}
                name='checkboxGroup'
                checked={selectedOptions.includes(index + 1)}
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
            <Button variant='outline-danger' onClick={backClick}>Назад</Button>
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
