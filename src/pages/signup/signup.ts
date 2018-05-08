import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupData = {
    name: '',
    firstname: '',
    email: '',
    plainPassword: '',
    society: ''
  };

  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  doSignup(){
    let loading = this.loadingCtrl.create({
      content: 'Connexion en cours'
    });
    loading.present();

    this.auth.signup(this.signupData).then((result) =>{
      this.data = result;
      console.log(this.data);
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
