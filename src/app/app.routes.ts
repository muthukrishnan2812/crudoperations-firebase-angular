import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormControlComponent } from './form-control/form-control.component';

export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'',
        component:HomeComponent,pathMatch:'full'
    },
    {
        path:'form',
        component:FormControlComponent
    }
];
