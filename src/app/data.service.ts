import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap, catchError } from "rxjs/operators";
import { of, Subject, throwError } from "rxjs";
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: "root",
})
export class DataService {

  //apiUrl = "http://localhost:5000/";
  apiUrl = "https://commentforumserver.herokuapp.com/";
  currentUser: any;
  public getLoggedInName = new Subject();
  public conversationSubject = new Subject();
  mealIndex: any;
  //apiUrl = "https://ad-management.herokuapp.com/";
  constructor(private http: HttpClient, private snackbar : MatSnackBar) {}


  openErrorSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      panelClass: ["red-snackbar"],
      verticalPosition: "top",
      horizontalPosition: "center",
    });
  }

  openSuccessSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      panelClass: ["blue-snackbar"],
      verticalPosition: "top",
      horizontalPosition: "center",
    });
  }
 
  createNewUser(userdetail: any) {
    return this.http.post(`${this.apiUrl}createNewUser`, userdetail).pipe(
      switchMap((user: any) => {
        //alert("User created successfully");
        return of(user);
      }),
      catchError((ex: any) => {
        console.log(`server error occured`, ex);
        return throwError(`User Creation failed, please contact to admin`);
      })
    );
  }

  signIn(userdetail: any) {
    
    return this.http.post(`${this.apiUrl}signIn`, userdetail)
    
    
  }
 createNewConversation(conversation){
   return this.http.post(`${this.apiUrl}addNewConversation`, conversation)
 }
 getAllConversations(){
  return this.http.get(`${this.apiUrl}getAllConversations`)
}
getConversationById(id){
  return this.http.get(`${this.apiUrl}getConversationByID?id=${id}`)
}
addComment(comment, id){
  return this.http.post(`${this.apiUrl}replytoComment?id=${id}`,comment)
}
}