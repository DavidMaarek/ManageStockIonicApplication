import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { GlobalProvider } from "../global/global";

/*
  Generated class for the AccessProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccessProvider {

  constructor(
    public http: HttpClient,
    public global: GlobalProvider,
    public storage: Storage,
    ) {
    console.log('Hello AccessProvider Provider');
  }

  getAccess(accessId){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.get(this.global.getApiUrl()+'accesses/'+accessId, httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }

  addAccess(data) {
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

  deleteAccess(accessId) {
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

      this.http.delete(this.global.getApiUrl()+'accesses/'+accessId, httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }
}
