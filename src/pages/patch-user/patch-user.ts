import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the PatchUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patch-user',
  templateUrl: 'patch-user.html',
})
export class PatchUserPage {

  user;

  patchUser = {
    name: null,
    firstname: null,
    email: null,
    society: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public userService: UserProvider
  ) {
    this.user = this.navParams.get('user');

    this.patchUser.name = this.user.name;
    this.patchUser.firstname = this.user.firstname;
    this.patchUser.email = this.user.email;
    this.patchUser.society = this.user.society;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatchUserPage');
  }

  doPatchUser() {
    let loading = this.loadingCtrl.create({
      content: 'Modification du profil en cours'
    });
    loading.present();

    this.userService.patchUser( this.patchUser).then((result) =>{
      console.log(result);
      loading.dismiss();
      this.navCtrl.pop();
      let successToast = this.toastCtrl.create({
        message: 'Modification effectuée avec succes',
        duration: 3000,
        position: 'top'
      });
      successToast.present();
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: 'top'
      });
      loading.dismiss();
      toast.present();
    });
  }

}
