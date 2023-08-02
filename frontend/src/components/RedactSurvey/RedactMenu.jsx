import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RedactMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRedactMenuData } from '../../hooks/useRedactMenuData';
import NavigationPrompt from '../../components/UI/NavigationPrompt';

function RedactMenu({ nodes, setSurvey, survey }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const RedactMenuData = useRedactMenuData();

  const [showAlert, setShowAlert] = useState(false);
  const [prompt, setPrompt] = useState(null);

  const handleMenuItemClick = item => {
    if (item.close) {
      setPrompt(
        <NavigationPrompt
          title={'Выход из редактировния'}
          message={'Хотите сохранить опрос перед выходом?'}
          confirmText={'Да, сохранить'}
          cancelText={'Нет'}
          onCancel={() => item.fn(nodes, setSurvey, survey)}
          onConfirm={() => item.confirmFn()}
        />,
      );
    } else {
      item.fn(nodes, setSurvey, survey);
    }
  };

  return (
    <>
      {prompt}
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
                          handleMenuItemClick(item);
                        }
                      : () => {
                          console.log(item);
                          handleMenuItemClick(item);
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
