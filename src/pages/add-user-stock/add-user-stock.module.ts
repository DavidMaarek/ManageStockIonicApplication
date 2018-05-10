import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUserStockPage } from './add-user-stock';

@NgModule({
  declarations: [
    AddUserStockPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUserStockPage),
  ],
})
export class AddUserStockPageModule {}
