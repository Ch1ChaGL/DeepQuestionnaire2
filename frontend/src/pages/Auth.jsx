import React, { useState, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';

import DangerAlert from '../components/UI/DangerAlert';
import { login } from '../API/userApi';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { SURVEY_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const Auth = observer(() => {
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();
  const click = async e => {
    try {
      const data = await login(email, password);
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SURVEY_ROUTE);
    } catch (e) {
      console.log('e', e);
      setErrMessage(e.response.data.message);
      setShowAlert(true);
    }
  };
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      {showAlert && (
        <DangerAlert
          show={showAlert}
          onHide={() => setShowAlert(false)}
          title={'При входе произошла ошибка'}
          message={errMessage}
        />
      )}
      <Card className='p-5' style={{ width: '700px' }}>
        <h1 className='text-center'>Авторизация</h1>
        <Form className='d-flex flex-column'>
          <FloatingLabel
            controlId='floatingInput'
            label='Email address'
            className='mb-3'
          >
            <Form.Control
              type='email'
              placeholder='name@example.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId='floatingPassword' label='Password'>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FloatingLabel>

          <Row className='d-flex justify-content-between mt-3'>
            <Col className='text-end'>
              <Button variant='outline-success' onClick={click}>
                Войти
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
