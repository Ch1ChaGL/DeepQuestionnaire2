import React from 'react';
import { Card } from 'react-bootstrap';
import dayjs from 'dayjs';

const SurveyCard = ({
  Time,
  Name,
  CompanyName,
  JobTitle,
  Email,
  Phone,
  Id,
}) => {
  const formattedDate = dayjs(Time).format(
    'DD-MM-YYYY HH:mm:ss',
  );

  return (
    <Card className='flex-grow-1 flex-basis-0'>
      <Card.Header className='bg-dark text-light'>Опрос №{Id}</Card.Header>
      <Card.Body className='bg-dark'>
        <Card.Text className='text-light'> Время опроса: {formattedDate}</Card.Text>
        <Card.Text className='text-light'>ФИО: {Name}</Card.Text>
        <Card.Text className='text-light'>Должность: {JobTitle}</Card.Text>
        <Card.Text className='text-light'>Название компании: {CompanyName}</Card.Text>
        <Card.Text className='text-light'>Email: {Email}</Card.Text>
        <Card.Text className='text-light'>Номер телефона: {Phone}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SurveyCard;
