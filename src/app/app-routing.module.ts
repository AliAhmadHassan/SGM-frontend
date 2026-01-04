import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, Router } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { HomeComponent } from './home/pages/home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';
import Permission from './shared/enums/permissions.enum';
import { MasterPageComponent } from './shared/pages/master-page/master-page.component';
import { NotFoundComponent } from './auth/pages/not-found/not-found.component';

const desktopRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MasterPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'admin',
        loadChildren: './administration/administration.module#AdministrationModule',
        canActivate: [PermissionGuard],
        data: { permissions: [] }
      },
      {
        path: 'recebimento',
        loadChildren: './receivement/receivement.module#ReceivementModule',
        canActivate: [PermissionGuard],
        data: { permissions: [] }
      },
      {
        path: 'saida',
        loadChildren: './output/output.module#OutputModule',
        canActivate: [PermissionGuard],
        data: { permissions: [] }
      }
    ]
  },
];

const defaultRoutes: Routes = [
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];


@NgModule({
  imports: [RouterModule.forRoot([...desktopRoutes, ...defaultRoutes],
    {
      scrollPositionRestoration: 'disabled',
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    router.resetConfig([...desktopRoutes, ...defaultRoutes]);
  }

}
