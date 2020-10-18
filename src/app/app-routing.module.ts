import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ConversationsComponent } from './conversations/conversations.component';
import { HomeComponent } from "./home/home.component";


import { RegisterComponent } from "./register/register.component";



const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "Conversation/:id", component: ConversationsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
