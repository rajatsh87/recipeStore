import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ShoppingList } from 'src/app/shopping-list/shopping-list-service';
import { RecipeService } from '../recipe-service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
dropdownActive=false
  constructor(private shoppingList:ShoppingList,
              private route:Router,
              private aroute:ActivatedRoute,
              private recipeService:RecipeService) { }
  id:number;
  recipe:Recipe;
  // addToShoppingList(){
  //   this.recipe.ingredient.map(ing=>{
  //     this.shoppingList.addIngredient(ing.name,ing.amount)
  //   })
  // }

  ngOnInit() {
    this.aroute.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      //console.log("ID:"+this.id)
      this.recipe=this.recipeService.getRecipeByID(this.id);
      //console.log("recipe:"+this.recipe.name)
    })
  }
  addToShoppingList(){
    const ing=this.recipe.ingredient;
    this.shoppingList.addAllIngredients(ing);
    this.dropdownActive=!this.dropdownActive
  }
  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.route.navigate(['/recipes'])
  }
}
