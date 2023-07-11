import React from 'react';
import { Container } from 'react-bootstrap';
import SideBar from '../components/UI/SideBar';

function Admin() {
  return (
    <div style={{ height: '100vh', paddingTop: 80 }}>
      <SideBar />
      <Container></Container>
    </div>
  );
}

export default Admin;
