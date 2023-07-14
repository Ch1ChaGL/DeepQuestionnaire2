import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SideBar from '../components/UI/SideBar';
import { useLocation } from 'react-router-dom';
import ApplicationAccess from './ApplicationAccess/ApplicationAccess';
import EditSurvey from './EditSurvey';
import Home from './Home';
import { ADMIN_ROUTE } from '../utils/consts';

function Admin() {
  const location = useLocation();
  const [contentComponent, setContentComponent] = useState(null);

  useEffect(() => {
    switch (location.pathname) {
      case ADMIN_ROUTE + '/applicationAccess':
        setContentComponent(<ApplicationAccess />);
        break;
      case ADMIN_ROUTE + '/survey':
        setContentComponent(<EditSurvey />);
        break;
      default:
        setContentComponent(<Home />);
    }
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, backgroundColor: '#b5e7e8'}}>
      <SideBar />
      <div style={{ paddingLeft: 80 }}>{contentComponent}</div>
    </div>
  );
}

export default Admin;
