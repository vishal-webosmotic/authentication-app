import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from 'react';

import jwt_decode from 'jwt-decode';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const getAuth = useCallback(() => {
    var nameEQ = 'access_token' + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      // eslint-disable-next-line eqeqeq
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      // eslint-disable-next-line eqeqeq
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }, []);

  const [token, setToken] = useState(getAuth());
  // const [token, setToken] = useState(null);
  const setAuth = useCallback((res) => {
    setToken(res);
    const decoded = jwt_decode(res);
    const expires = decoded.exp;
    document.cookie = `access_token=${res || ''} expires=${expires}; path=/`;
    // document.cookie = `access_token=${res || ''} expires=${expires}; path=/`;
  }, []);

  const removeAuth = useCallback((name) => {
    setToken('');
    document.cookie =
      name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }, []);

  const value = useMemo(
    () => ({
      token,
      setAuth,
      removeAuth,
    }),
    [removeAuth, setAuth, token]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
