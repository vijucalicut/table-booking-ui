// import { Injectable, EventEmitter } from '@angular/core';
// // import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';
// import { UserManager, Log, MetadataService, User } from 'oidc-client';
// import { environment } from 'src/environments/environment';


// const settings: any = {
//   // authority: 'http://localhost:5000/oidc',
//   // client_id: 'js.tokenmanager',
//   // redirect_uri: 'http://localhost:4200/auth.html',
//   // post_logout_redirect_uri: 'http://localhost:4200/',
//   // response_type: 'id_token token',
//   // scope: 'openid email roles',

//   // silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
//   // automaticSilentRenew: true,
//   // // silentRequestTimeout:10000,

//   // filterProtocolClaims: true,
//   // loadUserInfo: true

//   authority: "https://dev-testing-identity-abhilash.azurewebsites.net",
//   client_id: "js",
//   redirect_uri: "https://localhost:4200/callback.html",
//   response_type: "code",
//   scope: "openid profile api1",
//   post_logout_redirect_uri: "https://localhost:4200/index.html",
// };

// @Injectable()
// export class AuthService {
//   mgr: UserManager = new UserManager(settings);
//   userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
//   currentUser: User;
//   loggedIn = false;

//   authHeaders: HttpHeaders;


//   constructor(private http: HttpClient) {
//     this.mgr.getUser()
//       .then((user) => {
//         if (user) {
//           this.loggedIn = true;
//           this.currentUser = user;
//           this.userLoadededEvent.emit(user);
//         } else {
//           this.loggedIn = false;
//         }
//       })
//       .catch((err) => {
//         this.loggedIn = false;
//       });

//     this.mgr.events.addUserLoaded(user => {
//       this.currentUser = user;
//       if (!environment.production) {
//         console.log('authService addUserLoaded', user);
//       }
//     });

//     this.mgr.events.addUserUnloaded(() => {
//       if (!environment.production) {
//         console.log('user unloaded');
//       }
//       this.loggedIn = false;
//     });
//   }
//   clearState() {
//     this.mgr.clearStaleState().then(function () {
//       console.log('clearStateState success');
//     }).catch(function (e) {
//       console.log('clearStateState error', e.message);
//     });
//   }

//   getUser() {
//     this.mgr.getUser().then((user) => {
//       console.log('got user', user);
//       if (user) {
//         this.currentUser = user;
//         this.userLoadededEvent.emit(user);
//       }
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }
//   // isLoggedInObs(): Observable<boolean> {
//   //   return Observable.fromPromise(this.mgr.getUser()).map<User, boolean>((user) => {
//   //     if (user) {
//   //       return true;
//   //     } else {
//   //       return false;
//   //     }
//   //   });
//   // }

//   // removeUser() {
//   //   this.mgr.removeUser().then(() => {
//   //     this.userLoadededEvent.emit(null);
//   //     console.log('user removed');
//   //   }).catch(function (err) {
//   //     console.log(err);
//   //   });
//   // }

//   startSigninMainWindow() {
//     this.mgr.signinRedirect().then(function () {
//       console.log('signinRedirect done');
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }
//   endSigninMainWindow(): any {
//     this.mgr.signinRedirectCallback().then(function (user) {
//       console.log('signed in', user);
//       return user;
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }

//   startSignoutMainWindow() {
//     this.mgr.signoutRedirect().then(function (resp) {
//       console.log('signed out', resp);
//       setTimeout(() => {
//         console.log('testing to see if fired...');

//       }, 5000);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   };

//   endSignoutMainWindow() {
//     this.mgr.signoutRedirectCallback().then(function (resp) {
//       console.log('signed out', resp);
//     }).catch(function (err) {
//       console.log(err);
//     });
//   };
//   /**
//    * Example of how you can make auth request using angulars http methods.
//    * @param options if options are not supplied the default content type is application/json
//    */
//   // AuthGet(url: string, options?: RequestOptions): Observable<Response> {

//   //   if (options) {
//   //     options = this._setRequestOptions(options);
//   //   } else {
//   //     options = this._setRequestOptions();
//   //   }
//   //   return this.http.get(url, options);
//   // }
//   // /**
//   //  * @param options if options are not supplied the default content type is application/json
//   //  */
//   // AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

//   //   const body = JSON.stringify(data);

//   //   if (options) {
//   //     options = this._setRequestOptions(options);
//   //   } else {
//   //     options = this._setRequestOptions();
//   //   }
//   //   return this.http.put(url, body, options);
//   // }
//   // /**
//   //  * @param options if options are not supplied the default content type is application/json
//   //  */
//   // AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

//   //   if (options) {
//   //     options = this._setRequestOptions(options);
//   //   } else {
//   //     options = this._setRequestOptions();
//   //   }
//   //   return this.http.delete(url, options);
//   // }
//   // /**
//   //  * @param options if options are not supplied the default content type is application/json
//   //  */
//   // AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

//   //   const body = JSON.stringify(data);

//   //   if (options) {
//   //     options = this._setRequestOptions(options);
//   //   } else {
//   //     options = this._setRequestOptions();
//   //   }
//   //   return this.http.post(url, body, options);
//   // }


//   // private _setAuthHeaders(user: any) {
//   //   this.authHeaders = new Headers();
//   //   this.authHeaders.append('Authorization', user.token_type + ' ' + user.access_token);
//   //   this.authHeaders.append('Content-Type', 'application/json');
//   // }
//   // public _setRequestOptions(options?: RequestOptions) {

//   //   if (options) {
//   //     options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
//   //   } else {
//   //     options = new RequestOptions({ headers: this.authHeaders, body: '' });
//   //   }

//   //   return options;
//   // }

// }
