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
import { ViewStockPage } from "../pages/view-stock/view-stock";
import { ViewUserStockPage } from "../pages/view-user-stock/view-user-stock";
import { PatchUserStockPage } from "../pages/patch-user-stock/patch-user-stock";
import { AddUserStockPage } from "../pages/add-user-stock/add-user-stock";
import { UserProvider } from '../providers/user/user';
import { AccessProvider } from '../providers/access/access';
import { PatchStockPage } from "../pages/patch-stock/patch-stock";
import { PatchUserPage } from "../pages/patch-user/patch-user";
import { AddProductPage } from "../pages/add-product/add-product";
import { ProductProvider } from '../providers/product/product';
import { HistoryPage } from "../pages/history/history";
import { HistoryProvider } from '../providers/history/history';
import { ViewProductPage } from "../pages/view-product/view-product";
import { AddHistoryPage } from "../pages/add-history/add-history";
import { Camera } from "@ionic-native/camera";
import { RemoveHistoryPage } from "../pages/remove-history/remove-history";
import { PatchProductPage } from "../pages/patch-product/patch-product";

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
    ViewStockPage,
    ViewUserStockPage,
    PatchUserStockPage,
    AddUserStockPage,
    PatchStockPage,
    PatchUserPage,
    AddProductPage,
    HistoryPage,
    ViewProductPage,
    AddHistoryPage,
    RemoveHistoryPage,
    PatchProductPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Retour'
    }),
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
    ViewStockPage,
    ViewUserStockPage,
    PatchUserStockPage,
    AddUserStockPage,
    PatchStockPage,
    PatchUserPage,
    AddProductPage,
    HistoryPage,
    ViewProductPage,
    AddHistoryPage,
    RemoveHistoryPage,
    PatchProductPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    AuthProvider,
    ProfileProvider,
    StockProvider,
    UserProvider,
    AccessProvider,
    ProductProvider,
    HistoryProvider,
    Camera
  ]
})
export class AppModule {}
