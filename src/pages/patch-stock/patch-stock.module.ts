import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatchStockPage } from './patch-stock';

@NgModule({
  declarations: [
    PatchStockPage,
  ],
  imports: [
    IonicPageModule.forChild(PatchStockPage),
  ],
})
export class PatchStockPageModule {}
