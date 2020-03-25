import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    constructor(private http: HttpClient) { }
    signUp(email, password) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1wCFz1MvV2TBAoADaKqi2o0ZqFEkWT6M',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(errorRes => {
                return this.handelError(errorRes)
            }))
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
            }))
    }
    private handelError(errorRes: HttpErrorResponse) {
        let errorMes = "some error occured"
        //console.log(errorRes.error.error.message)
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMes)
        }
        switch (errorRes.error.error) {
            case 'EMAIL_EXISTS':
                errorMes = "Email already exists"
                break
        }
        return throwError(errorMes)
    }
}