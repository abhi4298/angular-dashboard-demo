import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  signUpForm: FormGroup;

  isLoading: Boolean = false;
  serviceError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.register(
      this.signUpForm.get('firstName')!.value,
      this.signUpForm.get('lastName')!.value,
      this.signUpForm.get('phoneNumber')!.value,
      this.signUpForm.get('email')!.value,
      this.signUpForm!.get('password')!.value
    ).subscribe({
      next: (data: any) => {
        console.log('Data:', data);
        this.isLoading = false;
        this.router.navigateByUrl('/login');
      },
      error: (err: any) => {
        this.isLoading = false;
        console.log('Handled error:', JSON.parse(err.error));
        let errorRes = JSON.parse(err.error);
        if (errorRes.errors && errorRes.errors.length) {
          this.serviceError = errorRes.errors[0].message;
        } else {
          this.serviceError = errorRes.message;
        }
      }
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
