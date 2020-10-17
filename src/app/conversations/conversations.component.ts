import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private dataService : DataService, private activatedRoute: ActivatedRoute) { 
   
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

  ngOnInit() {
    this.username = sessionStorage.getItem("username")
    this.getConversationByID()
    //this.subjectUpdates()
  }
  activeReply(i){
    this.conversation[0].Responses[i].activeReply = true
  }

  reply(i){
    if(this.conversation[0].Responses[i].Replies == undefined){
      this.conversation[0].Responses[i].Replies = []
    }
      this.conversation[0].Responses[i].Replies.push({username : this.username, comment : this.ReplyForm.get("ReplyText").value })
      this.dataService.addComment({Responses : this.conversation[0].Responses}, this.conversationID).subscribe((data:any) => {
        console.log(data)
        this.getConversationByID()
      })
  }
  addComment(){

    if(this.conversation[0].Responses == undefined){
      this.conversation[0].Responses = []
    }
    this.conversation[0].Responses.push({
        "username" : sessionStorage.getItem("username"),
        "comment" : this.CommentForm.get('CommentText').value
    })
    this.dataService.addComment({Responses : this.conversation[0].Responses}, this.conversationID).subscribe((data:any) => {
      console.log(data)
      this.getConversationByID()
    })
  }

  
  getConversationByID(){
    this.dataService.getConversationById(this.conversationID).subscribe((data:any) => {
      
      this.conversation = data;
      this.response = this.conversation[0].Responses
      console.log(this.response)
      this.conversationTitle = this.conversation[0].ConversationTitle
    })
  }
  subjectUpdates(){
    
  }

}
