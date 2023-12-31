import React, { useState } from 'react';
import s from './Card.module.css';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../../API/userApi';
import DangerAlert from '../../components/UI/DangerAlert';
import NavigationPrompt from '../../components/UI/NavigationPrompt';
import EditUserForm from '../../components/AdminPage/EditUserForm';
function Card({ user, setUsers, users }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showPromt, setShowPromt] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [show, setShow] = useState(false);
  const deleteUserFn = async () => {
    setShowPromt(false);
    try {
      await deleteUser(user.UserId);
      setUsers(prevUsers => {
        // Отфильтровать старые данные и исключить пользователя
        const filteredUsers = prevUsers.filter(
          oldUser => oldUser.UserId !== user.UserId,
        );
        return filteredUsers;
      });
    } catch (e) {
      setShowAlert(true);
      setErrMessage(e.response.data.message);
    }
  };
  return (
    <>
      <EditUserForm
        show={show}
        setShow={setShow}
        userId={user.UserId}
        setUsers={setUsers}
      />
      <div className={s.container}>
        {showAlert && (
          <DangerAlert
            show={showAlert}
            onHide={() => setShowAlert(false)}
            title={'При удалении произошла ошибка'}
            message={errMessage}
          />
        )}
        {showPromt && (
          <NavigationPrompt
            title={'ВНИМАНИЕ!!! УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ'}
            message={`Вы пытаетесь удалить пользователя (${user.FullName}), это последнее предупреждение, вы точно хотите продолжить?`}
            onCancel={() => setShowPromt(false)}
            onConfirm={async () => await deleteUserFn()}
            cancelText={'Закрыть'}
            confirmText={'Да, удалить'}
          />
        )}
        <div className={s.row}>
          <div className={s.information}>
            <div className={s.id}>
              <span style={{ fontWeight: 'bold' }}>№: </span>
              <span style={{ fontWeight: 'bold' }}>{user.UserId}</span>
            </div>
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
            <div
              className={s.editBtn}
              onClick={() => setShow(true)}
            >
              Изменить
            </div>
            <div className={s.deleteBtn} onClick={() => setShowPromt(true)}>
              Удалить
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
