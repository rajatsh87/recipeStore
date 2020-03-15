import { Component, OnInit,  ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingList } from '../shopping-list-service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('f',{static:false}) shopForm:NgForm
  editMode:boolean=false;
  subscribtion:Subscription
  editIng:Ingredient
  pos:number
  constructor(private shoppingList:ShoppingList) { }

  ngOnInit() {
    this.subscribtion=this.shoppingList.strtedEditing.subscribe((index)=>{
      this.editMode=true;
      this.pos=index
      this.editIng=this.shoppingList.getIngredient(index);
      this.shopForm.setValue({
        name:this.editIng.name,
        amount:this.editIng.amount
      })
    })
  }

  addItem(form:NgForm){
    const val=form.value
    if(this.editMode==false){
    this.shoppingList.addIngredient(val.name,val.amount);
    }
    else{
      this.shoppingList.updateIng(this.pos,val)
      this.editMode=false
      this.shopForm.reset();
    }
  }
  clearForm(){
    this.editMode=false
    this.shopForm.reset();
  }
  deleteIng(){
    this.shoppingList.deleteIng(this.pos)
    this.shopForm.reset();
    this.editMode=false
  }
}
