import {Ingredient} from '../shared/ingredient.model'

import {Subject} from 'rxjs'
export class ShoppingList{
        private ingredients:Ingredient[]=[
        new Ingredient('apples',5),
        new Ingredient('potatos',10)
      ]
    strtedEditing=new Subject<number>()
    ingredientsChanged=new Subject<Ingredient[]>()
    getIngredients(){
        return this.ingredients.slice()
    }
    addIngredient(inputName,inputAmount){
        const ing=new Ingredient(inputName,inputAmount)
        //console.log("ing:",ing)
        this.ingredients.push(ing )  
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    addAllIngredients(ing){
        this.ingredients.push(...ing)
    }
    getIngredient(id){
       // console.log("ing:"+id)
        return this.ingredients[id];
    }
    updateIng(pos:number,ing:Ingredient){
        //console.log(ing)
        this.ingredients[pos]=new Ingredient(ing.name,ing.amount)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    deleteIng(pos){
        this.ingredients.splice(pos,1);
        this.ingredientsChanged.next(this.ingredients);
    }
    
}