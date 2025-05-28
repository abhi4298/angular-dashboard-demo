import { Routes } from '@angular/router';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { HomeComponent } from './Pages/home/home.component';
import { AuthGuard } from './Helpers/AuthGuard/auth-guard.guard';
import { LoginGuard } from './Helpers/LoginGuard/login-guard.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfileComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
    },
];
