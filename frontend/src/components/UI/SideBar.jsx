import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './SideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SidebarData } from '../../utils/consts';
function SideBar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <nav>
        <div className={`${s['sidebar']} ${sidebar ? '' : s['close']}`}>
          <div className={s['sidebar-header']}>
            <div className={s['sidebar-header__row']}>
              <div className={s['sidebar-header__title']}>Меню</div>
              <div className={s['sidebar-header__icon']} onClick={showSidebar}>
                <FontAwesomeIcon icon={faArrowLeft} size='xl' />
              </div>
            </div>
          </div>
          <div className={s['sidebar-items']}>
            {SidebarData.map(item => {
              return (
                <div
                  key={item.path}
                  className={`${s[item.cName]}`}
                  onClick={sidebar ? showSidebar : null}
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideBar;
