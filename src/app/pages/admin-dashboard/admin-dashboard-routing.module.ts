import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardPage } from './admin-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage,
    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: '../users/users.module#UsersPageModule'
          }
        ]
      },
      {
        path: 'departments',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            loadChildren: '../http-test/http-test.module#HttpTestPageModule'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardPageRoutingModule {}
