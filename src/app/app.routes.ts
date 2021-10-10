import { Routes } from '@angular/router';


export const AppRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
