import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { DisplayDataComponent } from './display-data/display-data.component';


const routes: Routes=[
  // {
  //   path:'graph',
  //   component:DisplayDataComponent
  // },
  {
    path:'',
    component: AppComponent

  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
