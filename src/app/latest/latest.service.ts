import { AppConfigService } from '@/core/services';
import { Drink } from '@/models';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class LatestService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly appConfigService: AppConfigService = inject(AppConfigService);
    private readonly baseUrl = `${this.appConfigService.apiURL}/${this.appConfigService.apiKey}`;

    get(): Observable<Drink[]> {
        const url = `${this.baseUrl}/latest.php`;
        return this.http.get<{ drinks: Drink[] }>(url).pipe(map(res => res.drinks || []));
    }
}
