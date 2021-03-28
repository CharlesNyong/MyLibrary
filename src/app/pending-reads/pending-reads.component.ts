import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-pending-reads',
  templateUrl: './pending-reads.component.html',
  styleUrls: ['./pending-reads.component.css']
})
export class PendingReadsComponent implements OnInit {

  bookServices: BookService;
  pendingRead: Book[];  
  variableCounter: number = 0;
  authenticationService: AuthenticationService;

  constructor(bookServices:BookService, authenticationService: AuthenticationService) {
    this.bookServices = bookServices;
    //this.variableCounter = 0;
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
    this.getPendingReads();
  }

  getPendingReads(): void{
    this.pendingRead = this.bookServices.getPendingReads();
  }

  getNextLineNumber(): number{
    // alert("next number function called ..");
    if(this.variableCounter > this.pendingRead.length)
    {
      this.variableCounter = 0;
    }
    this.variableCounter += 1;  
    return this.variableCounter;
  }

}
