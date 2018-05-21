import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductProvider } from "../../providers/product/product";

/**
 * Generated class for the PatchProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patch-product',
  templateUrl: 'patch-product.html',
})
export class PatchProductPage {

  product;
  patchProductData = {
    name: null,
    description: null,
    reference: null,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //public camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public productService: ProductProvider,
  ) {
    this.product = this.navParams.get('product');
    this.patchProductData.name = this.product.name;
    this.patchProductData.description = this.product.description;
    this.patchProductData.reference = this.product.reference;

    console.log(this.product);
    console.log(this.patchProductData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatchProductPage');
  }

  /*takePicture(picture) {
    const options: CameraOptions = {
      quality: 20,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      if(picture == "picture1") {
        this.patchProductData.picture1 = 'data:image/jpeg;base64,' + imageData;
      } else if(picture == "picture2") {
        this.patchProductData.picture2 = 'data:image/jpeg;base64,' + imageData;
      } else if(picture == "picture3") {
        this.patchProductData.picture3 = 'data:image/jpeg;base64,' + imageData;
      } else if(picture == "picture4") {
        this.patchProductData.picture4 = 'data:image/jpeg;base64,' + imageData;
      } else if(picture == "picture5") {
        this.patchProductData.picture5 = 'data:image/jpeg;base64,' + imageData;
      }
    }, (err) => {
      console.log(err);
    });
  }

  deletePicture(picture) {
    if(picture == "picture1") {
      this.patchProductData.picture1 = null;
    } else if(picture == "picture2") {
      this.patchProductData.picture2 = null;
    } else if(picture == "picture3") {
      this.patchProductData.picture3 = null;
    } else if(picture == "picture4") {
      this.patchProductData.picture4 = null;
    } else if(picture == "picture5") {
      this.patchProductData.picture5 = null;
    }
  }*/

  doPatchProduct() {
    let loading = this.loadingCtrl.create({
      content: 'Modification du produit en cours'
    });
    loading.present();
    console.log(this.patchProductData);

    this.productService.patchProduct(this.product.id, this.patchProductData).then((result) =>{
      loading.dismiss();
      this.navCtrl.pop();
      let successToast = this.toastCtrl.create({
        message: 'Produit modifié avec succès',
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
