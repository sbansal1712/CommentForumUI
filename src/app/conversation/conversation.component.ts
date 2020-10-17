import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  ConversationText : FormGroup;
  constructor(
  private dataService : DataService,

    public dialogRef: MatDialogRef<ConversationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.ConversationText = new FormGroup({
      Comment: new FormControl(),
  
    });

   }

  ngOnInit() {

    
  }
 

}
