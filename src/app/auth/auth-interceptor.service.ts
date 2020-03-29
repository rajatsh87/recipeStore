import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take,exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authServ:AuthService){}
    intercept(req:HttpRequest<any>,next:HttpHandler){
        return this.authServ.user.pipe(take(1),exhaustMap(user=>{   //in this situation we need modify our o/p based by listening to one more observable 'user'   
            if(!user){
                return next.handle(req)                             //if user is not present then dont't add any param
            }
            const modifiedReq=req.clone({
                params:new HttpParams().set('auth',user.token)})    //else present add a token as a param "lecture-301/300 4:17"
            return next.handle(modifiedReq)
        }))
    }
}