import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivementRoutingModule } from './receivement-routing.module';
import { WithInvoiceAndWithOrderComponent } from './pages/with-invoice-and-with-order/with-invoice-and-with-order.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormWithInvoiceAndWithOrderComponent } from './pages/form-with-invoice-and-with-order/form-with-invoice-and-with-order.component';
import { FormWithInvoiceAndWithoutOrderComponent } from './pages/form-with-invoice-and-without-order/form-with-invoice-and-without-order.component';
import { DivergenceModalComponent } from './components/divergence-modal/divergence-modal.component';
import { TransferBetweenInstallationsComponent } from './pages/transfer-between-installations/transfer-between-installations.component';
import { FormTransferBetweenInstallationsComponent } from './pages/form-transfer-between-installations/form-transfer-between-installations.component';
import { ReturnedFromRecipientComponent } from './pages/returned-from-recipient/returned-from-recipient.component';
import { FormThirdPartyComponent } from './pages/form-third-party/form-third-party.component';
import { FormReturnedFromRecipientComponent } from './pages/form-returned-from-recipient/form-returned-from-recipient.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = { };

@NgModule({
  declarations: [
    WithInvoiceAndWithOrderComponent,
    FormWithInvoiceAndWithOrderComponent,
    FormWithInvoiceAndWithoutOrderComponent,
    DivergenceModalComponent,
    TransferBetweenInstallationsComponent,
    FormTransferBetweenInstallationsComponent,
    ReturnedFromRecipientComponent,
    FormThirdPartyComponent,
    FormReturnedFromRecipientComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgSelectModule,
    NgbModule,
    NgxMaskModule.forRoot(options),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ReceivementRoutingModule
  ]
})
export class ReceivementModule { }
