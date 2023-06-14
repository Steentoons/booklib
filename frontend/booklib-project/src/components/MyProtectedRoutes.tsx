import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { MyContext } from './MyContextProvider';

interface MyProtectedRouteProps {
    path: string;
    element: JSX.Element;
}

const MyProtectedRoute = ({ path, element }: MyProtectedRouteProps) => {
  const { user } = useContext(MyContext);

  if (user) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default MyProtectedRoute;