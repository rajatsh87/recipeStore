import { NgModule } from "@angular/core";
import { AuthComponet } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
    declarations:[AuthComponet,AlertComponent],
    imports:[RouterModule.forChild([{path:'auth',component:AuthComponet}]),
    CommonModule,FormsModule]
})

export class AuthModule{

}