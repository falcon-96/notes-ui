import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
}, { path: 'register', loadComponent: () => import('./features/auth/register/register').then(i => i.Register) },
{ path: 'mainPage', loadComponent: () => import('./features/notes/notes').then(i => i.Notes) },
{
    path: 'notes',
    loadComponent: () => import('./core/services/notes').then(i => i.NotesService)
},
{
    path: 'deleteConfirmation',
    loadComponent: () => import('./features/confirmation/confirmation')
        .then(i => i.Confirmation)
}
    ,
{ path: '', redirectTo: 'login', pathMatch: 'full' },
];