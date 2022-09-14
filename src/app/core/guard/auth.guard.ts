import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  jwtHelperService = new JwtHelperService();

  private checkRoles(roles:string[],userRoles:string[])
  {
    for(let role of roles)
    {
        if(userRoles.filter((item)=>(item == role)).length > 0)
          return true;
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (localStorage.getItem('isLoggedin') && localStorage.getItem('isLoggedin') == "true" && localStorage.getItem("token") && localStorage.getItem("userData") && !this.jwtHelperService.isTokenExpired(localStorage.getItem("token"))) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      if(this.checkRoles(route.children[0].data.role,userData.roles)){
        return true;
      }else{
        this.router.navigate(["/error"]);
        return false;
      }
    }else{
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("userData");
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
