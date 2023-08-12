import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username invalid when empty', () => {
    //Should fail since it i s empty
    let username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();
  });

  it('Form invalid when username has too few characters', () => {
    //Fails because less than 5 characters
    component.loginForm.controls['username'].setValue("usr");

    let username = component.loginForm.controls['username'];
    let errors = username.errors;
    expect(errors['minlength']).toBeTruthy();
  });

  it('Form invalid when username has whitespaces', () => {
    //Shoud fail since noWhiteSpaces does not allow any whitespaces in the username
    component.loginForm.controls['username'].setValue("     John Doe");

    let username = component.loginForm.controls['username'];
    let errors = username.errors;
    expect(errors['noWhiteSpaces']).toBeTruthy();
  });
  


  it('login works', () => {

    component.loginForm.controls['username'].setValue("John@mail.com");
    component.loginForm.controls['password'].setValue("password123");

    component.onSubmit;

    expect(component.invalidLogin).toBe(false);

  });

});
