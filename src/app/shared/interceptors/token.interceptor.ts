import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }
    isAuthenticated(){
        const token = localStorage.getItem(environment.tokenAuthStorage)
        if (token) {
            return true;
        }
        return false;
    }
    
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        
        
        let headers = req.headers;
        const token = localStorage.getItem(environment.tokenAuthStorage);
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        };

        const authReq = req.clone({
            headers: headers
        });

        return next
            .handle(authReq)
            .pipe(
                map((event: HttpEvent<any>) => {
                    return event;
                })
            );

    }

}