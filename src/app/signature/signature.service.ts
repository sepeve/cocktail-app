import { AppConfigService } from '@/core/services';
import { Drink } from '@/models';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class SignatureService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly appConfig: AppConfigService = inject(AppConfigService);
    private readonly API_URL = `${this.appConfig.apiURL}/${this.appConfig.apiKey}`;

    get(): Observable<Drink[]> {
        const url = `${this.API_URL}/popular.php`;
        return this.http.get<{ drinks: Drink[] }>(url).pipe(map(res => res.drinks || []));
    }


}
