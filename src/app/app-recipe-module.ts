import { NgModule } from '@angular/core';

import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeComponent } from './recipe/recipe.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeRoutingModule } from './recipe-routing-module';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations:[
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeComponent, 
        RecipeEditComponent
    ],
    imports:[CommonModule,RouterModule,RecipeRoutingModule,ReactiveFormsModule],
})
export class RecipeModule{

}