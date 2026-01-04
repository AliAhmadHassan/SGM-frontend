import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { AdministrationRoutingModule } from './administration-routing.module';
import { ProvidersComponent } from './pages/providers/providers.component';
import { MaterialComponent } from './pages/material/material.component';
import { AddressComponent } from './pages/address/address.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchOfficeComponent } from './pages/branch-office/branch-office.component';
import { InstallationComponent } from './pages/installation/installation.component';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './pages/project/project.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/user/user.component';
import { FinalRecipientComponent } from './pages/final-recipient/final-recipient.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = { };
@NgModule({
  declarations: [MaterialComponent, ProvidersComponent, BranchOfficeComponent, AddressComponent, InstallationComponent, ProjectComponent, ProfileComponent, UserComponent, FinalRecipientComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    RouterModule,
    NgxMaskModule.forRoot(options),
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
