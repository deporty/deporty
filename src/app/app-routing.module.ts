import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './core/guards/is-logged-in/is-logged-in.guard';
import { AuthRoutingModule } from './features/auth/auth-routing.module';
import { AuthModule } from './features/auth/auth.module';
import { HomeRoutingModule } from './features/home/home-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: HomeRoutingModule.route,
    pathMatch: 'full',
  },
  {
    path: AuthRoutingModule.route,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: HomeRoutingModule.route,
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    canLoad: [IsLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
