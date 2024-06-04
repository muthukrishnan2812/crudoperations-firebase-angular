import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormControlComponent } from './form-control/form-control.component';
import { PipeCheckComponent } from './pipe-check/pipe-check.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent,
        children:[
            {
                path:"pipe",
                loadComponent:()=> PipeCheckComponent
            }
        ]
    },
    {
        path:'',
        redirectTo:"form",pathMatch:"full"
    },
    {
        path:'form',
        component:FormControlComponent
    },
    {
        path:'pipe',
        component:PipeCheckComponent
    },
    {
        path:'**',
        component:PageNotFoundComponent
    }
];
