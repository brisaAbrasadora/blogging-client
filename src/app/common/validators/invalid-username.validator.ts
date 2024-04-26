import { AbstractControl, ValidationErrors } from '@angular/forms';

export function invalidUsernameValidator(
  c: AbstractControl
): ValidationErrors | null {
  if ((c.value as string).length > 0 &&
    !(c.value as string).match('^(?! )[a-zA-Z0-9_-]+(?<! )$')
  ) {
    return { invalidFormat: true };
  }

  return null;
}
