import React from 'react';
import s from './Card.module.css';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../../API/userApi';
function Card({ user, setUsers, users }) {
  const deleteUserFn = async () => {
    await deleteUser(user.UserId);
    setUsers(prevUsers => {
      // Отфильтровать старые данные и исключить пользователя
      const filteredUsers = prevUsers.filter(
        oldUser => oldUser.UserId !== user.UserId,
      );
      return filteredUsers;
    });
  };
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
          <Button className='me-2' variant='success'>
            Изменить
          </Button>
          <Button variant='danger' onClick={deleteUserFn}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
