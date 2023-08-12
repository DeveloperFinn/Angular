import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CanDeactivate, Router } from '@angular/router';
import { ICanComponentDeactive } from '../auth.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, ICanComponentDeactive {
  registerForm: FormGroup;
  constructor(private router: Router, private authService: AuthService) { }


  //Trying to apply the Validators.pattern on emails using regex, but failed, therefor the traditional email validator
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      // username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      // firstname: new FormControl(null, [Validators.required,]),
      // lastname: new FormControl(null, [Validators.required,]),
      email: new FormControl(null, [Validators.required, Validators.email,]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6),])
    });
  }


  onSubmit(registerForm: FormGroup): void{
    if(this.registerForm.valid){
      // const username = this.registerForm.value.username;
      // const firstname = this.registerForm.value.firstname;
      // const lastname = this.registerForm.value.lastname;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      //TODO EXTENSION ON SIGNUP
      this.authService.signup(email, password)
      .then((res)=> {
        if(res == 'success'){
          this.router.navigate(['login']);
          console.log("Logged in successfully");
        }
        else{
          alert(res);
          console.log(res);
        }
      });
    }

  }

  canComponentDeactivate() {
    if(this.registerForm.value.username || this.registerForm.value.firstname ||
       this.registerForm.value.lastname || this.registerForm.value.email ||
       this.registerForm.value.password){
        return false;
    }
    else{
      return true;
    }
  }
}
