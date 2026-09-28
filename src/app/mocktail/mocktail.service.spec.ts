import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from '@/core/services';
import { Drink } from '@/models';
import { MocktailService } from './mocktail.service';

describe('MocktailService', () => {
    let service: MocktailService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MocktailService,
                { provide: AppConfigService, useValue: { apiURL: 'https://api.example.test/v1', apiKey: 'test-key' } },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        service = TestBed.inject(MocktailService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('requests non-alcoholic drinks and returns the response list', async () => {
        const drinks = [{ idDrink: '11007', strDrink: 'Virgin Margarita' } as Drink];
        const result = firstValueFrom(service.get());

        const request = httpTestingController.expectOne(
            'https://api.example.test/v1/test-key/filter.php?a=Non_Alcoholic',
        );
        expect(request.request.method).toBe('GET');
        request.flush({ drinks });

        await expect(result).resolves.toEqual(drinks);
    });

    it('returns an empty list when the response has no drinks', async () => {
        const result = firstValueFrom(service.get());

        httpTestingController
            .expectOne('https://api.example.test/v1/test-key/filter.php?a=Non_Alcoholic')
            .flush({ drinks: null });

        await expect(result).resolves.toEqual([]);
    });
});
