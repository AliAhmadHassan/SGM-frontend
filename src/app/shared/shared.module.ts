import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedEffects } from './shared.effects';
import { reducer as SharedReducer } from './shared.reducer';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { GenericPageComponent } from './components/generic-page/generic-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyPermissionDirective } from './directives/has-any-permission.directive';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ModalComponent } from './components/modal/modal.component';
import { EmptyFieldPipe } from './pipes/empty-field.pipe';
import { CloseModalDirective } from './directives/close-modal.directive';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { VehiclePlatePipe } from './pipes/vehicle-plate.pipe';
import { FormatDatePipe } from './pipes/format-date-pipe';
import { AbbreviateNamePipe } from './pipes/abbreviate-name.pipe';
import { TelephoneNumberPipe } from './pipes/telephone-number.pipe';
import { FormatStringEmailsPipe } from './pipes/format-string-emails.pipe';
import { ReviewArchiveListComponent } from './components/review-archive-list/review-archive-list.component';
import { StatusComponent } from './components/status/status.component';
import { LiveSearchComponent } from './components/live-search/live-search.component';
import { AttachFileComponent } from './components/attach-file/attach-file.component';

@NgModule({
  declarations: [
    HasPermissionDirective,
    HasAnyPermissionDirective,
    CloseModalDirective,
    GenericPageComponent,
    GenericTableComponent,
    LoadingComponent,
    AlertComponent,
    NavbarComponent,
    MasterPageComponent,
    DialogComponent,
    ModalComponent,
    EmptyFieldPipe,
    MaxLengthPipe,
    DatepickerComponent,
    VehiclePlatePipe,
    FormatDatePipe,
    AbbreviateNamePipe,
    TelephoneNumberPipe,
    FormatStringEmailsPipe,
    StatusComponent,
    LiveSearchComponent,
    AttachFileComponent,
    ReviewArchiveListComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    EffectsModule.forFeature([ SharedEffects ]),
    StoreModule.forFeature('shared', SharedReducer)
  ],
  exports: [
    HasPermissionDirective,
    HasAnyPermissionDirective,
    CloseModalDirective,
    GenericPageComponent,
    NavbarComponent,
    LoadingComponent,
    DialogComponent,
    AlertComponent,
    EmptyFieldPipe,
    DatepickerComponent,
    ModalComponent,
    VehiclePlatePipe,
    FormatDatePipe,
    AbbreviateNamePipe,
    TelephoneNumberPipe,
    FormatStringEmailsPipe,
    StatusComponent,
    LiveSearchComponent,
    AttachFileComponent,
    ReviewArchiveListComponent,
    StatusComponent
  ]
})
export class SharedModule { }
