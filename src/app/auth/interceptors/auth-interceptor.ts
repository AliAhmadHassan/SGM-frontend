import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectAuthToken } from '../auth.selectors';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Logout } from '../auth.actions';
import { SharedState } from 'src/app/shared/shared.reducer';
import { selectInstallation, selectBranchOffice } from 'src/app/shared/shared.selectors';
import { ShowLoading, HideLoading } from 'src/app/shared/shared.actions';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  authToken: string;
  installation: number;
  branchOffice: number;

  constructor(private store: Store<AppState>, private sharedStore: Store<SharedState>, private serviceAlert: AlertService) {
    store.pipe(select(selectAuthToken)).subscribe(token => {
      this.authToken = token;
    });
    sharedStore.pipe(select(selectInstallation)).subscribe(installation => {
      if(installation)
        this.installation = installation.id;
    });
    sharedStore.pipe(select(selectBranchOffice)).subscribe(branchOffice => {
      if(branchOffice)
        this.branchOffice = branchOffice.id;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('auth/')) {
      setTimeout(() => this.sharedStore.dispatch(new ShowLoading()), 0);
      let request: Observable<HttpEvent<any>>;
      if (/*this.authToken*/ localStorage.getItem('auth.token') ) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: this.authToken ?  `Bearer ${this.authToken}` : localStorage.getItem('auth.token'),
            Installation: this.installation ? this.installation.toString() : '',
            BranchOffice: this.branchOffice ? this.branchOffice.toString() : ''
          }
        });
        request = next.handle(authReq);
      } else {
        request = next.handle(req);
      }

      return request.pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          let messages: any;
          if (errorResponse.status === 401) {
            this.store.dispatch(new Logout({ message: 'Efetue login para continuar', type: 'error' }));
          }
          if(!!errorResponse.error.errors) {
            this.serviceAlert.error(errorResponse.error.Message,3000);
            Object.keys(errorResponse.error.errors).forEach(key => {
              this.serviceAlert.error(errorResponse.error.errors[key][0], 3000);
            })
            messages = errorResponse.error.errors
          } else {
            this.serviceAlert.error(errorResponse.error.message, 3000);
            messages = errorResponse.error.message;
          }
          return throwError({ messages: messages, error: errorResponse.status });
        }),
        tap((dataRequest: HttpResponse<any>) => {
          try {
            if(dataRequest.status == 200 || dataRequest.status == 204) {
              if(dataRequest.body.message && dataRequest.body.message != "Sucesso") {
                this.serviceAlert.success(dataRequest.body.message, 3000);
              }
            }
          } catch (error) {
            return true;
          }
        }),
        finalize(() => {
          this.sharedStore.dispatch(new HideLoading());
        })
      );
    }

    return next.handle(req);
  }

}
