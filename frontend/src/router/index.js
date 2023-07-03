import Questions from '../components/Survey/Questions';
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import Survey from '../pages/Survey';
import SurveyHistory from '../pages/SurveyHistory/SurveyHistory';

import {
  LOGIN_ROUTE,
  ADMIN_ROUTE,
  SURVEY_ROUTE,
  SURVEY_HISTORY_ROUTE,
} from '../utils/consts';

export const publicRoutes = [{ path: LOGIN_ROUTE, component: <Auth /> }];

export const authRoutes = [
  { path: SURVEY_ROUTE, component: <Survey /> },
  { path: SURVEY_HISTORY_ROUTE, component: <SurveyHistory /> },
  {
    path: SURVEY_ROUTE,
    component: <Questions />,
  },
];

export const adminRoutes = [{ path: ADMIN_ROUTE, component: <Admin /> }];
