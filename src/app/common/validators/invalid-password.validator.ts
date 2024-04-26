import { AbstractControl, ValidationErrors } from '@angular/forms';

export function invalidPasswordValidator(
  c: AbstractControl
): ValidationErrors | null {
  const atLeastOneNumber: RegExp = /^(?=.*\d).*$/;
  const atLeastOneUppercase: RegExp = /^(?=.*[A-Z]).*$/;
  const atLeastOneLowercase: RegExp = /^(?=.*[a-z]).*$/;
  const atLeastOneSpecialChar: RegExp = /^(?=.*[^\w\d\s:]).*$/;
  const noWhitespaces: RegExp = /^(?!\s)(?!.*\s$)(?!.*\s\s)[^\s]+$/;
  let e = {
    noNumber: false,
    noLowercase: false,
    noUppercase: false,
    noSpecialChar: false,
    whitespace: false,
  };

  if (!(c.value as string).match(atLeastOneNumber)) {
    e = { ...e, noNumber: true };
  }
  if (!(c.value as string).match(atLeastOneLowercase)) {
    e = { ...e, noLowercase: true };
  }
  if (!(c.value as string).match(atLeastOneUppercase)) {
    e = { ...e, noUppercase: true };
  }
  if (!(c.value as string).match(atLeastOneSpecialChar)) {
    e = { ...e, noSpecialChar: true };
  }
  if (!(c.value as string).match(noWhitespaces)) {
    e = { ...e, whitespace: true };
  }

  if (e.noNumber || e.noLowercase || e.noUppercase || e.noSpecialChar || e.whitespace) {
    return e;
  } 
  
  return null;
}
