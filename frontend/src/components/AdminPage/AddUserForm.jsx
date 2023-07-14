import React, { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
function AddUserForm({ show, setShow }) {
  const [newUser, setNewUser] = useState({
    FullName: '',
    Email: '',
    Password: '',
    RoleId: 0,
  });
  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={() => setShow(false)}>
        <Modal.Title>Форма создания пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel controlId='FullName' label='ФИО'>
            <Form.Control type='text' placeholder='ФИО' className='mb-3'/>
          </FloatingLabel>
          <FloatingLabel controlId='Email' label='Email'>
            <Form.Control type='text' placeholder='Email' className='mb-3'/>
          </FloatingLabel>
          <FloatingLabel controlId='floatingFullName' label='Роль'>
            <Form.Select type='text' className='mb-3'>
                <option>Role 1</option>
                <option>Role 2</option>
                <option>Role 3</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId='password' label='Пароль'>
            <Form.Control type='text' placeholder='Введите пароль' className='mb-3'/>
          </FloatingLabel>
          <FloatingLabel controlId='repeatPassword' label='Повторите пароль'>
            <Form.Control type='text' placeholder='Повторите пароль' className='mb-3'/>
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShow(false)}>
          Закрыть
        </Button>
        <Button variant='primary' onClick={() => setShow(false)}>
          Добавить пользователя
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserForm;
