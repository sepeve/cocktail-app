import { AppConfigService } from '@/core/services/app-config.service';
import { Drink } from '@/models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RandomService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly appConfigService: AppConfigService = inject(AppConfigService);
    private readonly baseUrl: string = `${this.appConfigService.apiURL}/${this.appConfigService.apiKey}`;

    get(): Observable<Drink | null> {
        const url = `${this.baseUrl}/random.php`;
        return this.http.get<{ drinks: Drink[] }>(url).pipe(
            map(res => {
                if (res?.drinks.length) {
                    return res.drinks[0] ?? null;
                }

                return null;
            })
        )
    }
}
