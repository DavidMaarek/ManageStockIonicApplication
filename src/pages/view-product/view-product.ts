import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from "../../providers/product/product";
import { AddHistoryPage } from "../add-history/add-history";

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
    public productService: ProductProvider
  ) {
    this.productId = this.navParams.get('productId');
    this.stockAccesses = this.navParams.get('stockAccesses');
    console.log(this.stockAccesses);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProductPage');
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
    this.navCtrl.push(AddHistoryPage, {
      productId: this.productId,
      quantity: this.product.quantity
    });
  }

}
