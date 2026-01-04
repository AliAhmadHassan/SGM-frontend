import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginRequestedAction = '[Auth] Login Requested Action',
  LoginSucceedAction = '[Auth] Login Succeed Action',
  LoginErrorAction = '[Auth] Login Error Action',
  LogoutAction = '[Auth] Logout Action',
  FetchUserPermissionsAction = '[Auth] Fetch User Permissions',
  LoadUserPermissionsAction = '[Auth] Load User Permissions',
  ChangeInstallationAction = '[Auth] Authorize User Access'
}

export class LoginRequested implements Action {
  readonly type = AuthActionTypes.LoginRequestedAction;

  constructor(public payload: { email: string, password: string, remember: boolean }) { }
}

export class LoginSucceed implements Action {
  readonly type = AuthActionTypes.LoginSucceedAction;

  constructor(public payload: { token: string, user: { name: string }, installationId: number}) { }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginErrorAction;

  constructor(public payload: { error: string }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;

  constructor(public payload: { message: string, type: string }) { }
}

export class ChangeInstallation implements Action {
  readonly type = AuthActionTypes.ChangeInstallationAction;

  constructor(public payload: { token: string, installationId: number }){};
}

export type AuthActions = LoginRequested | LoginSucceed | LoginError | Logout | ChangeInstallation;
