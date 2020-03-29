import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree} from '@angular/router'
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGaurdService implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean|UrlTree|Observable<boolean|UrlTree>|Promise<boolean|UrlTree>
    {
        return this.authService.user.pipe(take(1),map(data=>{
            if(data){
                return true
            }
            else{
                return this.router.createUrlTree(['auth']) //this will re-direct to baseURL/auth
            }
        }))
    }
}