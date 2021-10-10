import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';


@Injectable()
export class AlertInterceptor implements HttpInterceptor {

    constructor(
        public router: Router,
        public alertService: AlertService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        return next.handle(request)
            .pipe(
                tap((data: any) => {
                    if (data.body && data.body.success) {
                        const message = data.body.message;
                        if (message) {
                            this.alertService.success(message);
                        }
                    }
                }),
                catchError(err => {
                    switch (err.status) {

                        case 400:
                            const error400 = err.error.title || err.error.mensagem || err.error.message;
                            this.alertService.error(error400);

                            if (err.error.notifications && err.error.notifications.length > 0) {
                                const notification = err.error.notification[0];
                                console.error(notification);
                            }

                            break;

                        // case 401:
                        //     this.tokenService.logout();
                        //     this.router.navigate([`auth/login`]);

                        //     break;

                        case 500:
                            const error500 = err.statusText || err.error.message;
                            this.alertService.error(error500);
                            console.error(err.error);
                            break;

                    }

                    return throwError(err);
                }));
    }
}
