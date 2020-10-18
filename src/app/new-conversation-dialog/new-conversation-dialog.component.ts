import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-new-conversation-dialog',
  templateUrl: './new-conversation-dialog.component.html',
  styleUrls: ['./new-conversation-dialog.component.scss']
})
export class NewConversationDialogComponent implements OnInit {

  ConversationText : FormGroup;
  constructor(
  

    public dialogRef: MatDialogRef<NewConversationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.ConversationText = new FormGroup({
      Comment: new FormControl(),
  
    });

   }

  ngOnInit() {

    
  }

}
