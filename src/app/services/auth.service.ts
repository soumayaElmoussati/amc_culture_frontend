import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../entities/LoginResponse';
import {ENV} from "../../env";
import { RegisterModel } from '../entities/auth/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  updatePassword(data: any) {
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/account/profile/password/update`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  userData$ = new BehaviorSubject<any>("");

  constructor(private http:HttpClient) { }

  login(loginData:any){
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<LoginResponse>(`${ENV["backend-api-base-url"]}/login`, 
    encodeURI(`username=${loginData.username}&password=${loginData.password}`), 
    { headers: new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded') });
  }

  register(data:RegisterModel)
  {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/authentication/create-user`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  askToReset(data:any)
  {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/account/reset`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  reset(data:any)
  {
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/account/reset`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  setUserData(data){
    this.userData$.next(data);
  }

  getUserData(){
     this.userData$.subscribe((res)=>{
       return res;
     });
  }
  

  updateProfile(data:any)
  {
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/account/profile/update`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  updatePhoto(file:any)
  {
    const formData = new FormData();
    formData.append('photo',file);   
    return this.http.post(`${ENV["backend-api-base-url"]}/account/profile/photo/update`, formData,{ responseType: 'text' });
  }

  isLoggedIn()
  {
    return localStorage.getItem("token")!=null
    && localStorage.getItem("isLoggedin")=='true'
    && localStorage.getItem("userData")!=null;
  }

  logOut()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("userData");
  }

  updateData(newData:any)
  {
    let old:any=JSON.parse(localStorage.getItem("userData"));
    if(newData["email"])
    {
      newData["user"]=newData["email"];
      delete newData["email"];
    }
    if(newData["firstname"]&&newData["lastname"])
      newData["fullname"]=newData["firstname"]+" "+newData["lastname"]?.toUpperCase();
    if(newData["token"])
    {
      localStorage.setItem("token",newData["token"]);
      delete newData["token"];
    }
    localStorage.setItem("userData",JSON.stringify({...old,...newData}));
  }
}
