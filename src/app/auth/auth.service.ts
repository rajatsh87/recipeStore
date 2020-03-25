import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user=new BehaviorSubject<User>(null)
    constructor(private http: HttpClient,private router:Router) { }
    signUp(email, password) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1wCFz1MvV2TBAoADaKqi2o0ZqFEkWT6M',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(errorRes => {
                return this.handelError(errorRes)
            }),tap(resData=>{
                this.handelAuthentication(resData)
            }))
    }

    logout(){
        this.user.next(null)
        this.router.navigate(['/auth'])
    }

    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpDate:string
        }=JSON.parse(localStorage.getItem('userData'))
        const loadedUser=new User(userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpDate))
        if(loadedUser.token){
            this.user.next(loadedUser)
            console.log(loadedUser.email)
        }
        else{
            this.user.next(null)
        }
    }

    login(email, password) {
        console.log('sending req', password, email)
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1wCFz1MvV2TBAoADaKqi2o0ZqFEkWT6M'
            , {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(errorRes => {
                return this.handelError(errorRes)
            }),tap(resData=>{
                this.handelAuthentication(resData)
            }))
    }
    private handelAuthentication(resData){
        const expDate=new Date(new Date().getTime()+ +resData.expiresIn*1000)
        const user=new User(resData.email,resData.localId,resData.idToken,expDate)
       // console.log(resData.idToken)
        this.user.next(user)
        localStorage.setItem('userData',JSON.stringify(user))
    }

    private handelError(errorRes: HttpErrorResponse) {
        let errorMes = "some error occured"
        console.log(errorRes)
        if (!errorRes.error || !errorRes.error.error) {
            // console.log('unknown error')
            // console.log(errorRes.error,"    ",errorRes.error.error)
            return throwError(errorMes)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMes = "Email already exists"
                break
            case 'EMAIL_NOT_FOUND':
                errorMes="Email not registered"
                break
            case 'INVALID_PASSWORD':
                errorMes="Password incorrect"
                break
        }
        return throwError(errorMes)
    }
}