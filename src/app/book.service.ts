import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { User } from './user';
import { Survey } from './survey';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readBooks: Book[];
  pendingReads: Book[];
  monthsToReadCounts: any[];
  itemPosition: number;
  httpObject: HttpClient;
  currentAuthenticatedUser: User;

  constructor(injectedHttpObj: HttpClient, public authenticationService: AuthenticationService) {
    this.readBooks = [];
    this.pendingReads = [];
    this.monthsToReadCounts = [];
    this.httpObject = injectedHttpObj;
    this.currentAuthenticatedUser = authenticationService.getCurrentUser();
    console.log("current Authenticated user: ");
    console.log(this.currentAuthenticatedUser);
  }

  // getReadBooks() : Book[]{
  //   this.getReadBooksHelper().then((response) =>{
  //     return this.readBooks;
  //   }).catch((reject) =>{
  //     return null;
  //   });
  // }

  getReadBooks(){
    if(this.readBooks === undefined || this.readBooks.length === 0){
      var httpPromise = new Promise<void>((resolve, reject)=>{
          console.log("get books url:" + environment.api_base_url +"/reads/" + this.currentAuthenticatedUser.getID());
          this.httpObject.get(environment.api_base_url +"/reads/" + this.currentAuthenticatedUser.getID()).toPromise()
          .then((resultFromServer) =>{
            var responseLength = Object.keys(resultFromServer).length;
            for(var i=0; i<responseLength; i++){
              this.readBooks.push(new Book(resultFromServer[i].id, resultFromServer[i].BookName, resultFromServer[i].Author, false, new Date(resultFromServer[i].created_at))); 
            }
            resolve();
          }).catch((errorMsg) =>{
            reject(errorMsg);
          });
      });
      return httpPromise; 
    }else{
      return new Promise<void>((resolve, reject) =>{
        resolve();
      })
    }
    
  }
  // printArray(): void{
  //   for (let bookObj  of this.readBooks) {
  //     console.log("book name: " + bookObj.name);
  //   }
  // }

  getMonthsToRead() {
    this.monthsToReadCounts = [];
    var monthToReadPromise = new Promise<void>((resolve, reject)=>{
      this.httpObject.get(environment.api_base_url + "/monthToReadCounts/" + this.authenticationService.getCurrentUser().getID()).toPromise()
      .then((resultFromServer) =>{
        var responseLength = Object.keys(resultFromServer).length;
        for(var i=0; i<responseLength; i++){
          var monthToReadObj = {Date: new Date(resultFromServer[i].Date), ReadCount: resultFromServer[i].read_count};
          this.monthsToReadCounts.push(monthToReadObj); 
        }
       // console.log(this.monthsToReadCounts);
        resolve();
      }).catch((errorMsg) =>{
        reject(errorMsg);
      });
    });

    return monthToReadPromise; 
  }

  getPendingReads(): Book[]{
    if(this.pendingReads === undefined || this.pendingReads.length === 0){
        this.httpObject.get(environment.api_base_url + "/pendingReads/" + this.currentAuthenticatedUser.getID()).subscribe(responseFromServer =>{
          var responseLength = Object.keys(responseFromServer).length;
          for(var i=0; i<responseLength; i++){
            this.pendingReads.push(new Book(responseFromServer[i].id, responseFromServer[i].BookName,responseFromServer[i].Author, false, new Date(responseFromServer[i].created_at))); 
          }
        }); 
    }
    
    return this.pendingReads;
  }

  addBook(newBook: Book): Promise<{}>{
    console.log("request body: " + newBook);
    var postRequestPromise =  this.httpObject.post(environment.api_base_url + "/addBooks", newBook).toPromise();
    return postRequestPromise;
  }

  updateBook(updatedBook: Book): Promise<{}>{
    console.log("request body: " + updatedBook);
    var updateRequestPromise =  this.httpObject.post(environment.api_base_url + "/updateBookStatus", updatedBook).toPromise();
    return updateRequestPromise;
  }

  submitSurvey(surveyObj: Survey){
    var submitSurveyPromise =  this.httpObject.post(environment.api_base_url +"/survey", surveyObj).toPromise();
    return submitSurveyPromise;
  }

}
