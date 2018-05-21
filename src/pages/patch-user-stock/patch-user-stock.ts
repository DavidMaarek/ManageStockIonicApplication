import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { StockProvider } from "../../providers/stock/stock";

/**
 * Generated class for the PatchUserStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patch-user-stock',
  templateUrl: 'patch-user-stock.html',
})
export class PatchUserStockPage {

  access;
  stockId;
  formAccess = {
    role: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public stockService: StockProvider,
    public toastCtrl: ToastController
  ) {
    this.access = this.navParams.get('access');
    this.stockId = this.navParams.get('stockId');
    this.formAccess.role = this.access.role;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatchUserStockPage');
  }

  doPatchUserStock(){
    let loading = this.loadingCtrl.create({
      content: 'Modification des drois en cours'
    });
    loading.present();

    this.stockService.patchUserStock(this.access.id, this.formAccess).then((result) =>{
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
