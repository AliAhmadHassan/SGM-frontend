import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '../shared/guards/permission.guard';
import Permissions from "../shared/enums/permissions.enum";
import { WithInvoiceAndWithOrderComponent } from './pages/with-invoice-and-with-order/with-invoice-and-with-order.component';
import { FormWithInvoiceAndWithOrderComponent } from './pages/form-with-invoice-and-with-order/form-with-invoice-and-with-order.component';
import { FormWithInvoiceAndWithoutOrderComponent } from './pages/form-with-invoice-and-without-order/form-with-invoice-and-without-order.component';
import { TransferBetweenInstallationsComponent } from './pages/transfer-between-installations/transfer-between-installations.component';
import { FormTransferBetweenInstallationsComponent } from './pages/form-transfer-between-installations/form-transfer-between-installations.component';
import { ReturnedFromRecipientComponent } from './pages/returned-from-recipient/returned-from-recipient.component';
import { FormThirdPartyComponent } from './pages/form-third-party/form-third-party.component';
import { FormReturnedFromRecipientComponent } from './pages/form-returned-from-recipient/form-returned-from-recipient.component';

const routes: Routes = [
  {
    path: 'material-de-fornecedor-com-nota-fiscal-e-com-pedido',
    component: WithInvoiceAndWithOrderComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.RecebimentoMaterialNotaEPedido] }
  },
  {
    path: 'material-de-fornecedor-com-nota-fiscal-e-com-pedido/formulario',
    component: FormWithInvoiceAndWithOrderComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.RecebimentoMaterialNotaEPedido] }
  },
  {
    path: 'material-de-fornecedor-com-nota-fiscal-e-sem-pedido/formulario',
    component: FormWithInvoiceAndWithoutOrderComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.RecebimentoMaterialFornecedorComNotaSemPedido] }
  },
  {
    path: 'material-por-transferência-entre-instalações',
    component: TransferBetweenInstallationsComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.RecebimentoMaterialTransferenciaInstalacoes] }
  },
  {
    path: 'material-por-transferência-entre-instalações/formulario',
    component: FormTransferBetweenInstallationsComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.RecebimentoMaterialTransferenciaInstalacoes] }
  },
  {
    path: 'material-devolvido-destinatario',
    component: ReturnedFromRecipientComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.RecebimentoMaterialDevolvidoDestinatario] }
  },
  {
    path: 'material-devolvido-destinatario/formulario',
    component: FormReturnedFromRecipientComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.RecebimentoMaterialDevolvidoDestinatario] }
  },
  {
    path: 'material-de-terceiros/formulario',
    component: FormThirdPartyComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.RecebimentoMaterialTerceiros] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivementRoutingModule { }
