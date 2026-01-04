import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '../shared/guards/permission.guard';
import { MaterialComponent } from './pages/material/material.component';
import { AddressComponent } from './pages/address/address.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { BranchOfficeComponent } from './pages/branch-office/branch-office.component';
import { InstallationComponent } from './pages/installation/installation.component';
import  Permissions   from "../shared/enums/permissions.enum";
import { ProjectComponent } from './pages/project/project.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/user/user.component';
import { FinalRecipientComponent } from './pages/final-recipient/final-recipient.component';

const routes: Routes = [
  {
    path: 'materiais',
    component: MaterialComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.Materiais] }
  },
  {
    path: 'enderecos',
    component: AddressComponent,
    canActivate: [PermissionGuard],
    data: { permission: [Permissions.Enderecos] }
  },
  {
    path: 'fornecedores',
    component: ProvidersComponent,
    canActivate: [PermissionGuard],
    data: { permission: [Permissions.Fornecedores] }
  },
  {
    path: 'filiais',
    component: BranchOfficeComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.Filiais] }
  },
  {
    path: 'projetos',
    component: ProjectComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.Projetos] }
  },
  {
    path: 'instalacoes',
    component: InstallationComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permissions.Instalacoes] }
  },
  {
    path: 'perfis',
    component: ProfileComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [] }
  },
  {
    path: 'usuarios',
    component: UserComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [] }
  },
  {
    path: 'destinatarioFinal',
    component: FinalRecipientComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
