import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import s from './DangerAlert.module.css';

function DangerAlert(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton className={s['error-modal']}>
        <Modal.Title id='contained-modal-title-vcenter'>
          <span style={{ color: '#ea868f' }}>ОШИБКА</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={s['error-modal']}>
        <h4 className={s['error-text']}>{props.title}</h4>
        <p className={s['error-text']}>{props.message}</p>
      </Modal.Body>
      <Modal.Footer className={s['error-modal']} style={{ backgroundColor:"#2c0b0e" }}>
        <Button onClick={props.onHide} variant='danger'>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DangerAlert;
