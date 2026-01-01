import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  formGroup: FormGroup;
  authService: Auth;
  constructor(private readonly fb: FormBuilder, authService: Auth, private router: Router) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.minLength(3), Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
    this.authService = authService;
  }


  onSubmit() {
    console.log('Form Value: ', this.formGroup.value);
    this.authService.login(this.formGroup.get('username')?.value, this.formGroup.get('password')?.value)
      .pipe(catchError((error: any) => {
        if (String(error.status).startsWith('4')) {
          alert('Invalid Username/Password combination.');
        }
        return throwError(() => error);
      }))
      .subscribe({
        next: (response) => {
          console.log(response);
          this.authService.saveToken(response.token);
          console.log('Login Success');
          this.router.navigateByUrl('/mainPage');
        }, error: (error) => {
          // alert(error.message);
        }, complete: () => console.log('Request complete')
      });

  }
}
