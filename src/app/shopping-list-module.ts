import { NgModule } from "@angular/core";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
declarations:[ShoppingListComponent,
    ShoppingListEditComponent],
imports:[CommonModule,
    FormsModule,
    RouterModule.forChild([{path:'shopping-list',component:ShoppingListComponent}])]
})

export class ShoppingListModule{

}