
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import { FirstComponentComponent } from './recipe/first-component/first-component.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
const appRoutes:Routes=[
    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {path:'recipes',component:RecipeComponent,children:
        [
            {path:'',component:FirstComponentComponent},
            {path:'new',component:RecipeEditComponent},
            {path:':id',component:RecipeDetailComponent},
            {path:':id/edit',component:RecipeEditComponent}
        ]
    },
    {path:'shopping-list',component:ShoppingListComponent},
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
    
}