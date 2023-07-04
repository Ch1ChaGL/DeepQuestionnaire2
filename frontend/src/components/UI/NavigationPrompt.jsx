import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import s from './NavigationPrompt.module.css';

function NavigationPrompt({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) {
  return (
    <Modal
      show
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onHide={onCancel}
    >
      <Modal.Header closeButton className={s['prompt-modal']}>
        <Modal.Title id='contained-modal-title-vcenter'>
          <span className={s['prompt-title']}>Предупреждение</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={s['prompt-modal']}>
        <h4 className={s['prompt-text']}>{title}</h4>
        <p className={s['prompt-text']}>{message}</p>
      </Modal.Body>
      <Modal.Footer
        className={s['prompt-modal']}
        style={{ backgroundColor: '#2c0b0e' }}
      >
        <Button onClick={onConfirm} variant='success'>
          {confirmText}
        </Button>
        <Button onClick={onCancel} variant='secondary'>
          {cancelText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NavigationPrompt;
