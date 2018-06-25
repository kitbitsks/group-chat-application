import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams} from '@angular/common/http';

@Injectable()
export class GroupchatapiserviceService {

  private url = "http://localhost:3000";
  public chatRoomName:any;
  public listOfRooms:any = [];

  constructor(private http: HttpClient) { }

  public getUserInfoFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }//end of getUserInfoFromLocalStorage

  public setUserInfoInLocalStorage = (data) =>{
    localStorage.setItem('userInfo',JSON.stringify(data));
  }//end of setUserInfoInLocalStorage

  public signupFunction(data):Observable<any>{
    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('mobileNumber',data.mobileNumber)
    .set('email',data.email)
    .set('password',data.password)

    return this.http.post(`${this.url}/api/v1/users/signup`,params);
  }//end of signup function

  public signinFunction(data):Observable<any>{

    const params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password);

    return this.http.post(`${this.url}/api/v1/users/login`,params);
  } //end of signin function
  
  public changePasswordUser(data):Observable<any>{
    const params = new HttpParams()
    .set('password',data.newPassword);
    return this.http.put(`${this.url}/api/v1/users/${data.verificationCode}/edit`,params);
  } //end of changePasswordUser function

  public requestVerificationCode(data):Observable<any>{

    const params = new HttpParams()
    .set('email',data.newEmail)
    console.log(data)
    return this.http.post(`${this.url}/api/v1/users/sntmail`,params);
  } //end of requestVerificationCode function
  
  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))

    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function

}
