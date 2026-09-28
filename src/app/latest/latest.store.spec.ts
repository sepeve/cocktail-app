import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Drink } from '@/models';
import { LatestService } from './latest.service';
import { LatestStore } from './latest.store';

describe('LatestStore', () => {
    let store: InstanceType<typeof LatestStore>;
    let latestService: Pick<LatestService, 'get'>;
    let titleService: Pick<Title, 'setTitle'>;

    beforeEach(() => {
        latestService = { get: vi.fn() };
        titleService = { setTitle: vi.fn() };
        vi.spyOn(console, 'log').mockImplementation(() => undefined);

        TestBed.configureTestingModule({
            providers: [
                LatestStore,
                { provide: LatestService, useValue: latestService },
                { provide: Title, useValue: titleService },
            ],
        });

        store = TestBed.inject(LatestStore);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('loads latest drinks after the delay and clears loading when complete', async () => {
        const response = new Subject<Drink[]>();
        const drinks = [{ idDrink: '11007', strDrink: 'Margarita' } as Drink];
        vi.mocked(latestService.get).mockReturnValue(response);
        vi.useFakeTimers();

        store.get();

        expect(store.loading()).toBe(true);
        expect(titleService.setTitle).toHaveBeenCalledWith('Cocktail App - Signature');
        await vi.advanceTimersByTimeAsync(499);
        expect(latestService.get).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(1);
        expect(latestService.get).toHaveBeenCalledOnce();
        response.next(drinks);
        response.complete();

        expect(store.drinks()).toEqual(drinks);
        expect(store.loading()).toBe(false);
    });

    it('records a request error and clears loading', async () => {
        const response = new Subject<Drink[]>();
        vi.mocked(latestService.get).mockReturnValue(response);
        vi.useFakeTimers();

        store.get();
        await vi.advanceTimersByTimeAsync(500);
        response.error('Request failed');

        expect(store.error()).toBe('Request failed');
        expect(store.loading()).toBe(false);
        expect(console.log).toHaveBeenCalledWith('Request failed');
    });
});
