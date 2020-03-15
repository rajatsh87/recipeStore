import { Component, OnInit } from '@angular/core';
import{Ingredient} from '../shared/ingredient.model'
import { ShoppingList } from './shopping-list-service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingedients:Ingredient[]
  constructor(private shoppingList:ShoppingList) { }

  ngOnInit() {
    this.ingedients=this.shoppingList.getIngredients()
   // console.log(this.ingedients);
   this.shoppingList.ingredientsChanged.subscribe(
     (ing)=>{
       this.ingedients=ing
     }
   )
  }
  ingEdit(i:number){
    this.shoppingList.strtedEditing.next(i);
  }
}
