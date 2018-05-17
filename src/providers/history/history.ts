import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from "../global/global";
import { Storage } from "@ionic/storage";

/*
  Generated class for the HistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoryProvider {

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public global: GlobalProvider,
  ) {
    console.log('Hello HistoryProvider Provider');
  }

  getHistories(){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.get(this.global.getApiUrl()+'histories', httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }

}
