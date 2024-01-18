// contexts/AuthContext.tsx
import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useContext,
} from 'react';

interface AuthState {
  user: User | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload: User | null;
}

type AuthDispatch = Dispatch<AuthAction>;

const initialState: AuthState = {
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  console.log('Action type:', action.type);
  console.log('Payload:', action.payload);
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: AuthDispatch;
}>({
  state: initialState,
  dispatch: () => {},
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext value
export const useAuth = () => useContext(AuthContext);
