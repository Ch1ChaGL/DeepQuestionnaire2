import React, { useState, useEffect } from 'react';
import s from './EditUserForm.module.css';
import { getRoles } from '../../API/roleApi';
function EditUserForm({ show, setShow, userId }) {
  const [roles, setRoles] = useState([]);
  const [editUser, setEditUser] = useState({
    UserId: '',
    RoleId: '',
    FullName: '',
    Email: '',
  });
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const getedRoles = await getRoles();
    setRoles(getedRoles);
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Форма редактирования пользователя</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId='FullName' label='ФИО'>
              <Form.Control type='text' placeholder='ФИО' className='mb-3' />
            </FloatingLabel>
            <FloatingLabel label='Email'>
              <Form.Control type='text' placeholder='Email' className='mb-3' />
            </FloatingLabel>
            <FloatingLabel controlId='floatingFullName' label='Роль'>
              <Form.Select type='text' className='mb-3'>
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
              Добавить пользователя
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditUserForm;
