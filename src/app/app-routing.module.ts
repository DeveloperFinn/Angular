import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './games/dashboard/dashboard.component';
import { AuthGuard } from './user-auth/auth.guard';


const routes: Routes = [
  { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo:'login', pathMatch:'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
