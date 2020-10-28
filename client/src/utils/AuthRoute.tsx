import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/auth';
interface IAuthRoute {
  exact: boolean;
  path: string;
  component: any;
}
const AuthRoute = ({ component: Component, ...rest }: IAuthRoute) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        user ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};
export default AuthRoute;
