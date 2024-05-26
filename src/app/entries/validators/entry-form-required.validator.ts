import { AbstractControl, ValidationErrors } from '@angular/forms';

export function entryFormRequiredValidator(
  c: AbstractControl
): ValidationErrors | null {
  if (!c.get('title')?.value && !c.get('body')?.value) {
    return { formRequired: true };
  }

  return null;
}
