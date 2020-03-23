import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe-service';
import { Recipe } from '../recipe/recipe.model';

import {map,tap} from 'rxjs/operators'

// @Injectable({providedIn:'root'})
@Injectable()
export class DataSoratgeService {
    constructor(private http: HttpClient, private recipeSer: RecipeService) { }
    storeRecipes() {
        const recipes = this.recipeSer.getRecipe()
        this.http.put('https://recipebook-69644.firebaseio.com/recipes.json', recipes).subscribe(
            resData => {
                console.log(resData)
            }
        )

    }

    getRecipes() {
        return this.http.get<Recipe[]>("https://recipebook-69644.firebaseio.com/recipes.json").
        pipe(map(resData=>{
            return resData.map(recipe=>{
                return{...recipe ,ingredient:recipe.ingredient?recipe.ingredient:[]}
            })
        }),
        tap(recipe=>{
            this.recipeSer.setRecipe(recipe)})
        )
    }
}  