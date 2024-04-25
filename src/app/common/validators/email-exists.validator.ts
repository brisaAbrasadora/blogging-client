import { Inject, inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UsersService } from '../../users/services/users.service';

export function emailExistsValidator(
  c: AbstractControl,
): ValidationErrors | null {

  // if (
  //   // !c.get('username')!.value &&
  //   // !c.get('email')!.value &&
  //   // !c.get('password')!.value
  // ) {
  //   return { formRequired: true };
  // }

  return null;
}
