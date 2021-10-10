import { Observable, Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

import { filter, map } from 'rxjs/operators';

import { BroadcastEnum } from '../enums/broadcast.enum';
import { BroadcastData } from '../models/broadcast-data.model';


@Injectable()
export class BroadcastService {

    private handler: Subject<BroadcastData> = new Subject<BroadcastData>();

    constructor() { }

    public send(message: BroadcastData): void {
        this.handler.next(message);
    }

    public subscribe(type: BroadcastEnum, callback: (payload: any) => void): Subscription {
        return this.handler
            .pipe(
                filter(message => message.type === type)
            ).pipe(
                map(message => message.data)
            ).subscribe(callback);
    }
}



