import React, { useContext } from 'react';
import { Navbar, NavDropdown, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SURVEY_HISTORY_ROUTE,
  SURVEY_ROUTE,
} from '../../utils/consts';
import { check, logout } from '../../API/userApi';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
const MyNavbar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const logoutClick = () => {
    logout();
    user.setIsAuth(false);
    user.setUser({});
    navigate(LOGIN_ROUTE);
  };
  return (
    <Navbar expand='lg' className='bg-dark bg-gradient' fixed='top'>
      <Container>
        <Navbar.Brand className='text-light'>
          <img src='/img/logo.svg' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link className='text-light'>
              <div onClick={() => navigate(SURVEY_ROUTE)}>Опрос</div>
            </Nav.Link>
            <Nav.Link className='text-light'>
              <div
                onClick={async () => {
                  const checkedUser = await check();
                  user.setUser(checkedUser);
                  navigate(SURVEY_HISTORY_ROUTE);
                }}
              >
                История опросов
              </div>
            </Nav.Link>
            <NavDropdown
              title='Другое'
              id='basic-nav-dropdown'
              className='test'
            >
              <NavDropdown.Item
                onClick={async () => {
                  const checkedUser = await check();
                  user.setUser(checkedUser);
                  navigate(ADMIN_ROUTE + '/survey');
                }}
              >
                Админ панель
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutClick}>Выход</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default MyNavbar;
