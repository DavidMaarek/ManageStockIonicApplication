import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { HistoryProvider } from "../../providers/history/history";

/**
 * Generated class for the AddHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-history',
  templateUrl: 'add-history.html',
})
export class AddHistoryPage {

  addHistoryData = {
    product: null,
    quantity: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public historyService: HistoryProvider,
    public toastCtrl: ToastController
  ) {
    this.addHistoryData.product = this.navParams.get('productId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddHistoryPage');
  }

  doAddHistory(){
    let loading = this.loadingCtrl.create({
      content: 'Réapprovisionnement du produit en cours'
    });
    loading.present();

    this.historyService.addProductHistory(this.addHistoryData).then((result) =>{
      console.log(result);
      loading.dismiss();
      this.navCtrl.pop();
      let successToast = this.toastCtrl.create({
        message: 'Produit réapprovisionné avec succès',
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
