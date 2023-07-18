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

