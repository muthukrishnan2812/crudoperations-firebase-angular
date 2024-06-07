import { CanActivateChildFn } from '@angular/router';

export const childGuardGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
