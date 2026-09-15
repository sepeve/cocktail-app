import { inject } from '@angular/core';
import { AppConfigService } from '../core/services/app-config.service'
import { environment } from '../environments/environment.development';

export const initializeApp = () => {
    const appConfigService = inject(AppConfigService);
    return appConfigService.loadConfig(environment.configPath);
}
