import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private types: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  
  constructor(private tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn)
    console.log(this.tokenStorageService.getToken());
    
    if (this.isLoggedIn) {
      
      const user = this.tokenStorageService.getUser();
      this.types = user.types;
      this.showAdminBoard = this.types.includes('TYPE_ADMIN');
      this.showModeratorBoard = this.types.includes('TYPE_MODERATOR');
      this.username = user.username;
    }
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}