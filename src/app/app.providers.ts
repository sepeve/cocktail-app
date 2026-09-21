import { inject } from '@angular/core';
import { AppConfigService } from '../core/services/app-config.service'
import { environment } from '../environments/environment.development';
import { lucideAward, lucideMartini, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { matHomeOutline, matFiberNewOutline, matAutorenewFillOutline, matDoNotDisturbOnOutline, matArrowBack2FillOutline, matArrowBackIosNewFillOutline } from '@ng-icons/material-symbols/outline';

export const initializeApp = () => {
    const appConfigService = inject(AppConfigService);
    return appConfigService.loadConfig(environment.configPath);
}

export const appIcons = (): Record<string, string> => ({
    'chevronLeft': matArrowBackIosNewFillOutline,
    'glass': lucideMartini,
    'award': lucideAward,
    'sun': lucideSun,
    'moon': lucideMoon,
    'home': matHomeOutline,
    'latest': matFiberNewOutline,
    'random': matAutorenewFillOutline,
    'not': matDoNotDisturbOnOutline,
    'arrowLeft': matArrowBack2FillOutline,
})
