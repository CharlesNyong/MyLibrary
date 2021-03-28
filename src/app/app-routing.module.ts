import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBooksComponent } from './add-books/add-books.component';
import { DashBoardComponent} from "./dash-board/dash-board.component";
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { PendingReadsComponent } from './pending-reads/pending-reads.component';
import { ReadingBuddiesComponent } from './reading-buddies/reading-buddies.component';
import { ReadsComponent } from './reads/reads.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SurveyComponent } from './survey/survey.component';
import { UpdateBookStatusComponent } from './update-book-status/update-book-status.component';


const routes: Routes = [{path:'', component: LoginComponent},
                        {path:'registerUser', component: RegisterUserComponent}, 
                        {path:'resetPassword', component: ResetPasswordComponent}, 
                        {path:'reads', component: ReadsComponent, canActivate: [AuthGuard]},
                        {path:'readingBuddies', component: ReadingBuddiesComponent, canActivate: [AuthGuard]},
                        {path:'survey', component: SurveyComponent, canActivate: [AuthGuard]},
                        {path:'dashboard', component: DashBoardComponent, canActivate: [AuthGuard]},
                        {path: 'pendingReads', component: PendingReadsComponent, canActivate: [AuthGuard]},
                        {path: 'addBooks', component: AddBooksComponent, canActivate: [AuthGuard]},
                        {path: 'updateBookStatus', component: UpdateBookStatusComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
