import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
  authToken: string;
  user: { name: string };
  installationId: number;
}

export const initialState: AuthState = {
  loading: false,
  authenticated: false,
  authToken: '',
  user: { name: '' },
  installationId: 0
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginRequestedAction:
      return { ...state, loading: true };

    case AuthActionTypes.LoginSucceedAction:
      return { ...state, loading: false, authenticated: true, authToken: action.payload.token, user: action.payload.user };

    case AuthActionTypes.LoginErrorAction:
      return { ...state, loading: false, authenticated: false };

    case AuthActionTypes.LogoutAction:
      return { ...initialState };

    case AuthActionTypes.ChangeInstallationAction:
      return { ...state, authToken: action.payload.token, installationId: action.payload.installationId };

    default:
      return state;
  }
}
