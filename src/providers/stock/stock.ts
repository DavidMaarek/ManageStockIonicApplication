import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { GlobalProvider } from "../global/global";

/*
  Generated class for the StockProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockProvider {

  constructor(
    public http: HttpClient,
    public global: GlobalProvider,
    public storage: Storage,
    ) {
    console.log('Hello StockProvider Provider');
  }

  createStock(stockData){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.post(this.global.getApiUrl()+'stocks', stockData, httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }

  getProfileStock(stockId){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.get(this.global.getApiUrl()+'stocks/'+stockId, httpOptions)
          .subscribe(data => {
            resolve(data);
            console.log(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }

  addUserStock(data){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.post(this.global.getApiUrl()+'accesses', data, httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }

  patchUserStock(accessId, newRole){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.patch(this.global.getApiUrl()+'accesses/'+accessId, newRole, httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }


}
