import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  jwtHelperService = new JwtHelperService();

  constructor(private authService:AuthService,private router:Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    let cond:boolean = request.url.indexOf("/authentication") == -1&&request.url.indexOf("login") == -1;
    if(cond){
      try{
        if(token != null && !this.jwtHelperService.isTokenExpired(token)){
          request = request.clone({
            setHeaders : {
              Authorization : `Bearer ${token}`
            }
          });
        }else{
          this.authService.logOut();
        }
      }
      catch(e)
      {
        console.log(e);
      }
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        }
      }, error => {
        if(cond)
        {
          let status=error.status;
          if(status==401||status==403)
          {
            this.authService.logOut();
            this.router.navigate(["/auth/login"]);
          }
        }
      })
    );
  }
}
