import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeComponent } from './recipe/recipe.component';
import { AuthGaurdService } from './auth/auth.gard-service';
import { FirstComponentComponent } from './recipe/first-component/first-component.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe/recipes-resolver.service';

const routes:Routes=[{path:'recipes',component:RecipeComponent,canActivate:[AuthGaurdService],
children:[
        {path:'',component:FirstComponentComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
        {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]}
    ]
}]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipeRoutingModule{

}