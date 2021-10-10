import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { BroadcastService } from './shared/services/broadcast.service';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,

    // Routes
    RouterModule.forRoot(AppRoutes),

    // Alerts
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),

    // Material Module
    MaterialModule,

    // Shared Module
    SharedModule,
  ],
  providers: [
    BroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
