import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    public domSanitizer: DomSanitizer,
    private authService: AuthService,
    private route: ActivatedRoute,
    public languageService: LanguageService
  ) { }

  username:string;
  roles:string[];
  userImage:string;
  showNotificationCircle:boolean = false;
  isAdmin:false;

  ngOnInit(): void {

    let userData = localStorage.getItem("userData") ?? null;
    if(userData == null){
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("isLoggedIn");
      this.router.navigate(["/auth/login"]);
    }else{
      this.authService.setUserData(JSON.parse(localStorage.getItem("userData")));
    }
    this.authService.userData$.subscribe((res)=>{
      this.username = res.user;
      this.roles = res.roles;
      this.userImage = res.img;
      this.isAdmin = (res.roles.includes("admin") != null) ? res.roles.includes("admin") : false;
    });
  }

  changeLanguage(language){
    this.languageService.setLanguage(language);
  }

  getCurrentLanguage(){
    return localStorage.getItem("userLanguage") ?? "fr";
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  onLogout(e) {
    e.preventDefault();
    this.authService.logOut();
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

}
