import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatchUserPage } from './patch-user';

@NgModule({
  declarations: [
    PatchUserPage,
  ],
  imports: [
    IonicPageModule.forChild(PatchUserPage),
  ],
})
export class PatchUserPageModule {}
