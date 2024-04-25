import { CanDeactivateFn } from '@angular/router';

import { CanComponentDeactivate } from '../interfaces/can-component-deactivate.interface';

export const leavePageGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate? component.canDeactivate() : true;
};
