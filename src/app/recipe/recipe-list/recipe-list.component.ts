import { Component, OnInit, OnDestroy } from '@angular/core';
import {RecipeService} from '../recipe-service'
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{

  constructor(private recipeService:RecipeService,private route:Router,private aRoute:ActivatedRoute){
  }
  recipes=[];
  subscription:Subscription
  ngOnInit() {
    this.subscription= this.recipeService.recipeChanged.subscribe(
      (allRecipe:Recipe[])=>{
        this.recipes=allRecipe
      }
    )
    this.recipes = this.recipeService.getRecipe();
    console.log("all recipes 0:"+this.recipes)
  }
  btnClicked(){
    this.route.navigate(['new'],{relativeTo:this.aRoute});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
