import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit {
  isFormInvalid: boolean;
  userAlreadyExist: boolean;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(registrationForm: NgForm){
    console.log(registrationForm.value);
    if(registrationForm.invalid){
      this.isFormInvalid = true;
      this.userAlreadyExist = false;
      return false;
    }
    
    this.validateUserRegistration(registrationForm);
  }

  validateUserRegistration(submittedForm: NgForm) {
    const newUser = new User(submittedForm.value.email, submittedForm.value.password, submittedForm.value.name);
    this.authenticationService.userNameAlreadyExist(newUser.getName()).then((usernameAlreadyExist) =>{
      if(usernameAlreadyExist){
        console.log("user name already exist");
        this.userAlreadyExist = true;
        return false;
      }
      else{
        this.authenticationService.userExist(newUser).then((userExist) =>
        {
          if(userExist){
            console.log("user already exist");
            this.userAlreadyExist = true;
            return false;
          }
          else{
            console.log("registering users ...");
            this.authenticationService.registerUser(newUser).then((responseFromServer) =>{
              console.log(responseFromServer);
              if(responseFromServer['success'] == true){
                alert("User successfully registered!");
                this.authenticationService.logout();
                return true;
              }
              else{
                alert("Problem registering user!");
              }
            }).catch((errorMsg) =>{
              alert("Problem registering user!" + errorMsg);        
            });
            
          }
        });
      }
      //this.authenticationService.logout();
      return true;
    });
  }

}
