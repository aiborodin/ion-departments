import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataSenderPage } from './data-sender.page';

const routes: Routes = [
  {
    path: '',
    component: DataSenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSenderPageRoutingModule {}
