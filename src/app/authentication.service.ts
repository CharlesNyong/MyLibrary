import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly mockUser = new User("asikpo.charles@yahoo.com", "abc123", "cnyong");
  private currentUser: User;
  private urlBase = environment.api_base_url + "/user";
  private getUserByUsernameURL = this.urlBase + "/username/";
  private httpObject: HttpClient;
  private authenticatePromise = null
  constructor(private router: Router, injectedHttpObj: HttpClient) {
    this.httpObject = injectedHttpObj;
  }

  authenticate(userToAuthenticate: User){
    // this should call an api or service to do this validation
    this.authenticatePromise = new Promise<boolean>((resolve, reject) =>{
      this.authenticatePromise = this.userExist(userToAuthenticate).then((doesUserExist) =>{
        //console.log("user exist: " + doesUserExist);
        if(doesUserExist){
          sessionStorage.setItem("isAuthenticated", "true");
          sessionStorage.setItem("authenticatedUser", JSON.stringify(this.currentUser));
          //this.currentUser = signInData;
          resolve(true);
          this.router.navigate(['dashboard']);
        }
        else{
          //this.isAuthenticated = false;
            resolve(false);
        }
      }).catch((error) =>{
        reject(error);
      });

    });
    
    return this.authenticatePromise;
  }

  // query DB to check if this user exist
  userExist(user: User, onlyEmailVerification?: Boolean){
    var userExistPromise = new Promise<boolean>((resolve, reject)=>{
      this.httpObject.get(this.urlBase+"/"+user.getEmail()).toPromise()
      .then((resultFromServer) =>{
        var responseLength = Object.keys(resultFromServer).length;
        console.log(resultFromServer[0]);
        if(responseLength > 0 && resultFromServer[0].id != ''){
          if(!onlyEmailVerification){
            if(resultFromServer[0].password == user.getPassword())
            {
              this.currentUser = new User(resultFromServer[0].email, resultFromServer[0].password, resultFromServer[0].name, resultFromServer[0].id);
              resolve(true);
            }
            else{
              resolve(false);
            }
          }
          else{
            this.currentUser = new User(resultFromServer[0].email, resultFromServer[0].password, resultFromServer[0].name, resultFromServer[0].id);
            resolve(true);
          }
        }
        else{
          resolve(false);
        }
      }).catch((errorMsg) =>{
        reject(errorMsg);
      });
    });
    
    return userExistPromise;
  }

  logout(){
    sessionStorage.clear();
    //this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  // query DB to check if username already exist 
  userNameAlreadyExist(name: string){
    var usernameExistPromise = new Promise<boolean>((resolve, reject)=>{
      this.httpObject.get(this.getUserByUsernameURL+name).toPromise()
      .then((resultFromServer) =>{
        console.log("result from server: " + resultFromServer);
        var responseLength = Object.keys(resultFromServer).length;
        if(responseLength > 0)
        {
          resolve(true);
        }
        else{
          resolve(false);
        }
      }).catch((errorMsg) =>{
        reject(errorMsg);
      });
    });

    return usernameExistPromise;
  }

  navigateToPage(pageName: string): void{
    switch(pageName){
      case 'registerUser':
        this.router.navigate(['registerUser']);
        break;
      
      case 'resetPassword':
        this.router.navigate(['resetPassword']);
        break;

      case 'login':
      default:
        console.error("invalid page name: " + pageName);
        break;
    }
    
  }

  // send post request to create new user entity
  registerUser(newUser: User){
    console.log("request body: " + newUser);
    var saveUserRequestPromise =  this.httpObject.post(this.urlBase, newUser).toPromise();
    return saveUserRequestPromise;
  }    

  getCurrentUser(): User{
    
    if(this.currentUser == null)
    {
      this.currentUser = new User();
      Object.assign(this.currentUser, JSON.parse(sessionStorage.getItem("authenticatedUser")));
    } 
    return this.currentUser;
  }

  userIsAuthenticated(): boolean {
    console.log(sessionStorage);
    if(sessionStorage.length > 0 && sessionStorage.getItem("isAuthenticated") == "true"){
      return true;
    }
    else{
      return false;
    }
  }

  updateUserInfo(userToUpdate: User){
    var updateUserPromise =  this.httpObject.put(this.urlBase, userToUpdate).toPromise();
    return updateUserPromise;
  }
}
