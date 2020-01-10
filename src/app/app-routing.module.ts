import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService as AuthGuard, AuthService } from '../services/auth.service';

import { CreateUserProfileComponent } from './components/create-user-profile/create-user-profile.component';
import { LoginComponent } from './containers/login/login.component';
import { dashboardRoutes } from './containers/dashboard/dashboard.routing';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SldEditorComponent } from './containers/sld-editor/sld-editor.component';
import { ProjectModellingComponent } from './containers/project-modelling/project-modelling.component';
import {UserTypeResolverService} from '../services/user-type-resolver.service';

const routes: Routes = [
{
    path: 'dashboard',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuard],
    resolve: {
      userType: UserTypeResolverService,
    }
},
{
  path: 'login',
  component: LoginComponent,
  data: { title: 'Login' }
},
{
  path: 'project-modelling/:id',
  component: ProjectModellingComponent,
  data: { title: 'Login' },
  canActivate: [AuthGuard]
},
{
  path: 'sld-editor',
  component: SldEditorComponent,
  canActivate: [AuthGuard]
},
{
  path: '**',
  redirectTo: '/login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [CreateUserProfileComponent]
})
export class AppRoutingModule { }
