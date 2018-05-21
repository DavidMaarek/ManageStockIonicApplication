import { Component, ViewChild } from '@angular/core';
import { LoadingController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";
import { AuthProvider } from "../providers/auth/auth";
import { GlobalProvider } from "../providers/global/global";
import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public auth: AuthProvider,
    public global: GlobalProvider,
    public loadingCtrl: LoadingController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let loading = this.loadingCtrl.create({
        content: 'Verification de votre session'
      });
      loading.present();

      this.auth.isTokenValid().then(() => {
        this.nav.setRoot(TabsPage);
        loading.dismiss();
      }, error => {
        console.log(error);
        this.rootPage = LoginPage;
        loading.dismiss();
      });

    });
  }
}
