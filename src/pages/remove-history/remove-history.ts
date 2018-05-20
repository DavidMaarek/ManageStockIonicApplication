import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { HistoryProvider } from "../../providers/history/history";

/**
 * Generated class for the RemoveHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remove-history',
  templateUrl: 'remove-history.html',
})
export class RemoveHistoryPage {

  productQuantity;

  removeHistoryData = {
    product: null,
    quantity: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public historyService: HistoryProvider
  ) {
    this.removeHistoryData.product = this.navParams.get('productId');
    this.productQuantity = this.navParams.get('quantity');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemoveHistoryPage');
  }

  doRemoveHistory() {
    let loading = this.loadingCtrl.create({
      content: 'Chargement en cours'
    });
    loading.present();

    this.historyService.removeProductHistory(this.removeHistoryData).then((result) =>{
      console.log(result);
      loading.dismiss();
      this.navCtrl.pop();
      let successToast = this.toastCtrl.create({
        message: 'Produit retiré avec succes',
        duration: 3000,
        position: 'top'
      });
      successToast.present();
    }, (error) => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error.error.message,
        duration: 3000,
        position: 'top'
      });
      loading.dismiss();
      toast.present();
    });
  }


}
