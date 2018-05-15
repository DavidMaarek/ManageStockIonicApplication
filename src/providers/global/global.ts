import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  //apiUrl = 'http://manage-stock-api.local/app_dev.php/';
  apiUrl = 'https://manage-stock.davidmaarek.fr/';

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

  getApiUrl(){
    return this.apiUrl;
  }
}
