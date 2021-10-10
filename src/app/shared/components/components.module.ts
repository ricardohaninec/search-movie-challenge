import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule
    ],
    exports: [],
    providers: []
})
export class ComponentModule { }
