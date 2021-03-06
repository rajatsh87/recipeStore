import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import {AuthResponseData} from './auth.service'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector:'app-auth',
    templateUrl:'/auth.component.html',
    styleUrls: ['/auth.component.css'],
})

export class AuthComponet{

    loading=false;
    constructor(private authServ:AuthService ,private router:Router){}
    isloginMode=false
    error:string=null
    changeMode(){
       // console.log('change')
        this.isloginMode=!this.isloginMode
       // console.log('loginMode:',this.isloginMode)
    }
    errorChecked(){
        this.error=null
    }
    onSubmit(form:NgForm){
        this.error=null
       // console.log('form submit')
        this.loading=true
        const email=form.value.email
        const pass=form.value.password
        let authObsr:Observable<AuthResponseData>

        if(this.isloginMode){

           authObsr=this.authServ.login (email,pass)
        }
        else{
           // console.log("data send  ")
            // console.log(pass)
            authObsr=this.authServ.signUp(email,pass)
            form.reset()
        }
        authObsr.subscribe(
            resData=>{
            this.loading=false
            // console.log(resData)
            this.router.navigate(['/recipes'])
        },
        error=>{
            this.loading=false
            this.error=error
            console.log(error)
        })
    }       
}