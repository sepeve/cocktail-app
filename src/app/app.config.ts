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
import { lucideAward, lucideMartini, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { matHomeOutline, matFiberNewOutline, matAutorenewFillOutline, matDoNotDisturbOnOutline } from '@ng-icons/material-symbols/outline';
import { provideZard } from '@/shared/core/provider/providezard';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule, CommonModule),
        provideAppInitializer(() => initializeApp()),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([loaderInterceptor]), withInterceptorsFromDi()),
        provideNgIconsConfig({ size: '1em' }),
        provideZard(),
        provideIcons({ matChevronBackwardSharp, lucideMartini, lucideAward, lucideSun, lucideMoon, matHomeOutline, matFiberNewOutline, matAutorenewFillOutline, matDoNotDisturbOnOutline }),
    ]
};
