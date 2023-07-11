import React from 'react';
import { Container } from 'react-bootstrap';
import SideBar from '../components/UI/SideBar';
import s from './Admin.module.css';
function Admin() {
  const items = [
    { text: 'Редактирование операторов' },
    { text: 'Редактирование опросов' },
  ];

  return (
    <Container style={{ height: '100vh', paddingTop: 50 }}>
      <SideBar />
    </Container>
  );
}

export default Admin;
