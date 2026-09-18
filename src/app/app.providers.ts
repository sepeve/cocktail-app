import { inject } from '@angular/core';
import { AppConfigService } from '../core/services/app-config.service'
import { environment } from '../environments/environment.development';
import { matChevronBackwardSharp } from '@ng-icons/material-symbols/sharp';
import { lucideAward, lucideMartini, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { matHomeOutline, matFiberNewOutline, matAutorenewFillOutline, matDoNotDisturbOnOutline } from '@ng-icons/material-symbols/outline';

export const initializeApp = () => {
    const appConfigService = inject(AppConfigService);
    return appConfigService.loadConfig(environment.configPath);
}

export const appIcons = (): Record<string, string> => ({
    matChevronBackwardSharp,
    lucideMartini,
    lucideAward,
    lucideSun,
    lucideMoon,
    matHomeOutline,
    matFiberNewOutline,
    matAutorenewFillOutline,
    matDoNotDisturbOnOutline
})
