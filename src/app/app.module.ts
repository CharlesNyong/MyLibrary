import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ReadsComponent } from './reads/reads.component';
import { PendingReadsComponent } from './pending-reads/pending-reads.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { UpdateBookStatusComponent } from './update-book-status/update-book-status.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SurveyComponent } from './survey/survey.component';
import { ReadingBuddiesComponent } from './reading-buddies/reading-buddies.component';


@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    ReadsComponent,
    PendingReadsComponent,
    AddBooksComponent,
    UpdateBookStatusComponent,
    LoginComponent,
    RegisterUserComponent,
    ResetPasswordComponent,
    SurveyComponent,
    ReadingBuddiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
