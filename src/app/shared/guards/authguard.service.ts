// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { TokenInterceptor } from '../interceptors/token.interceptor';
import { AlertService } from '../services/alert.service';


@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(
        public tokenInterceptor: TokenInterceptor, 
        public router: Router,
        public alertService: AlertService
        ) { }
    
    canActivate(): boolean {
      
        if (!this.tokenInterceptor.isAuthenticated()) {
            this.alertService.error('Login to continue', 'Unathorized')
            this.router.navigate(['auth']);
            return false;
        }
        return true;
    }
}