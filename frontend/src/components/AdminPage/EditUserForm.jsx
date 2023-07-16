import React, { useState, useEffect } from 'react';
import s from './EditUserForm.module.css';
import { getRoles } from '../../API/roleApi';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { getUser, updateUser } from '../../API/userApi';
import DangerAlert from '../UI/DangerAlert';
function EditUserForm({ show, setShow, userId, setUsers }) {
  const [roles, setRoles] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [showErrAlert, setShowErrAlert] = useState(false);
  const [editUser, setEditUser] = useState({
    UserId: 0,
    FullName: '',
    Email: '',
    RoleId: 3,
  });

  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const getedRoles = await getRoles();
    setRoles(getedRoles);
  };
  const fetchUser = async () => {
    const getedUser = await getUser(userId);
    setEditUser(getedUser[0]);
  };

  const updateUserFn = async e => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    try {
      const updatedUser = await updateUser(editUser);
      setUsers(prevValue => {
        return prevValue.map(user => {
          if (user.UserId === updatedUser.UserId) {
            return updatedUser;
          }
          return user;
        });
      });
      setShow(false);
    } catch (err) {
      const errMessage = err.response?.data.message || err.message || '';
      console.log('err.response?.data.message', err.response?.data.message);
      console.log('err.message', err.message);
      setShowErrAlert(true);
      setErrMessage(errMessage);
    }
  };
  return (
    <>
      {showErrAlert && (
        <DangerAlert
          show={showErrAlert}
          onHide={() => setShowErrAlert(false)}
          title={'При обновлении произошла ошибка'}
          message={errMessage}
        />
      )}
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Форма редактирования пользователя</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={updateUserFn}>
          <Modal.Body>
            <FloatingLabel controlId='FullName' label='ФИО'>
              <Form.Control
                type='text'
                placeholder='ФИО'
                className='mb-3'
                value={editUser.FullName}
                onChange={e =>
                  setEditUser({
                    ...editUser,
                    FullName: e.target.value,
                  })
                }
                isValid={editUser.FullName !== ''}
                isInvalid={editUser.FullName === ''}
                required
              />
            </FloatingLabel>
            <FloatingLabel label='Email'>
              <Form.Control
                type='text'
                placeholder='Email'
                className='mb-3'
                value={editUser.Email}
                onChange={e =>
                  setEditUser({
                    ...editUser,
                    Email: e.target.value,
                  })
                }
                isValid={editUser.Email !== ''}
                isInvalid={editUser.Email === ''}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId='floatingRoleId' label='Роль'>
              <Form.Select
                type='text'
                className='mb-3'
                onChange={e =>
                  setEditUser({
                    ...editUser,
                    RoleId: e.target.value,
                  })
                }
                value={editUser.RoleId}
                isValid
                required
              >
                {roles.map(role => (
                  <option value={role.RoleId} key={role.RoleId}>
                    {role.Name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                setShow(false);
              }}
            >
              Закрыть
            </Button>
            <Button variant='primary' type='submit'>
              Обновить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditUserForm;
