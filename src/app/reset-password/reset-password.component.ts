import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isFormInvalid: boolean;
  passwordUnMatched: boolean;
  invalidUser: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }


  onSubmit(submittedForm: NgForm){
    console.log(submittedForm.value);
    if(submittedForm.invalid){
      this.isFormInvalid = true;
      return false;
    }
    else if(submittedForm.value.password != submittedForm.value.confirmPassword){
      this.passwordUnMatched = true;
      return false;
    }

    this.resetPassword(submittedForm);
  }

  resetPassword(submittedForm: NgForm) {
    const userToUpdate = new User(submittedForm.value.email, submittedForm.value.password);
    this.authenticationService.userExist(userToUpdate, true).then((response) =>{
      console.log("response from server: " + response);
      if(!response){
        this.invalidUser = true;
        return false;
      }
      else{
        this.authenticationService.updateUserInfo(userToUpdate).then((response) =>{
          if(response['success']){
            alert('password reset successful');
            this.authenticationService.logout();
            return true;
          }
          else{
            return false;
          }
        });
        
      }
    });

    return false;
  }

}
