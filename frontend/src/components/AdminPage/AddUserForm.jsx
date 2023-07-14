import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { getRoles } from '../../API/roleApi';
import { registration } from '../../API/userApi';
import DangerAlert from '../UI/DangerAlert';
function AddUserForm({ show, setShow, setUsers }) {
  const [newUser, setNewUser] = useState({
    FullName: '',
    Email: '',
    Password: '',
    RoleId: 1,
  });
  const [repeatPassword, setRepeatPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const getedRoles = await getRoles();
    setRoles(getedRoles);
  };

  const addNewUser = async event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (newUser.Password !== repeatPassword) return;
    setValidated(true);
    if (form.checkValidity() === false) {
      return;
    }

    try {
      if (newUser.Password !== repeatPassword)
        throw new Error('Пароли не совпадают');
      const createdUser = await registration(newUser);

      setUsers(prevValue => {
        return [...prevValue, createdUser];
      });

      setRepeatPassword('');
      setShow(false);
    } catch (e) {
      const errMessage = e.response?.data.message || e.message || '';
      setShowAlert(true);
      setErrorMessage(errMessage);
    }
  };
  return (
    <>
      {showAlert && (
        <DangerAlert
          show={showAlert}
          onHide={() => setShowAlert(false)}
          title={'При удалении произошла ошибка'}
          message={errMessage}
        />
      )}
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Форма создания пользователя</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={addNewUser}>
          <Modal.Body>
            <FloatingLabel controlId='FullName' label='ФИО'>
              <Form.Control
                type='text'
                placeholder='ФИО'
                className='mb-3'
                value={newUser.FullName}
                isValid={newUser.FullName !== ''}
                isInvalid={!(newUser.FullName!== '')}
                onChange={e =>
                  setNewUser({ ...newUser, FullName: e.target.value })
                }
                required
              />
            </FloatingLabel>
            <FloatingLabel label='Email'>
              <Form.Control
                type='text'
                placeholder='Email'
                className='mb-3'
                isValid={newUser.Email !== ''}
                isInvalid={!(newUser.Email !== '')}
                value={newUser.Email}
                onChange={e =>
                  setNewUser({ ...newUser, Email: e.target.value })
                }
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId='floatingFullName' label='Роль'>
              <Form.Select
                type='text'
                className='mb-3'
                required
                value={newUser.RoleId}
                isValid={true}
                onChange={e =>
                  setNewUser({ ...newUser, RoleId: e.target.value })
                }
              >
                {roles.map(role => (
                  <option value={role.RoleId} key={role.RoleId}>
                    {role.Name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId='password' label='Пароль'>
              <Form.Control
                type='password'
                placeholder='Введите пароль'
                className='mb-3'
                value={newUser.Password}
                isValid={
                  newUser.Password === repeatPassword &&
                  newUser.Password !== '' &&
                  repeatPassword !== ''
                }
                isInvalid={
                  !(newUser.Password === repeatPassword) ||
                  (newUser.Password === '' && repeatPassword === '')
                }
                onChange={e =>
                  setNewUser({ ...newUser, Password: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel controlId='repeatPassword' label='Повторите пароль'>
              <Form.Control
                type='password'
                placeholder='Повторите пароль'
                className='mb-3'
                value={repeatPassword}
                isValid={
                  (newUser.Password === repeatPassword &&
                    newUser.Password !== '') &&
                  repeatPassword !== ''
                }
                isInvalid={
                  !(newUser.Password === repeatPassword) ||
                  (newUser.Password === '' && repeatPassword === '')
                }
                onChange={e => setRepeatPassword(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                setNewUser({
                  FullName: '',
                  RoleId: 1,
                  Email: '',
                  Password: '',
                });
                setShow(false);
                setRepeatPassword('');
              }}
            >
              Закрыть
            </Button>
            <Button variant='primary' type='submit'>
              Добавить пользователя
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddUserForm;
