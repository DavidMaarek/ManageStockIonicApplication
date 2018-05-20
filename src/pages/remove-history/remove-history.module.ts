import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemoveHistoryPage } from './remove-history';

@NgModule({
  declarations: [
    RemoveHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RemoveHistoryPage),
  ],
})
export class RemoveHistoryPageModule {}
