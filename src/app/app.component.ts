import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recepiePro';
  feature
  getFeature(data:string){
    this.feature=data
    //console.log("data from header:",data)
  }
}
