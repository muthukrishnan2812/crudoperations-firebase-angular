import { CanDeactivateFn } from '@angular/router';
import { FormControlComponent } from '../form-control/form-control.component';
import { inject } from '@angular/core';

export const deactivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const form:FormControlComponent = component as FormControlComponent
  return form.canexit();
};
