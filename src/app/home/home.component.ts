import { Component, OnInit } from "@angular/core";
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { MatDialog } from "@angular/material/dialog";
import { ConversationComponent } from '../conversation/conversation.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  username: any;
  LoggedInUser: any;
  conversations: any;
  checkAuth: boolean;

  
  
  constructor(private dataService: DataService, private router : Router, private _snackbar: MatSnackBar,   private dialog: MatDialog,) {
   this.getAllConversations() 
  }

  ngOnInit() {
   
    this.dataService.getLoggedInName.subscribe((data) => {
      this.LoggedInUser = data
      sessionStorage.setItem("username",this.LoggedInUser)
      if(this.LoggedInUser != undefined && this.LoggedInUser != null && this.LoggedInUser != ""){
        this.checkAuth = true
      }
      console.log(this.LoggedInUser)
    })

    
    
  } 

  goToConversation(conversation){
    console.log(conversation)
    this.dataService.conversationSubject.next(conversation)
    this.router.navigate(["Conversation", conversation._id] )
  }
  getAllConversations(){
    this.dataService.getAllConversations().subscribe((data) =>{
      this.conversations = data;
    })
  }
  goToRegister(){
    this.dataService.openErrorSnackBar('Please Login to Continue', '')
    this.router.navigate(['register'])
  }
  openDialog() {
    if(this.checkAuth){
      const dialogRef = this.dialog.open(ConversationComponent, {
        width: "800px",
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
         
        this.dataService.createNewConversation({
          username : sessionStorage.getItem("username"), ConversationTitle : result.Comment, createdOn : Date.now()
        }).subscribe((data : any) => {
          this.getAllConversations()
        })
        console.log(`Dialog result: ${result.Comment}`);
        }
      });
    }
    else{
      this.goToRegister();
    }
    
  }
}
