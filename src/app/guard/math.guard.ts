import { PLATFORM_ID, inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const matchGuard: CanMatchFn = (route, segments) => {
  // const admin = inject(AuthService);
  const router = inject(Router)
  const platformId = inject(PLATFORM_ID)

  if (isPlatformBrowser(platformId)) {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token')
    if (token && role == 'Admin' || role == 'User') {
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
