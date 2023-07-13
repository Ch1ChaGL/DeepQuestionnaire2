import React from 'react';
import s from './Card.module.css';
import { Button, Container } from 'react-bootstrap';
function Card({ user }) {
  return (
    <div className={s.container}>
      <div className={s.row}>
        <div className={s.information}>
          <div className={s.name}>
            <span>ФИО: </span>
            {user.FullName}
          </div>
          <div className={s.email}>
            <span>Email: </span>
            {user.Email}
          </div>
        </div>
        <div className={s.buttons}>
          <Button className='me-2'>Изменить</Button>
          <Button>Удалить</Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
