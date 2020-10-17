import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../data.service";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  messageForm: FormGroup;
  loginForm : FormGroup;
  submitted = false;
  success = false;
  ads: any;
  minPrice: any;
  loggedInUser: any;
  registration: boolean;
  registrationsuccess: boolean;
  loginsubmitted: boolean;
  loginsuccess: boolean;
  setdata(value:any){
    this.dataService.currentUser = value
   
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    
  ) {}

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
  
      Username: ["", Validators.required],
      Password: ["", Validators.required],
    });
    this.loginForm = this.formBuilder.group({
      
      Username: ["", Validators.required],
      Password: ["", Validators.required],
    });
    //this.getAllAds();
  }

  getAllAds() {
    // this.dataService.getAllAds().subscribe((data) => {
    //   this.ads = data;
    //   this.minPrice = this.ads[this.ads.length - 1].CPI;
    //   this.minPrice = this.minPrice + 1;
    // });
  }

  onSubmit() {
    this.registration = true;

    if (this.messageForm.invalid) {
      return;
    } else {
      const userdetail = {
        Username: this.messageForm.get("Username").value,
        Password: btoa(this.messageForm.get("Password").value),
        
        
      };
      this.dataService.createNewUser(userdetail).subscribe((data: any) => {
       
        //this.loggedInUser = data;
        this.loggedInUser = data
        if(this.loggedInUser.keyPattern == undefined){
          this.dataService.getLoggedInName.next(this.loggedInUser.Username)
          sessionStorage.setItem("username", this.loggedInUser.Username)

        
        //sessionStorage.setItem("username", this.loggedInUser.Username) 
        this.router.navigate(["/home"]);
        }
        else{
          this.dataService.openErrorSnackBar('Username already exists', '');
        }
        
      });
    }
    this.registrationsuccess = true;
  }

  onLogin() {
    this.loginsubmitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      const userdetail = {
        Username: this.loginForm.get("Username").value,
        Password: btoa(this.loginForm.get("Password").value),
        
        
      };
      this.dataService.signIn(userdetail).subscribe((data: any) => {
       
        this.loggedInUser = data
        console.log(this.loggedInUser)
        if(this.loggedInUser.err != undefined){
          this.dataService.openErrorSnackBar('Invalid Credentials', '');
        }
        else{
          this.setdata(this.loggedInUser);
          this.dataService.getLoggedInName.next(this.loggedInUser.Username)
          sessionStorage.setItem("username", this.loggedInUser.Username)
          
         this.router.navigate(["/home"])
        }
       
      });
    }
    this.loginsuccess = true;
  }
}
