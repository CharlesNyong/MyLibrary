import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  myBook:Book;
  selectedReadingStatus:any;
  bookService: BookService;

  constructor(injectedBookService: BookService, public authenticationService: AuthenticationService) {
    this.bookService = injectedBookService;
    this.myBook = new Book();
  }

  ngOnInit(): void {
  }

  onSubmit(formObject): void{
    this.myBook.userID = this.authenticationService.getCurrentUser().getID();
    console.log("form submitted, book object contains:\n" + this.myBook.toString());
    var saveDataPromise = this.bookService.addBook(this.myBook);
    saveDataPromise.then(function(value){
      if(value){
        alert("Book successfully saved!!");
      }
      this.myBook.read = false;
      formObject.resetForm();
    }.bind(this))

  }


  onChange(): void{
    if(this.selectedReadingStatus === "Completed"){
      this.myBook.read = true;
    }
    else{
      this.myBook.read = false;
    }
    console.log("selected status: " + this.selectedReadingStatus);
  }
  

}
