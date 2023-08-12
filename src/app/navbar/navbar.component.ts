import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user-auth/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  constructor(public _authService: AuthService, private bs:BackendService) { }

  ngOnInit(): void {
    this.bs.usernameEmitter.subscribe((name) => {
      this.username = name;
    })
  }

  onLogout(): void{
    this._authService.logout();
  }

  get AuthService(){
    return this._authService;
  }
}
