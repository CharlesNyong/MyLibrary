import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-reads',
  templateUrl: './reads.component.html',
  styleUrls: ['./reads.component.css']
})
export class ReadsComponent implements OnInit {

  bookServices: BookService;
  booksRead: Book[];
  variableCounter: number = 0;
  authenticationService: AuthenticationService;

  constructor(bookServices:BookService, authenticationService: AuthenticationService) {
    this.bookServices = bookServices;
    //this.variableCounter = 0;
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
    this.getReadBooks();
    alert("called");
  }

  getReadBooks(): void{
     this.bookServices.getReadBooks().then((res) =>{
        this.booksRead = this.bookServices.readBooks;
     });
  }

  getNextLineNumber(): number{
    if(this.variableCounter < this.booksRead.length)
    {
      this.variableCounter += 1;
    }
    else{
      this.variableCounter = 1;
    }
      
    return this.variableCounter;
  }

}
