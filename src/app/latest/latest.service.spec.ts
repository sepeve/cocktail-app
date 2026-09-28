import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from '@/core/services';
import { Drink } from '@/models';
import { LatestService } from './latest.service';

describe('LatestService', () => {
    let service: LatestService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LatestService,
                { provide: AppConfigService, useValue: { apiURL: 'https://api.example.test/v1', apiKey: 'test-key' } },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        service = TestBed.inject(LatestService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('requests the latest drinks and returns the response list', async () => {
        const drinks = [{ idDrink: '11007', strDrink: 'Margarita' } as Drink];
        const result = firstValueFrom(service.get());

        const request = httpTestingController.expectOne(
            'https://api.example.test/v1/test-key/latest.php',
        );
        expect(request.request.method).toBe('GET');
        request.flush({ drinks });

        await expect(result).resolves.toEqual(drinks);
    });

    it('returns an empty list when the response has no drinks', async () => {
        const result = firstValueFrom(service.get());

        httpTestingController
            .expectOne('https://api.example.test/v1/test-key/latest.php')
            .flush({ drinks: null });

        await expect(result).resolves.toEqual([]);
    });
});
