import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideForms, disableDeprecatedForms } from '@angular/forms';
import { APP_ROUTES } from './app/app.routes';
import { AuthService } from './app/shared/auth.service';
import { AuthGuard } from './app/shared/auth.guard';

import { AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTES,
  AuthService,
  AuthGuard
]);

