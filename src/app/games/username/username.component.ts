import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  setUsernameForm: FormGroup;
  invalidUsername: boolean;
  username: string;
  constructor(private router: Router, private bs: BackendService) { }

  ngOnInit(): void {
    this.setUsernameForm = new FormGroup({
      Name: new FormControl(null, Validators.required),
    });

  }


  onSubmit(){
    if(!this.setUsernameForm.valid){
      this.invalidUsername = true;
    }else{
      this.username = this.setUsernameForm.value.Name;
      //Raise the username subject
      this.bs.throwUsernameEvent(this.username);
      this.router.navigate(["/dashboard/games"]);
      this.invalidUsername = false;
    }
  }
}
