import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './SideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { SidebarData } from '../../utils/consts';
function SideBar({ style }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className={s['navbar']} style={style}>
        <div className={s['burger']}>
          <FontAwesomeIcon
            icon={faBars}
            size='xl'
            onClick={showSidebar}
            style={{  cursor:'pointer' }}
          />
        </div>
      </div>
      <nav className={`${s['nav-menu']} ${sidebar ? s['active'] : ''}`}>
        <ul className={s['nav-menu-items']}>
          <li className={s['navbar-toggle']}>
            <div className={s['menu-bars']}>
              <FontAwesomeIcon icon={faX} size='xl' style={{ color: '#fff', cursor:'pointer' }} onClick={showSidebar}/>
            </div>
          </li>
          {SidebarData.map(item => {
            return (
              <li key={item.path} className={s[item.cName]} onClick={showSidebar}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
