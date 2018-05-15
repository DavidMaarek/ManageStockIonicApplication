import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from "../profile/profile";
import { SignupPage } from "../signup/signup";
import { LoginPage } from "../login/login";
import { AlertController, App } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SignupPage;
  tab3Root = ProfilePage;


  constructor() {

  }
}

