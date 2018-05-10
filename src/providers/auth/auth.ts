import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from "../global/global";
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpClient,
    public global: GlobalProvider,
    public storage: Storage,
  ) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'text/plain' );
      const _options = { headers: headers };

      this.http.post(this.global.getApiUrl()+'auth-tokens', credentials, _options)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  signup(data) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'text/plain' );
      const _options = { headers: headers };

      this.http.post(this.global.getApiUrl()+'users', data, _options)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  isTokenValid(){
    return this.storage.get('token').then((token) => {
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': token.property
          })
        };

        this.http.get(this.global.getApiUrl()+'valid-auth-tokens', httpOptions)
          .subscribe(data => {
            resolve(data);
          }, error => {
            reject(error.error);
          });
      });
    });
  }

}
