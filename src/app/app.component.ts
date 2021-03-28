import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyLibrary';

  constructor(public authenticationService: AuthenticationService){}

  ngOnInit(): void {
    console.log("is Auth: " + this.authenticationService.userIsAuthenticated());
  }

  toggleMenu()
  {
    var sideBarElement = document.getElementById("accordionSidebar");
    if(sideBarElement.classList.contains("toggled")){
      sideBarElement.classList.remove("toggled");
    }
    else{
      sideBarElement.classList.add("toggled");
    }
  }

  logout(){
    this.authenticationService.logout();
  }
}
