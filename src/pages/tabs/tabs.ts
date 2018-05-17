import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from "../profile/profile";
import { HistoryPage } from "../history/history";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HistoryPage;
  tab3Root = ProfilePage;


  constructor() {

  }
}

