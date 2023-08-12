import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean;
  
  constructor(private router: Router, private authService: AuthService) { }

  // applying this regex on the username failed to work
  //, Validators.pattern('\\S+[a-zA-Z]+\\S')
  //We replaced the pattern with a custom synchronous validation
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null ,[Validators.required, Validators.minLength(5),  this.noWhitespace]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(loginForm: FormGroup): void{
    console.log(this.loginForm);
    if(this.loginForm.valid){
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.login(username, password)
      .then((response) => {
        if(!response){
          this.invalidLogin = true;
        }
        else{
          this.invalidLogin = false;
          this.router.navigate(['dashboard/games'])
        }
      })
    }
  }

  //Synchronous Validation
  //Control whether the input has a whitespace or not, 
  //if it does not have whitespaces return null, otherwise add a "noWhitespace" error because if indexOf did not find a match it returns -1
  noWhitespace(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noWhitespace: true}
    }
    else{
      return null;
    }
  }
}
