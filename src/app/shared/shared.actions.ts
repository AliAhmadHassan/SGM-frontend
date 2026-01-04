import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  ShowLoading = '[Shared] Show Loading',
  HideLoading = '[Shared] Hide Loading',
  SetupShared = '[Shared] Setup Shared',
  SaveSetupShared = '[Shared] Save Setup Shared',
  ShowAlert = '[Shared] Show Alert',
  HideAlert = '[Shared] Hide Alert',
  FetchUserBranchOffice = '[Shared]  Fetch Branch Office and Installation',
  LoadUserBranchOffice = '[Shared]  Load Branch Office and Installation',
}

export class ShowLoading implements Action {
  readonly type = SharedActionTypes.ShowLoading;
}

export class HideLoading implements Action {
  readonly type = SharedActionTypes.HideLoading;
}

export class FetchUserBranchOffice implements Action {
  readonly type = SharedActionTypes.FetchUserBranchOffice;
}

export class LoadUserBranchOffice implements Action {
  readonly type = SharedActionTypes.LoadUserBranchOffice;

  constructor(public payload: any) { }
}

export class SetupShared implements Action {
  readonly type = SharedActionTypes.SetupShared;

  constructor(public payload: { installation: [], branchOffice: [] }) { }
}

export class SaveSetupShared implements Action {
  readonly type = SharedActionTypes.SaveSetupShared;

  constructor(public payload: { installation: [], branchOffice: [] }) { }
}

export class ShowAlert implements Action {
  readonly type = SharedActionTypes.ShowAlert;

  constructor(public payload: string) { }
}

export class HideAlert implements Action {
  readonly type = SharedActionTypes.HideAlert;
}

export type SharedActions = ShowLoading | 
                            HideLoading | 
                            SetupShared |
                            SaveSetupShared |
                            FetchUserBranchOffice |
                            ShowAlert |
                            HideAlert |
                            LoadUserBranchOffice;
