import { ApplicationConfig, importProvidersFrom, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { initializeApp } from './app.providers';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { loaderInterceptor } from '../core/interceptors/loader.interceptor';
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { matChevronBackwardSharp } from '@ng-icons/material-symbols/sharp';
import { lucideAward, lucideMartini } from '@ng-icons/lucide';
import { matFiberNewOutline, matAutorenewFillOutline, matDoNotDisturbOnOutline } from '@ng-icons/material-symbols/outline';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule, CommonModule),
        provideAppInitializer(() => initializeApp()),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([loaderInterceptor]), withInterceptorsFromDi()),
        provideNgIconsConfig({ size: '2em' }),
        provideIcons({ matChevronBackwardSharp, lucideMartini, lucideAward, matFiberNewOutline, matAutorenewFillOutline, matDoNotDisturbOnOutline })
    ]
};
