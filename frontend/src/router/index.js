import { RedactSurveyProvider } from '../components/RedactSurvey/RedactSurveyProvider';
import Questions from '../components/Survey/Questions';
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import RedactSurveyPage from '../pages/RedactSurveyPage/RedactSurveyPage';
import ReportPage from '../pages/ReportPage';
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
  { path: SURVEY_HISTORY_ROUTE + '/:id', component: <ReportPage /> },
  {
    path: SURVEY_ROUTE,
    component: <Questions />,
  },
];

export const adminRoutes = [
  { path: ADMIN_ROUTE + '/home', component: <Admin /> },
  { path: ADMIN_ROUTE + '/applicationAccess', component: <Admin /> },
  { path: ADMIN_ROUTE + '/survey', component: <Admin /> },
  {
    path: ADMIN_ROUTE + '/survey/:id',
    component: (
      <RedactSurveyProvider>
        <RedactSurveyPage />
      </RedactSurveyProvider>
    ),
  },
];
