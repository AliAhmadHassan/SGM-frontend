import { SharedActions, SharedActionTypes } from './shared.actions';

export interface SharedState {
  counterPendingRequests: number;
  branchOffice: any;
  installation: any;
  showAlert: boolean;
  messageAlert: string;
  listUserBranchOffice: [];
}

export const initialState: SharedState = {
  counterPendingRequests: 0,
  branchOffice: null,
  installation: null,
  showAlert: false,
  messageAlert: '',
  listUserBranchOffice: []
};

export function reducer(state = initialState, action: SharedActions): SharedState {
  switch (action.type) {
    case SharedActionTypes.ShowLoading:
      return { ...state, counterPendingRequests: state.counterPendingRequests + 1 };
    case SharedActionTypes.HideLoading:
      return { ...state, counterPendingRequests: state.counterPendingRequests - 1 };
    case SharedActionTypes.SetupShared:
      return { ...state, installation: action.payload.installation, branchOffice: action.payload.branchOffice };
    case SharedActionTypes.ShowAlert:
      return { ...state, showAlert: true, messageAlert: action.payload }
    case SharedActionTypes.HideAlert:
      return { ...state, showAlert: false, messageAlert: null }
    case SharedActionTypes.LoadUserBranchOffice:
      return { ...state, listUserBranchOffice: action.payload };
    default:
      return state;
  }
}
