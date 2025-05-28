import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm!: FormGroup;

  isLoading: Boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.isLoading = true;
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: (data: any) => {
        console.log('Data:', data);
        localStorage.setItem('user', JSON.stringify({ ...JSON.parse(data).user, token: JSON.parse(data).token }));
        this.isLoading = false;
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        this.isLoading = false;
        let errorRes = JSON.parse(err.error);
        console.log('Handled error:', err.message)
      }
    });
  }

  goToSignUp() {
    this.router.navigateByUrl('/register');
  }

}
