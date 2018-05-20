import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductProvider } from "../../providers/product/product";

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  productData = {
    name: null,
    reference: null,
    quantity: null,
    description: null,
    stock: null,
    picture1: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public productService: ProductProvider,
    public toastCtrl: ToastController
  ) {
    this.productData.stock = parseInt(this.navParams.get('slug').substring(0, 1));
    console.log(this.productData.stock);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  doCreateProduct() {
    let loading = this.loadingCtrl.create({
      content: 'Création du produit en cours'
    });
    loading.present();

    console.log(this.productData);

    this.productService.createProduct(this.productData).then((result) =>{
      console.log(result);
      loading.dismiss();
      this.navCtrl.pop();
      let successToast = this.toastCtrl.create({
        message: 'Produit ajouté avec succes',
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
