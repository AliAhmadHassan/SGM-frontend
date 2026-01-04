import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.reducer';

export const selectSharedState = createFeatureSelector<SharedState>('shared');

export const selectLoading = createSelector(
  selectSharedState,
  state => state.counterPendingRequests > 0
);

export const selectBranchOffice = createSelector(
  selectSharedState,
  state => state.branchOffice
);

export const selectInstallation = createSelector(
  selectSharedState,
  state => state.installation
);

export const selectShowAlert = createSelector(
  selectSharedState,
  state => state.showAlert
);

export const selectMessageAlert = createSelector(
  selectSharedState,
  state => state.messageAlert
);

export const selectUserBranchOffice = createSelector(
  selectSharedState,
  state => state.listUserBranchOffice
);
