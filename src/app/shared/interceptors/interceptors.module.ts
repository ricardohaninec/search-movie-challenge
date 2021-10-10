import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AlertInterceptor } from './alert.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AlertInterceptor,
            multi: true,
        },
    ]
})
export class InterceptorsModule { }
