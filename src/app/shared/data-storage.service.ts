import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe-service';
import { Recipe } from '../recipe/recipe.model';

import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

// @Injectable({providedIn:'root'})
@Injectable()
export class DataSoratgeService {
    constructor(private http: HttpClient, private recipeSer: RecipeService, private AuthSer: AuthService) { }
    storeRecipes() {
        const recipes = this.recipeSer.getRecipe()
        this.http.put('https://recipebook-69644.firebaseio.com/recipes.json', recipes).subscribe(
            resData => {
                //console.log(resData)
            }
        )

    }

    getRecipes() {
        return this.AuthSer.user.pipe(take(1), exhaustMap(user => {
          //  console.log("shubham",user.token)
            return this.http.get<Recipe[]>("https://recipebook-69644.firebaseio.com/recipes.json")
        }), map(resData => {
            return resData.map(recipe => {
                return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : [] }
            })
        }),
            tap(recipe => {
                this.recipeSer.setRecipe(recipe)
            }))
    }
}  