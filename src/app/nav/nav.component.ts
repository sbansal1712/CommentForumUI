import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  appTitle: string = "RM Comment Forum";
  currentUser:any
  constructor(private dataService : DataService, private router : Router) {

    if(this.dataService.getLoggedInName != undefined){
      this.dataService.getLoggedInName.subscribe(name => this.currentUser = name)
      // console.log(sessionStorage.getItem('username'))
      // this.currentUser = sessionStorage.getItem('username')
    }
  
    
  }

 

  logout(){
    sessionStorage.clear()
    this.currentUser = undefined
    this.dataService.getLoggedInName.next(undefined)
    this.dataService.currentUser = undefined
    this.router.navigate(['/register'])
  }
  ngOnInit() {
    this.currentUser = sessionStorage.getItem('username')
    
  }
}
