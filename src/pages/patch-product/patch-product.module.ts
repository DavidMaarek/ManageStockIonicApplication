import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatchProductPage } from './patch-product';

@NgModule({
  declarations: [
    PatchProductPage,
  ],
  imports: [
    IonicPageModule.forChild(PatchProductPage),
  ],
})
export class PatchProductPageModule {}
