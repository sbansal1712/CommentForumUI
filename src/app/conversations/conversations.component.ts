import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  
})
export class ConversationsComponent implements OnInit {
  conversation: any;
  conversationTitle: any;
  conversationID: any;
  CommentForm : FormGroup;
  ReplyForm:FormGroup;
  response: any = [];
  username: string;
  LoggedInUser: any;
  checkAuth: boolean = false;
  subscription: Subscription;
  source = interval(15000);
  createdOn: any;

  constructor(private dataService : DataService, private activatedRoute: ActivatedRoute, private router : Router) { 
   
    this.subscription = this.source.subscribe((val) =>
    this.refreshComments()
  );
  this.LoggedInUser = sessionStorage.getItem("username");
  if(this.LoggedInUser != undefined && this.LoggedInUser != null && this.LoggedInUser != ""){
    this.checkAuth = true
    console.log(this.checkAuth)
  }
      
    // this.dataService.getLoggedInName.subscribe((data) => {
    //   console.log(data)
    //   this.LoggedInUser = data
    //   sessionStorage.setItem("username",this.LoggedInUser)
     
    //   console.log(this.LoggedInUser)
    // })
    this.conversationID = this.activatedRoute.snapshot.paramMap.get("id");
    this.CommentForm = new FormGroup({
      CommentText: new FormControl(),
  
    });
    this.ReplyForm = new FormGroup({
      ReplyText: new FormControl()
    });
    // this.dataService.conversationSubject.subscribe((data:any) => {
    //   this.conversation = data;
    //   this.conversationTitle = this.conversation.ConversationTitle
    //   console.log(this.conversationTitle)
    // })
  }
  refreshComments(): void {
    setTimeout(() => {
      this.getConversationByID()
      }
    , 2500);
  }

  ngOnInit() {
    
    this.getConversationByID()
    //this.subjectUpdates()
  }
  activeReply(i){
    if(this.checkAuth){
    this.conversation[0].Responses[i].activeReply = true
    }
    else{
      this.goToRegister();
    }
  }
  activateEditReply(i, j){
    if(this.checkAuth){
    this.conversation[0].Responses[i].Replies[j].editReply = true
    }
    else{
      this.goToRegister();
    }
    
  }
  goToRegister(){
    this.dataService.openErrorSnackBar('Please Login to Continue', '')
    this.router.navigate(['register'])
  }
  editReply(i, j){
    if(this.checkAuth){
      this.conversation[0].Responses[i].Replies[j] = {username : this.LoggedInUser, comment : this.ReplyForm.get("ReplyText").value, createdOn : Date.now() }
      console.log(this.conversation[0].Responses[i].Replies[j])
      this.dataService.addComment({Responses : this.conversation[0].Responses}, this.conversationID).subscribe((data:any) => {
        console.log(data)
        this.getConversationByID()
      })
    }
    else{
      this.goToRegister();
    }
  }

  activateEditResponse(i){
    if(this.checkAuth){
    this.conversation[0].Responses[i].editReply = true
    }
    else{
      this.goToRegister();
    }
  }
  editResponse(i){
    if(this.checkAuth){
      this.conversation[0].Responses[i]= {username : this.LoggedInUser, comment : this.ReplyForm.get("ReplyText").value, createdOn : Date.now(), Replies :  this.conversation[0].Responses[i].Replies}
      console.log(this.conversation[0].Responses[i])
      this.dataService.addComment({Responses : this.conversation[0].Responses}, this.conversationID).subscribe((data:any) => {
        console.log(data)
        this.getConversationByID()
      })
  }
  else{
    this.goToRegister();
  }
  
  }

  reply(i){

    if(this.checkAuth){
      if(this.conversation[0].Responses[i].Replies == undefined){
        this.conversation[0].Responses[i].Replies = []
      }
        this.conversation[0].Responses[i].Replies.push({username : this.LoggedInUser, comment : this.ReplyForm.get("ReplyText").value, createdOn : Date.now() })
        this.dataService.addComment({Responses : this.conversation[0].Responses}, this.conversationID).subscribe((data:any) => {
          
          //this.ReplyForm.get("ReplyText").reset()
          this.getConversationByID()
        })
    }
    else{
      this.goToRegister();
    }
    
  }
  addComment(){

    if(this.checkAuth){
    if(this.conversation[0].Responses == undefined){
      this.conversation[0].Responses = []
    }
    this.conversation[0].Responses.push({
        "username" : sessionStorage.getItem("username"),
        "comment" : this.CommentForm.get('CommentText').value,
        "createdOn" : Date.now()
    })
    this.dataService.addComment({Responses : this.conversation[0].Responses}, this.conversationID).subscribe((data:any) => {
      console.log(data)
      this.getConversationByID()
    })
  }
  else{
    this.dataService.openErrorSnackBar('Please Login to Continue', '')
    this.router.navigate(['register'])
  }
}

  
  getConversationByID(){
    this.dataService.getConversationById(this.conversationID).subscribe((data:any) => {
      
      this.conversation = data;
      this.response = this.conversation[0].Responses
      this.createdOn = this.conversation[0].createdOn;
      this.conversationTitle = this.conversation[0].ConversationTitle
    })
  }
 

}
