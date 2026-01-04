import { TransferAttendanceMaterialComponent } from './pages/transfer-attendance-material/transfer-attendance-material.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '../shared/guards/permission.guard';
import Permissions from "../shared/enums/permissions.enum";
import { FormCreateRmaComponent } from './pages/form-create-rma/form-create-rma.component';
import { ApproveRmaComponent } from './pages/approve-rma/approve-rma.component';
import { FormCreateStmComponent } from './pages/form-create-stm/form-create-stm.component';
import { FormOutputReceiverComponent } from './pages/form-output-receiver/form-output-receiver.component';
import { FormDirectTemporaryCustodyComponent } from './pages/form-direct-temporary-custody/form-direct-temporary-custody.component';
import { FormDirectDevolutionThirdyComponent } from './pages/form-direct-devolution-thirdy/form-direct-devolution-thirdy.component';

const routes: Routes = [
  {
    path: 'criar-documento-de-rma/formulario',
    component: FormCreateRmaComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.CriarDocumentoRma] }
  },
  {
    path: 'aprovar-documento-de-rma',
    component: ApproveRmaComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.AprovarRma] }
  },
  {
    path: 'criar-documento-de-transferencia-entre-instalacao/formulario',
    component: FormCreateStmComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.CriarDocumentoTransferenciaInstalacoes] }
  },
  {
    path: 'criar-saida-de-material-direta-para-destinatario/formulario',
    component: FormOutputReceiverComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.SaidaMaterialDiretaDestinatario] }
  },
  {
    path: 'material-direta-para-devolução-a-terceiros/formulario',
    component: FormDirectDevolutionThirdyComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.SaidaMaterialDiretaDevolucaoTerceiros] }
  },
  {
    path: 'material-direta-para-guarda-provisoria/formulario',
    component: FormDirectTemporaryCustodyComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.SaidaMaterialDiretaGuardaProvisoria] }
  },
  {
    path: 'saida-de-material-para-atendimento-de-transferencia/formulario',
    component: TransferAttendanceMaterialComponent/*,
    canActivate: [PermissionGuard],
  data: { permissions: [Permissions.SaidaMaterialAtendimentoTransferencia] }*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputRoutingModule { }
