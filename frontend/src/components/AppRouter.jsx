import React, { useContext } from "react";
import { Context } from "..";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, authRoutes, adminRoutes } from "../router";
import { LOGIN_ROUTE } from "../utils/consts";
function AppRouter() {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      {user.getRole === 2 &&
        adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
      <Route path="*" element={<Navigate replace to={LOGIN_ROUTE} />} />
    </Routes>
  );
}

export default AppRouter;
