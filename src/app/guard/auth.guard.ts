import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { promises } from 'dns';
import { canActivate } from '@angular/fire/auth-guard';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  // const token = localStorage.getItem('token');
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (typeof localStorage !== undefined && localStorage.getItem('token')) {
      return true;
    }
    else {
      router.navigate([''])
      return false;
    }
  }
  else {
    return false;
  }
};
