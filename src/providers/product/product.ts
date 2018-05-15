import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from "../global/global";
import { Storage } from "@ionic/storage";

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public global: GlobalProvider
  ) {
    console.log('Hello ProductProvider Provider');
  }

  createProduct(productData){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.post(this.global.getApiUrl()+'products', productData, httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }
}
