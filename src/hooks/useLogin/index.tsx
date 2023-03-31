import { createContext, useContext, useEffect, useState } from 'react';
import { iCurrentUser, iTokenPayload, iUserLogin } from '../../@types/index';
import api from '../../services';
import jwtDecode from 'jwt-decode';
import { AddZeros, formatLocalDate } from '../../utils';

type iStateLogin = {
  isLogged: boolean;
  isError: boolean;
  errorMsg: string;
  isLoading: boolean;
  currentUser: iCurrentUser;
  loginUser: (user: iUserLogin) => void;
  logoutUser: () => void;
};

const LoginContext = createContext({} as iStateLogin);

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const TOKEN_NAME_STORE = '@EMAutoToken';
  const USER_NAME_STORE = '@EMAutoUser';
  const ROUTE_LOGIN = 'SistemaService/Login';

  const [isError, setIsError] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState<iCurrentUser>(
    {} as iCurrentUser
  );

  const VerifyToken = (token: string | null): boolean => {
    if (token === null) return false;

    const expirationDate = new Date(
      formatLocalDate(jwtDecode<iTokenPayload>(token).Validade, 'dd/MM/yyyy')
    );

    let today = new Date();

    setCurrentUser({
      Usuario: jwtDecode<iTokenPayload>(token).Usuario,
      Master: jwtDecode<iTokenPayload>(token).Master,
      Libera: jwtDecode<iTokenPayload>(token).Libera,
      NivelLibera: jwtDecode<iTokenPayload>(token).NivelLibera,
    });

    return expirationDate >= today;
  };

  useEffect(() => {
    let token = localStorage.getItem(TOKEN_NAME_STORE);

    setIsLogged(false);

    if (VerifyToken(token)) {
      setIsLogged(true);

      api.defaults.headers.common.Accept = '*/*';
      api.defaults.headers.common['Content-Type'] = 'application/json';
      api.defaults.headers.common.Authorization =
        'bearer ' + token?.replace(/[""]/g, '');
    }
  }, []);

  const loginUser = async (user: iUserLogin) => {
    setIsError(false);
    setIsLoading(true);
    api
      .post(ROUTE_LOGIN, user)
      .then(async (response) => {
        const userLogin = response.data;

        setIsLogged(VerifyToken(userLogin.value));

        setCurrentUser({
          Usuario: jwtDecode<iTokenPayload>(userLogin.value).Usuario,
          Master: jwtDecode<iTokenPayload>(userLogin.value).Master,
          Libera: jwtDecode<iTokenPayload>(userLogin.value).Libera,
          NivelLibera: jwtDecode<iTokenPayload>(userLogin.value).NivelLibera,
        });

        localStorage.setItem(TOKEN_NAME_STORE, JSON.stringify(userLogin.value));

        localStorage.setItem(
          USER_NAME_STORE,
          JSON.stringify(jwtDecode<iTokenPayload>(userLogin.value))
        );
        api.defaults.headers.common.Accept = '*/*';
        api.defaults.headers.common['Content-Type'] = 'application/json';
        api.defaults.headers.common.Authorization = 'bearer ' + userLogin.value;
      })
      .catch((error) => {
        console.log(error);
        if (!error?.response) {
          setErrorMsg('Sem resposta do servidor');
        } else if (error.response?.status === 400) {
          setErrorMsg('Usuario ou senha incorreta');
        } else if (error.response?.status === 401) {
          setErrorMsg('não autorizado');
        } else {
          setErrorMsg('Falha ao realizar login');
        }
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logoutUser = () => {
    localStorage.removeItem(TOKEN_NAME_STORE);
    localStorage.removeItem(USER_NAME_STORE);
    api.defaults.headers.common.Authorization = undefined;
    setIsLogged(false);
  };

  return (
    <LoginContext.Provider
      value={{
        loginUser,
        isLoading,
        isLogged,
        logoutUser,
        errorMsg,
        isError,
        currentUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
