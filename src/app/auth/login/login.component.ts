import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

 
  loginForm=new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authSvc: AuthService, private router: Router) { }

 async onGoogleLogin(){
   try{
    this.authSvc.loginGoogle();
   }
  catch(error){
    console.log(error);   
   }
  }

  ngOnInit(): void {
  }

  async onLogin(){
    const {email, password} = this.loginForm.value;
    try{
      const user = await this.authSvc.login(email, password); 
      if(user && user.user.emailVerified){        
        this.router.navigate(["/home"]);
      }else if(user){
        this.router.navigate(['/verification-email']);
      }else{
        this.router.navigate(['register']);
      }
    }
    catch(error){console.log(error)}
   
  }
}
