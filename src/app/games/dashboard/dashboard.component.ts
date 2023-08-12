import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { AuthService } from 'src/app/user-auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private bs: BackendService, private _AuthService: AuthService) { }

  ngOnInit(): void {
  }

  setAdmin(){
    this._AuthService.setAdmin();
  }
}
