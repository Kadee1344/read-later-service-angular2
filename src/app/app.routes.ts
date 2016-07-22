import { provideRouter } from "@angular/router";

import { SignupComponent } from "./unprotected/signup.component";
import { SigninComponent } from "./unprotected/signin.component";
import { ReadArticlesComponent } from "./protected/read-articles.component";
import { AuthGuard } from './shared/auth.guard';

export const APP_ROUTES = [
  provideRouter([
    { path: '', redirectTo:'/signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'read', component: ReadArticlesComponent, canActivate: [AuthGuard] }
  ])
];
