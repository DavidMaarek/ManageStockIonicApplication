import { Component } from '@angular/core';
import { App, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";
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
    name: null,
    firstname: null,
    email: null,
    plainPassword: null,
    society: null,
  };

  sameEmail;

  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public appCtrl: App,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  // Fonction d'inscription de l'utilisateur
  doSignup(){
    // Affichage du loder
    let signupLoading = this.loadingCtrl.create({
      content: 'Inscription en cours'
    });
    signupLoading.present();

    // API inscription
    this.auth.signup(this.signupData).then((result) =>{
      this.data = result;
      signupLoading.dismiss();

      const loginData = {
        login : this.signupData.email,
        password: this.signupData.plainPassword
      };

      let loginLoading = this.loadingCtrl.create({
        content: 'Connexion en cours'
      });
      loginLoading.present();

      // API connexion / génération token
      this.auth.login(loginData).then((result) =>{
        this.data = result;
        console.log(this.data.value);
        this.storage.set('token', {property: this.data.value})
          .then(
            () => {
              console.log('Token stored');
            },
            error => console.error('Error storing token', error)
          );
        loginLoading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      }, (error) => {
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: 'top'
        });
        loginLoading.dismiss();
        toast.present();
      });
    }, (error) => {
      if(error.errors.children.email.errors[0]) {
        this.sameEmail = error.errors.children.email.errors[0];
      }
      let toast = this.toastCtrl.create({
        message: error.message,
        duration: 3000,
        position: 'top'
      });
      signupLoading.dismiss();
      toast.present();
    });
  }

  goToLoginPage() {
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

}
