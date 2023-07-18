import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RedactMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRedactMenuData } from '../../hooks/useRedactMenuData';
function RedactMenu({ nodes }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const RedactMenuData = useRedactMenuData();
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
            {RedactMenuData.map(item => {
              return (
                <div
                  key={item.title}
                  className={`${s[item.cName]}`}
                  onClick={
                    sidebar
                      ? () => {
                          showSidebar();
                          item.fn(nodes);
                        }
                      : () => {
                          console.log(item);
                          item.fn(nodes);
                        }
                  }
                >
                  <div>
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default RedactMenu;
