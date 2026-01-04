import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  SharedActionTypes,
  SetupShared,
  ShowAlert,
  HideAlert,
  FetchUserBranchOffice,
  LoadUserBranchOffice,
  SaveSetupShared
} from './shared.actions';
import { tap, delay, switchMap, map } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import BaseResponse from './models/baseResponse.model';
import { ComboService } from './services/combo.service';

@Injectable()
export class SharedEffects {

  @Effect()
  init$ = defer(() => {
    const installation = localStorage.getItem('shared.installation');
    const branchOffice = localStorage.getItem('shared.branchOffice');
    
    if (installation && branchOffice) {
      return of(new SetupShared({ installation: JSON.parse(installation), branchOffice: JSON.parse(branchOffice) }));
    }
    return of();
  })

  @Effect()
  saveSetupShared$ = this.actions$.pipe(
    ofType<SaveSetupShared>(SharedActionTypes.SaveSetupShared),
    tap(action => {
      localStorage.setItem('shared.installation', JSON.stringify(action.payload.installation));
      localStorage.setItem('shared.branchOffice', JSON.stringify(action.payload.branchOffice));
    }),
    map((action) => new SetupShared(action.payload))
  );

  @Effect()
  showAlert$ = this.actions$.pipe(
    ofType<ShowAlert>(SharedActionTypes.ShowAlert),
    delay(5000),
    map(() => new HideAlert())
  );

  @Effect()
  requestLocations$ = this.actions$.pipe(
    ofType<FetchUserBranchOffice>(SharedActionTypes.FetchUserBranchOffice),
    switchMap(() => this.serviceCombo.fetchUserBranchOffice()),
    map((response: BaseResponse<any>) => new LoadUserBranchOffice( response.data ))
  );

  constructor(private actions$: Actions, 
              private serviceCombo: ComboService) { }
}
