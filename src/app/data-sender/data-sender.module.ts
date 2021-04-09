import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataSenderPageRoutingModule } from './data-sender-routing.module';

import { DataSenderPage } from './data-sender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataSenderPageRoutingModule
  ],
  declarations: [DataSenderPage]
})
export class DataSenderPageModule {}
