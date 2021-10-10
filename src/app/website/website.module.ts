import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WebsiteRoutes } from './website.routes';
import { MovieService } from '../shared/services/movie.service';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    declarations: [
        HomeComponent,
        DialogComponent
    ],
    imports: [
        RouterModule.forChild(WebsiteRoutes),
        MaterialModule,
        SharedModule,
    ],
    exports: [],
    providers: [
        MovieService
    ]
})

export class WebsiteModule {}
