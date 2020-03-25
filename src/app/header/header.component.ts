import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSoratgeService } from '../shared/data-storage.service';
//import { RecipeService } from '../recipe/recipe-service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  constructor (
    private DataSrvcw:DataSoratgeService,
    private authService:AuthService){}

    private userSub:Subscription
    private isAuthenticated :boolean=false
    ngOnInit(){
      this.userSub=this.authService.user.subscribe(user=>{
        console.log(user)
        this.isAuthenticated= user?true:false
        console.log("authentication",this.isAuthenticated)
      }) 
      
      //this.isAuthenticated=!!this.userSub
    }

  Logout(){
    this.authService.logout()
  }
  save(){
    this.DataSrvcw.storeRecipes()
  }
  fetch(){
   // console.log('in header')
    this.DataSrvcw.getRecipes().subscribe()
  }
  ngOnDestroy(){
    this.userSub.unsubscribe()
    this.isAuthenticated=false
  }
}
