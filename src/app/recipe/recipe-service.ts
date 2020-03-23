import { Recipe } from './recipe.model'
import { Subject} from 'rxjs'
import {Ingredient} from '../shared/ingredient.model'
export class RecipeService{
    
    recipeChanged=new Subject<Recipe[]>()
    private recipes:Recipe[]=[]

    setRecipe(recipes:Recipe[]){
        this.recipes=recipes
        this.recipeChanged.next(this.recipes.slice())
    }

    getRecipe(){
        console.log(this.recipes)
        return this.recipes
    }

    getRecipeByID(index:number){
        return this.recipes[index]
    }

    addRecipe(name,description,imgPath,ing:Ingredient[]){
        const newRecipe=new Recipe(name,description,imgPath,ing)
        this.recipes.push(newRecipe)
        console.log(this.recipes)
        this.recipeChanged.next(this.recipes)
    }

    updateRecipes(index: number, name,description,imagePath,ing:Ingredient[]) {
        //console.log("new Recipe :"+name,description,imagePath,ing)
        this.recipes[index] = new Recipe(name,description,imagePath,ing);
        console.log(this.recipes)
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteIng(ing_id,recipe_id){
        //console.log(this.recipes[recipe_id].ingredient)
        this.recipes[recipe_id].ingredient.splice(ing_id,1);
        console.log(this.recipes)
        this.recipeChanged.next(this.recipes.slice())
    }
    deleteRecipe(id){
        this.recipes.splice(id,1)
        console.log(this.recipes)
        this.recipeChanged.next(this.recipes.slice());
    }
}