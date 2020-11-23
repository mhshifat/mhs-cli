import React from 'react';
import { Route } from "react-router-dom";
import { routes } from './routes';

const Routes = () => {
  return routes.map(route => <Route key={route.path} {...route} />);
};

export default Routes;
