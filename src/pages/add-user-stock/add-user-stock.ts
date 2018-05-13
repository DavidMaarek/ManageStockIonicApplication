import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { ViewStockPage } from "../view-stock/view-stock";
import { AccessProvider } from "../../providers/access/access";

/**
 * Generated class for the AddUserStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-user-stock',
  templateUrl: 'add-user-stock.html',
})
export class AddUserStockPage {

  users;
  stockId;
  data = {
    role: null,
    user: null,
    stock: this.stockId
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userService: UserProvider,
    public accessService: AccessProvider,
    public toastCtrl: ToastController
  ) {
    this.initializeAddUserStock();
    this.stockId = this.navParams.get('stockId');
    this.data.stock = this.navParams.get('stockId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserStockPage');
  }

  initializeAddUserStock(){
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present();

    this.userService.getAllUsers().then((result) => {
      this.users = result;
      console.log(this.users);
      loading.dismiss();
    });
  }

  doAddUserStock(){
    let loading = this.loadingCtrl.create({
      content: 'Modification des drois en cours'
    });
    loading.present();

    this.accessService.addAccess(this.data).then((result) =>{
      console.log(result);
      loading.dismiss();
      this.navCtrl.pop();
      let successToast = this.toastCtrl.create({
        message: 'Utilisateur ajouté avec succes',
        duration: 3000,
        position: 'top'
      });
      successToast.present();
    }, (error) => {
      console.log(error);
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
