import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  // const token = localStorage.getItem('token');
  const router = inject(Router);
    if (typeof localStorage !== undefined && localStorage.getItem('token')) {
      return true;
    }
    else {
      router.navigate([''])
      return false;
    }
};
