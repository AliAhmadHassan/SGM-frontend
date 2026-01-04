import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, LoginError, LoginRequested, LoginSucceed, Logout, ChangeInstallation } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { defer, of } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../shared/services/token.service';
import { UtilsService } from '../shared/services/utils.service';
import { AlertService } from '../shared/services/alert.service';

@Injectable()
export class AuthEffects {

  @Effect()
  init$ = defer(() => {
    const token = localStorage.getItem('auth.token');
    const user = localStorage.getItem('auth.user');
    const installation = localStorage.getItem('shared.installation') ? localStorage.getItem('shared.installation') : JSON.parse(user).Installation[0]

    if (token && user) {
      return of(new LoginSucceed({
        token,
        user: JSON.parse(user),
        installationId: installation
      }));
    }
    return of(new Logout({ message: '', type: null }));
  });

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {

      if (action.payload.type == 'sucess') {
        this.serviceAlert.success(action.payload.message, 3000);
      }
      if (action.payload.type == 'error') {
        this.serviceAlert.error(action.payload.message, 3000);
      }
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 500)
    })
  );

  @Effect()
  loginRequested$ = this.actions$.pipe(
    ofType<LoginRequested>(AuthActionTypes.LoginRequestedAction),
    tap((action) => {
      const user = this.utilsService.encrypt({ email: action.payload.email, password: action.payload.password, remember: action.payload.remember });
      localStorage.setItem('login.user', user);
    }),
    switchMap((action: any) => this.authService.login(action.payload.email, action.payload.password).pipe(
      catchError(data => {
        return of(new LoginError({ error: data.messages.Username ? data.messages.Username : data.messages }));
      })
    )),
    map((response: any) => {
      if (response.data) {
        const token = response.data;
        var user = this.tokenService.decodePayloadJWT(token);
        var insId = user.Installation

        if (Array.isArray(insId)) {
          insId = insId[0]
        }

        return new LoginSucceed({
          token,
          user: this.tokenService.decodePayloadJWT(token),
          installationId: insId
        });
      } else {
        return new LoginError({
          error: response.payload.error
        });
      }
    })
  );

  @Effect({ dispatch: false })
  loginSucceed$ = this.actions$.pipe(
    ofType<LoginSucceed>(AuthActionTypes.LoginSucceedAction),
    tap(action => {
      localStorage.setItem('auth.token', action.payload.token);
      localStorage.setItem('auth.user', JSON.stringify(action.payload.user));
    }),
    switchMap(action =>
      this.authService.authorize(action.payload.installationId).pipe(
        catchError(data => {
          return of(new LoginError({ error: data.message }))
        }),
      )
    ),
    map((response: any) => {
      if (!response.error) {
        const token: string = response.data;
        var user = this.tokenService.decodePayloadJWT(token);
        localStorage.setItem('auth.token', token);
        localStorage.setItem('auth.user', JSON.stringify(user));

        setTimeout(() => {
          window.location.reload();
        }, 100);
        this.router.navigateByUrl('/');
      }
    })
  );

  @Effect({ dispatch: false })
  changeInstallation$ = this.actions$.pipe(
    ofType<ChangeInstallation>(AuthActionTypes.ChangeInstallationAction),
    switchMap(action => this.authService.authorize(action.payload.installationId).pipe(
      catchError((resp: any) => {
        return of({ error: resp.statusText });
      })
    )),
    map((response: any) => {
      if (response.data) {
        const token = response.data;
        const user = this.tokenService.decodePayloadJWT(token);
        localStorage.setItem('auth.token', token);
        localStorage.setItem('auth.user', JSON.stringify(user));

        setTimeout(() => {
          window.location.reload();
        }, 100);
        this.router.navigateByUrl('/');
      }
      else {
        catchError(data => {
          return of({ error: data.messages })
        })
      }
    })
  );

  @Effect({ dispatch: false })
  loginError$ = this.actions$.pipe(
    ofType<LoginError>(AuthActionTypes.LoginErrorAction),
    tap(action => {
      this.serviceAlert.error(action.payload.error, 5000);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private utilsService: UtilsService,
    private serviceAlert: AlertService) { }
}
