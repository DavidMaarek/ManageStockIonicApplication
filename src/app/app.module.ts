import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from "../pages/login/login";
import { HttpClientModule } from "@angular/common/http";

import { IonicStorageModule } from '@ionic/storage';
import { ProfilePage } from "../pages/profile/profile";
import { SignupPage } from "../pages/signup/signup";
import { ProfileProvider } from '../providers/profile/profile';
import { CreateStockPage } from "../pages/create-stock/create-stock";
import { StockProvider } from '../providers/stock/stock';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    ProfilePage,
    SignupPage,
    CreateStockPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    ProfilePage,
    SignupPage,
    CreateStockPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    AuthProvider,
    ProfileProvider,
    StockProvider,
  ]
})
export class AppModule {}
