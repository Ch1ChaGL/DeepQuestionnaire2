import React from 'react';
import { Button } from 'react-bootstrap';
import s from './SideBar.module.css';
import { useNavigate } from 'react-router-dom';
function SideBar() {
  const navigate = useNavigate();
  return <div style={{ paddingTop: 300, position: 'relative' }}></div>;
}

export default SideBar;
