import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BackendService } from '../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null; 
  constructor(private router: Router, private auth: Auth, private bs: BackendService) { 
    //Store a token in the localstorage so user stays logged in until logged out
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }
  }
  signup(email: string, password: string): Promise<String>{
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then(() => {
      return 'success';
    })
    .catch(error => {
      console.log(error);
      return error;
    });

  }  

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
    .then( () => {
      return this.auth.currentUser?.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          localStorage.setItem('token', token);
          return true;
        }
      )
    })
    .catch(
      error => {
        console.log(error);
        return false;
      }
    );
  }

  isLoggedIn(): boolean{
    //Check whether a token exists or if it is a null value. 
    return this.token != null;
  }
  isAdmin(): boolean{
    return (localStorage.getItem('isAdmin') === "true") ? true: false;
  }
  setAdmin(){
    localStorage.setItem('isAdmin', "true");
  }
  logout(): void{
    //Call the firebaseauth and request a signout, set the service token to null
    // remove the localstorage token and navigate to logincomponent
    this.bs.throwUsernameEvent("");
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
