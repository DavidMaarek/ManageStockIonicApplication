import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { ProductProvider } from "../../providers/product/product";
import { AddHistoryPage } from "../add-history/add-history";
import { RemoveHistoryPage } from "../remove-history/remove-history";
import { PatchProductPage } from "../patch-product/patch-product";

/**
 * Generated class for the ViewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {

  productId;
  product;
  stockAccesses;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public productService: ProductProvider
  ) {
    this.productId = this.navParams.get('productId');
    this.stockAccesses = this.navParams.get('stockAccesses');
  }

  ionViewDidLoad() {
    this.initializeProduct();
  }

  ionViewWillEnter() {
    this.updateProduct();
  }

  initializeProduct(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement du produit'
    });
    loading.present();

    this.productService.getProduct(this.productId).then((result) => {
      this.product = result;
      this.product.history = this.product.history.reverse();
      loading.dismiss();
    });
  }

  updateProduct() {
    this.productService.getProduct(this.productId).then((result) => {
      this.product = result;
      this.product.history = this.product.history.reverse();
    });
  }

  goToAddHistoryPage(){
    this.navCtrl.push(AddHistoryPage, {
      productId: this.productId
    });
  }

  goToRemoveHistoryPage(){
    this.navCtrl.push(RemoveHistoryPage, {
      productId: this.productId,
      quantity: this.product.quantity
    });
  }

  goToPatchProductPage() {
    this.navCtrl.push(PatchProductPage, {
      product: this.product
    });
  }

  deleteProduct() {
    let alert = this.alertCtrl.create({
      title: 'Suppression du produit',
      message: 'Voullez-vous vraiment supprimer le produit "' + this.product.name + '" ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
        },
        {
          text: 'Oui',
          handler: () => {
            this.doDeleteProduct()
          }
        }
      ]
    });
    alert.present();
  }

  doDeleteProduct(){
    this.productService.deleteProduct(this.productId).then((result) =>{
      let successMessage = this.toastCtrl.create({
        message: 'Suppression effectuée avec succes',
        duration: 3000,
        position: 'top'
      });
      successMessage.present();

      this.navCtrl.pop();

    }, (error) => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
