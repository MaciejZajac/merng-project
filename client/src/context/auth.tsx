import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
interface IAuthContext {
  user: any;
  login: (item: any) => void;
  logout: () => void;
}
const initialContext: IAuthContext = {
  user: null,
  login: (data: any) => {},
  logout: () => {},
};

const initialState = {
  user: null,
};
if (localStorage.getItem('jwtToken')) {
  const decodedToken: any = jwtDecode(
    localStorage.getItem('jwtToken') as string
  );

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext(initialContext);

function authReducer(state: any, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData: any) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
