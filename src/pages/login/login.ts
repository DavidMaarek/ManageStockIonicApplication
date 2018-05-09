import { Component } from '@angular/core';
import { IonicPage, LoadingController, MenuController, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { Storage } from '@ionic/storage';
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData = {
    login:'',
    password:''
  };
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public menuCtrl: MenuController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // TODO faire en sorte que l'utilisateur ne puisse pas soumettre le formulaire si les champs sont vide, afin de n'avoir que deux reponses possibles lors de la soumission (Invalid credentials / Ok)
  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Connexion en cours'
    });
    loading.present();

    this.auth.login(this.loginData).then((result) =>{
      this.data = result;
      this.storage.set('token', {property: this.data.value})
      .then(
        () => {
          console.log('Token stored');
        },
        error => console.error('Error storing token', error)
      );
      loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: error.error.message,
        duration: 10000,
        position: 'top'
      });
      loading.dismiss();
      toast.present();
    });
  }
}
