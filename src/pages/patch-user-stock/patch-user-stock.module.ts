import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatchUserStockPage } from './patch-user-stock';

@NgModule({
  declarations: [
    PatchUserStockPage,
  ],
  imports: [
    IonicPageModule.forChild(PatchUserStockPage),
  ],
})
export class PatchUserStockPageModule {}
