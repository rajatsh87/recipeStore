import {Ingredient} from '../shared/ingredient.model'
export class Recipe{
    name;description;imagePath;ingredient:Ingredient[]     
    constructor(name,describe,imgPath,ing:Ingredient[]){
        this.name=name;
        this.description=describe;
        this.imagePath=imgPath,
        this.ingredient=ing
    }
}