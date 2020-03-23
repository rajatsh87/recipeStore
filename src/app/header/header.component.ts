import { Component } from '@angular/core';
import { DataSoratgeService } from '../shared/data-storage.service';
import { RecipeService } from '../recipe/recipe-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor (private DataSrvcw:DataSoratgeService,private recipeSer:RecipeService){}
  save(){
    this.DataSrvcw.storeRecipes()
  }
  fetch(){
    this.DataSrvcw.getRecipes().subscribe()
  }
}
