import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataSoratgeService } from '../shared/data-storage.service';
import { RecipeService } from './recipe-service';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStogaeService:DataSoratgeService,private recipeSer:RecipeService){}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        const recipes=this.recipeSer.getRecipe()
        if(recipes.length==0)
            return this.dataStogaeService.getRecipes()
        else
            return recipes 
    }
}