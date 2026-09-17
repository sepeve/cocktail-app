import { Injectable } from '@angular/core';
import { AppConfigModel } from '../../models';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    private config: AppConfigModel;

    get appConfig(): AppConfigModel {
        return this.config;
    }

    get apiURL(): string {
        return this.config.apiURL;
    }

    get apiKey(): string {
        return this.config.apiKey;
    }

    get production(): boolean {
        return this.config.production;
    }

    public loadConfig(url: string) {
        return new Promise<boolean>((resolve, _) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                const { readyState, status, response } = xhttp;
                if (readyState === XMLHttpRequest.DONE && status === 200) {
                    const config: AppConfigModel = JSON.parse(response);
                    this.config = Object.freeze(config);
                    resolve(true);
                }
            }

            xhttp.open("GET", url, true);
            xhttp.send();
        })
    }
}
