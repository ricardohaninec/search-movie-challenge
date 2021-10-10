import { OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class BaseComponent implements OnInit, OnDestroy {

    public isLoading: boolean = false;
    protected subscriptions: Subscription = new Subscription();
    protected baseUrl: string;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
    ) { }

    public ngOnInit(): void { }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public navigateTo(path: string) {
        this.router.navigateByUrl(path);
        if (path != this.router.url) {
            window.scrollTo(0, 0);
        }
    };

    public back(): void {
        this.router.navigateByUrl(this.baseUrl);
    };
}