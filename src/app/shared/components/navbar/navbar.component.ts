import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/auth/auth.reducer';
import { selectAuthUser } from 'src/app/auth/auth.selectors';
import { SharedState } from '../../shared.reducer';
import { SaveSetupShared } from '../../shared.actions';
import Permissions from '../../../shared/enums/permissions.enum';
import { PermissionService } from '../../services/permission.service';
import { Router } from '@angular/router';
import { selectUserBranchOffice, selectBranchOffice, selectInstallation } from '../../shared.selectors';
import { Logout, ChangeInstallation } from 'src/app/auth/auth.actions';
import { DialogService } from '../../services/dialog.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public Permissions = Permissions;
  public user$ = this.storeAuth.pipe(select(selectAuthUser));
  public branchOffice$ = this.storeAuth.pipe(select(selectBranchOffice));
  public installation$ = this.storeAuth.pipe(select(selectInstallation));
  public listUserBranchOffice = [];
  public listInstallationCombo = [];
  public branchOffice;
  public installation;

  constructor(
    private storeAuth: Store<AuthState>,
    private store: Store<SharedState>,
    private permissionService: PermissionService,
    private tokenService: TokenService,
    public router: Router,
    private dialog: DialogService
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectUserBranchOffice)).subscribe(list => {
      this.listUserBranchOffice = list;

      if (this.installation) {
        this.selectBranchOffice(this.branchOffice);
      } else {
        this.selectBranchOffice();
      }
    });
    
    this.installation$.subscribe(data => {
      if (data) {
        this.installation = data;
      }
    });
    
    this.branchOffice$.subscribe(data => {
      if (data) {
        this.branchOffice = data;
      }
    });
  }

  selectBranchOffice(branchOffice?) {    
    if (branchOffice) {
      this.listInstallationCombo = branchOffice.instalations;
    } else {
      let useless = this.listUserBranchOffice.find(data => {
        this.branchOffice = data;
        this.listInstallationCombo = data.instalations;
        this.installation = data.instalations[0];
        this.saveLocation();
        // return true;
      });
    }
  }

  defaultFields() {
    this.installation$.subscribe(data => {
      if (data) {
        this.installation = data;
      }
    });

    this.branchOffice$.subscribe(data => {
      if (data) {
        this.branchOffice = data;
      }
    });
  }

  saveLocation() {
    this.store.dispatch(new SaveSetupShared({ installation: this.installation, branchOffice: this.branchOffice }));
  }

  changeLocation() {
    this.saveLocation();
    this.store.dispatch(new ChangeInstallation({
      token: localStorage.getItem('auth.token'), installationId: this.installation.id
    }));
  }

  logout() {
    this.dialog.confirm('Atenção', 'Tem certeza que deseja encerrar a sessão?', () => {
      this.storeAuth.dispatch(new Logout({ message: 'Deslogado com sucesso', type: 'sucess' }));
    }, 'fa-sign-out', 'Encerrar Sessão');
  }
}
