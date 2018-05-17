import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from "../../providers/product/product";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public productService: ProductProvider
  ) {
    this.productId = this.navParams.get('productId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProductPage');
    this.initializeProduct();
  }

  initializeProduct(){
    let loading = this.loadingCtrl.create({
      content: 'Chargement du produit'
    });
    loading.present();

    this.productService.getProduct(this.productId).then((result) => {
      this.product = result;
      console.log(this.product);
      console.log(this.product);
      loading.dismiss();
    });
  }

}
