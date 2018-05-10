import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { GlobalProvider } from "../global/global";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public global: GlobalProvider,
  ) {
    console.log('Hello UserProvider Provider');
  }

  getAllUsers(){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.get(this.global.getApiUrl()+'users', httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }

}
