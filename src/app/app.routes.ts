import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormControlComponent } from './form-control/form-control.component';
import { PipeCheckComponent } from './pipe-check/pipe-check.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './guard/auth.guard';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { deactivateGuard } from './guard/deactivate.guard';
import { matchGuard } from './guard/math.guard';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: "pipe",
                loadComponent: () => PipeCheckComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: "login", pathMatch: "full",
        canMatch:[matchGuard]
    },
    {
        path: 'form',
        component: FormControlComponent,
        canActivate: [authGuard],
        canDeactivate: [deactivateGuard],
        canMatch:[matchGuard]
    },
    {
        path:'user',
        component:UserFormComponent,
        canMatch:[matchGuard]
    },
    {
        path: 'pipe',
        component: PipeCheckComponent
    },
    {
        path: 'navbar',
        component: NavBarComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
