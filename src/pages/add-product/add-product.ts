import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductProvider } from "../../providers/product/product";
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    picture1: null,
    picture2: null,
    picture3: null,
    picture4: null,
    picture5: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public productService: ProductProvider,
    public toastCtrl: ToastController,
    public camera: Camera
  ) {
    this.productData.stock = parseInt(this.navParams.get('slug').substring(0, 1));
    console.log(this.productData.stock);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  takePicture(picture) {
    const options: CameraOptions = {
      quality: 20,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      if(picture == "picture1") {
        this.productData.picture1 = 'data:image/jpeg;base64,' + imageData;
      } else if(picture == "picture2") {
        this.productData.picture2 = 'data:image/jpeg;base64,' + imageData;
      } else if(picture == "picture3") {
        this.productData.picture3 = 'data:image/jpeg;base64,' + imageData;
      } else if(picture == "picture4") {
        this.productData.picture4 = 'data:image/jpeg;base64,' + imageData;
      } else if(picture == "picture5") {
        this.productData.picture5 = 'data:image/jpeg;base64,' + imageData;
      }
    }, (err) => {
      console.log(err);
    });
  }

  deletePicture(picture) {
    if(picture == "picture1") {
      this.productData.picture1 = null;
    } else if(picture == "picture2") {
      this.productData.picture2 = null;
    } else if(picture == "picture3") {
      this.productData.picture3 = null;
    } else if(picture == "picture4") {
      this.productData.picture4 = null;
    } else if(picture == "picture5") {
      this.productData.picture5 = null;
    }
  }


  doCreateProduct() {
    let loading = this.loadingCtrl.create({
      content: 'Création du produit en cours'
    });
    loading.present();

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
