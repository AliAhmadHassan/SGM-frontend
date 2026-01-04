import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SharedState } from '../../shared.reducer';
import { selectLoading, selectShowAlert } from '../../shared.selectors';
import { FetchUserBranchOffice } from '../../shared.actions';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit {

  public showLoading$ = this.state.pipe(select(selectLoading));
  public showAlert$ = this.state.pipe(select(selectShowAlert));

  constructor(private state: Store<SharedState>) { }

  ngOnInit() {
    this.state.dispatch(new FetchUserBranchOffice());
  }

}
