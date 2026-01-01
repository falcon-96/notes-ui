import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  formGroup: FormGroup;
  authService?: Auth;
  router: Router;
  constructor(private readonly fb: FormBuilder, authService: Auth, router: Router) {
    this.formGroup = this.fb.group({
      fname: ['', Validators.required],
      mname: [''],
      lname: ['', Validators.required],
      username: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.authService = authService;
    this.router = router;
  }

  onSubmit() {
    const firstname = this.formGroup.get('fname')?.value;
    const middlename = this.formGroup.get('mname')?.value;
    const lastName = this.formGroup.get('lname')?.value;
    const email = this.formGroup.get('username')?.value;
    const password = this.formGroup.get('password')?.value;

    this.authService?.register(email, password, firstname, middlename, lastName)
      .subscribe({
        next: (response) => {
          alert('Thanks, You are registered.');
          this.router.navigateByUrl('/login');
        }, error: (error) => {
          console.error(error);
        }, complete: () => {
          console.log('Request complete');
        }
      });
  }
}
