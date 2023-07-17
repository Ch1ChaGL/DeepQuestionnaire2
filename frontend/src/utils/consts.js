import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faUser,
  faSquarePollVertical,
  faHouse,
  faPlus,
  faFloppyDisk,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = '/login';
export const SURVEY_ROUTE = '/survey';
export const SURVEY_HISTORY_ROUTE = '/surveyHistory';

export const sortListInSurveyHistory = [
  { text: 'Сначала новые', value: 'newReports' },
  { text: 'Сначала старые', value: 'oldReports' },
];

export const SidebarData = [
  {
    title: 'Главная',
    path: ADMIN_ROUTE + '/home',
    icon: <FontAwesomeIcon icon={faHouse} />,
    cName: 'nav-text',
  },
  {
    title: 'Доступ к приложению',
    path: ADMIN_ROUTE + '/applicationAccess',
    icon: <FontAwesomeIcon icon={faUser} />,
    cName: 'nav-text',
  },
  {
    title: 'Управление опросами',
    path: ADMIN_ROUTE + '/survey',
    icon: <FontAwesomeIcon icon={faSquarePollVertical} />,
    cName: 'nav-text',
  },
];

export const useRedactMenuData = () => {
  const navigate = useNavigate();
  const data = [
    {
      title: 'Добавить блок вопросов',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faPlus} />,
    },
    {
      title: 'Сохранить',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faFloppyDisk} />,
      fn: nodes => {
        /**
         * !Сохранение и все такое, можно отдельный класс написать думаю даже
         */
      },
    },
    {
      title: 'Выйти',
      cName: 'nav-text',
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      fn: () => navigate(ADMIN_ROUTE + '/survey'),
    },
  ];
  return data;
};
