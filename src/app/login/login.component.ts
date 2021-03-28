import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isFormInvalid = false;
  areCredentialsInvalid = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(submittedForm: NgForm){
    console.log(submittedForm.value);
    if(submittedForm.invalid){
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return false;
    }
    
    this.checkLoginCredentials(submittedForm);
  }

  sendToRegistration(): void{
    this.authenticationService.navigateToPage('registerUser');
  }

  sendToResetPassword(): void{
    this.authenticationService.navigateToPage('resetPassword');
  }

  private checkLoginCredentials(submittedForm: NgForm){
    console.log("checking login credentials ....");
    const loginUser = new User(submittedForm.value.email, submittedForm.value.password, null);
    this.authenticationService.authenticate(loginUser).then((userExist) =>{
      console.log("in login component user exist: " + userExist)
      if(!userExist){
        this.areCredentialsInvalid = true;
      }
    })
      
  }
}
