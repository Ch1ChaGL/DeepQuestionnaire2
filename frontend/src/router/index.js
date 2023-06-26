import Admin from "../pages/Admin";
import Auth from "../pages/Auth";
import Survey from "../pages/Survey";

import { LOGIN_ROUTE, ADMIN_ROUTE, SURVEY_ROUTE } from "../utils/consts";

export const publicRoutes = [{ path: LOGIN_ROUTE, component: <Auth /> }];

export const authRoutes = [{path: SURVEY_ROUTE, component: <Survey />}];

export const adminRoutes = [{ path: ADMIN_ROUTE, component: <Admin />}];