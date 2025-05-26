import { Routes } from '@angular/router';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfileComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
    },
];
