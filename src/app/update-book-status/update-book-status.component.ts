import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-update-book-status',
  templateUrl: './update-book-status.component.html',
  styleUrls: ['./update-book-status.component.css']
})
export class UpdateBookStatusComponent implements OnInit {

  booksToUpdate: Book[];
  readBooks: Book[];
  bookService: BookService;
  bookToUpdate: Book;
  selectedBook: any;
  selectedStatus: any;
  dateFinished: any;
  authenticationService: AuthenticationService;

  constructor(bookService: BookService, authenticationService: AuthenticationService) {
    this.bookService = bookService;
    this.bookToUpdate = new Book();
    this.authenticationService = authenticationService;
   }

  ngOnInit(): void {
    this.getBooksToDisplay();
  }

  getBooksToDisplay(): void{
    this.loadBooksToUpdate();
  }

  onSubmit(formObject): void{
    
    if(this.selectedStatus.toUpperCase() === "completed".toUpperCase()){
      this.bookToUpdate.read = true;
    }
    else{
      this.bookToUpdate.read = false;
    }
    this.bookToUpdate.userID = this.authenticationService.getCurrentUser().getID();
    var updateBookPromise =  this.bookService.updateBook(this.bookToUpdate);
    updateBookPromise.then(function(value){
      console.log("value from server: " + value);
      if(value == 1){
        alert("Book successfully updated!!");
      }
      else{
        console.error(value);
      }
      formObject.resetForm();
    }.bind(this))
    
  }

  // look for a way to load pending reads too  
  loadBooksToUpdate(): void{
    this.booksToUpdate = this.bookService.getPendingReads();
    //console.log(this.bookService.getReadBooks());
    // var testArray = [new Book(0,"sherlockholmes")];
    // Array.prototype.push.apply(this.booksToUpdate, testArray);
  
  }

  // onChange(): void{
  //   alert("selected book: " + this.bookToUpdate.name + " selected status: " + this.selectedStatus);
  // }

}
