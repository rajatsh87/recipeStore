import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { error } from 'protractor';

@Component({
    selector:'app-auth',
    templateUrl:'/auth.component.html',
    styleUrls: ['/auth.component.css'],
})

export class AuthComponet{

    loading=false;
    constructor(private authServ:AuthService){}
    isloginMode=false
    error:string=null
    changeMode(){
        this.isloginMode=!this.isloginMode
    }
    onSubmit(form:NgForm){
        this.error=null
        this.loading=true
        if(this.isloginMode){
            //
        }
        else{
            console.log("data send  ")
            const email=form.value.email
            const pass=form.value.password
            // console.log(pass)
            this.authServ.signUp(email,pass).subscribe(
                resData=>{
                this.loading=false
                console.log(resData)
            },
            error=>{
                this.loading=false
                this.error=error
                console.log(error)
            })
            form.reset()
        }
    }       
}