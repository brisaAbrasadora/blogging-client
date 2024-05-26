import { AbstractControl, ValidationErrors } from '@angular/forms';

export function userFormRequiredValidator(
  c: AbstractControl
): ValidationErrors | null {
  if (
    !c.get('username')?.value &&
    !c.get('email')?.value &&
    !c.get('password')?.value
  ) {
    return { formRequired: true };
  }

  return null;
}
