import { AbstractControl, ValidationErrors } from '@angular/forms';

export function blogFormRequiredValidator(
  c: AbstractControl
): ValidationErrors | null {
  if (!c.get('title')?.value && !c.get('description')?.value) {
    return { formRequired: true };
  }

  return null;
}
