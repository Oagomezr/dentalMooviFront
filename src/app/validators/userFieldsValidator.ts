import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/user/users.service';

export function uniqueValueValidator(userService: UsersService, field: string) {
    return (control: AbstractControl) => {
        return userService.checkIfValueExists(field, control.value).pipe(
            map(exists => exists ? { uniqueValue: true } : null)
        );
    };
}