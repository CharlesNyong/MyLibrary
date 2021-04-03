import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { BookService } from '../book.service';
import { Survey } from '../survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  // isFormInvalid: boolean;
  // isIncompleteForm: boolean;
  bookService: BookService;

  constructor(bookService:BookService, private authenticationService: AuthenticationService) {
    this.bookService = bookService;
  }

  ngOnInit(): void {
  }

  onSubmit(submittedForm: NgForm){
    
    if(submittedForm.invalid){
      alert("One or more required fields are empty!");
      return false;
    }
    else if(submittedForm.value.surveyText == ''){
      alert("Survey content can't be empty!!");
      return false;
    }
    const surveyObj = new Survey(submittedForm.value.surveySubject, submittedForm.value.surveyText, this.authenticationService.getCurrentUser().getEmail(), this.authenticationService.getCurrentUser().getName());
    // returned promise is completed at this then stage
    console.log(surveyObj);
    this.bookService.submitSurvey(surveyObj).then((response) =>{
      // if response from server is a sucess
      if(response['success']){
        alert('Survey recieved! Thank you!');
        submittedForm.reset();
        return true;
      }
      else{
        return false;
      }
    }).catch((failure) =>{
      alert("Something went wrong during submisson of survey.. see logs");
      console.table(failure);
      return false;
    });
  }

}
