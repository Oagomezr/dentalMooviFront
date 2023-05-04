import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/user/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uniqueValueValidator } from 'src/app/validators/userFieldsValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userFormGroup = new FormGroup({
    idUser: new FormControl(0),
    username: new FormControl('', { validators:[Validators.required, Validators.pattern('^[a-zA-Z0-9_-]*$')],
                              asyncValidators: uniqueValueValidator(this.userService, 'username'),
                              updateOn: 'blur'}),
    firstName: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z\s]+$')], updateOn: 'blur'}),
    lastName: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z\s]+$')], updateOn: 'blur'}),
    email: new FormControl( '', { validators: [Validators.required, Validators.email],
                            asyncValidators: uniqueValueValidator(this.userService, 'email'),
                            updateOn: 'blur'}),
    celPhone: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z\s]+$')], updateOn: 'blur'}),
    birthday: new FormControl(''),
    gender: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UsersService){}

  createUser(): void {
    this.organizeInformation();
    this.userService.createUser(this.userFormGroup.value).subscribe({
      next: userCreated => {
        console.log(userCreated);
      },
      error: error => {
        console.error(error.error.message);
      }
    });
  }

  //process each field to have organized information to database
  private organizeInformation(): void{
    Object.keys(this.userFormGroup.controls).forEach(key => {
      let keyValue = this.userFormGroup.get(key)?.value;
      if(typeof keyValue === 'string' && !(/\d/.test(keyValue))){
        this.userFormGroup.get(key)?.setValue(this.changeToTextCapitalization(keyValue));
      }
    });
  }

  //It allow us to change the first letter to upper case and the rest lower case at start or after a space
  private changeToTextCapitalization(value: string): string {
    let word = value.charAt(0).toUpperCase()+ value.slice(1).toLowerCase();
    return word.replace(/\b\w/g, (l) => l.toUpperCase());
  }
}
