
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import { FirstComponentComponent } from './recipe/first-component/first-component.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe/recipes-resolver.service';
const appRoutes:Routes=[
    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {path:'recipes',component:RecipeComponent,children:
        [
            {path:'',component:FirstComponentComponent},
            {path:'new',component:RecipeEditComponent},
            {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
            {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]}
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