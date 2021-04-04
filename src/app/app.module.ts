import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingList } from './shopping-list/shopping-list-service';
import { FirstComponentComponent } from './recipe/first-component/first-component.component';
import { DataSoratgeService } from './shared/data-storage.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './recipe/recipe-service';
import { RecipeModule } from './app-recipe-module';
import {ShoppingListModule} from './shopping-list-module'
import { AuthModule } from './auth-module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FirstComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [ShoppingList,RecipeService,DataSoratgeService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
