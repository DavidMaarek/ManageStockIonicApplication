import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewUserStockPage } from './view-user-stock';

@NgModule({
  declarations: [
    ViewUserStockPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewUserStockPage),
  ],
})
export class ViewUserStockPageModule {}
