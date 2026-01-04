import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { OutputRoutingModule } from './output-routing.module';
import { FormCreateRmaComponent } from './pages/form-create-rma/form-create-rma.component';
import { ApproveRmaComponent } from './pages/approve-rma/approve-rma.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { FormCreateStmComponent } from './pages/form-create-stm/form-create-stm.component';
import { FormOutputReceiverComponent } from './pages/form-output-receiver/form-output-receiver.component';
import { FormDirectDevolutionThirdyComponent } from './pages/form-direct-devolution-thirdy/form-direct-devolution-thirdy.component';
import { FormDirectTemporaryCustodyComponent } from './pages/form-direct-temporary-custody/form-direct-temporary-custody.component';
import { TransferAttendanceMaterialComponent } from './pages/transfer-attendance-material/transfer-attendance-material.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = { };

@NgModule({
  declarations: [
    FormCreateRmaComponent,
    ApproveRmaComponent,
    FormCreateStmComponent,
    FormOutputReceiverComponent,
    FormDirectDevolutionThirdyComponent,
    FormDirectTemporaryCustodyComponent,
    TransferAttendanceMaterialComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgSelectModule,
    NgbModule,
    NgxMaskModule.forRoot(options),
    RouterModule,
    ReactiveFormsModule,
    OutputRoutingModule,
  ]
})
export class OutputModule { }
