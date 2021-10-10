import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    public getItem(key: string): any {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    public setItem(key: string, item: any): void {
        localStorage.setItem(key, JSON.stringify(item));
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}