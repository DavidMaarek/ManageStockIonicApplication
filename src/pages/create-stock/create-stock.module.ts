import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateStockPage } from './create-stock';

@NgModule({
  declarations: [
    CreateStockPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateStockPage),
  ],
})
export class CreateStockPageModule {}
