import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  administrador: boolean;
  token: string;
  nome: string;
}

interface LogInCredentials {
  login: string;
  senha: string;
}
interface AuthContextData {
  administrador: boolean;
  nome: string;
  logIn(credentials: LogInCredentials): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const administrador = localStorage.getItem(
      '@CadastroDePaises:administrador',
    );
    const token = localStorage.getItem('@CadastroDePaises:token');
    const nome = localStorage.getItem('@CadastroDePaises:nome');

    if (administrador && token && nome) {
      return { administrador: JSON.parse(administrador), token, nome };
    }

    return {} as AuthState;
  });

  const logIn = useCallback(async ({ login, senha }) => {
    const response = await api.post('usuario/autenticar', null, {
      params: {
        login,
        senha,
      },
    });

    const { administrador, token, nome } = response.data;

    localStorage.setItem(
      '@CadastroDePaises:administrador',
      JSON.stringify(administrador),
    );
    localStorage.setItem('@CadastroDePaises:token', token);
    localStorage.setItem('@CadastroDePaises:nome', nome);

    setData({ administrador, token, nome });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('@CadastroDePaises:administrador');
    localStorage.removeItem('@CadastroDePaises:token');
    localStorage.removeItem('@CadastroDePaises:nome');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        administrador: data.administrador,
        nome: data.nome,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
