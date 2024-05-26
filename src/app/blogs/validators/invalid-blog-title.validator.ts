import { AbstractControl, ValidationErrors } from '@angular/forms';

export function invalidBlogTitleValidator(
  c: AbstractControl
): ValidationErrors | null {
  if ((c.value as string).length > 0 &&
    !(c.value as string).match(/^(?!\s)([A-Za-z0-9]+(\s[A-Za-z0-9]+)*)(?!\s)$/g)
  ) {
    return { invalidFormat: true };
  }

  return null;
}