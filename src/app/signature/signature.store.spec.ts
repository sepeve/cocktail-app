import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Drink } from '@/models';
import { SignatureService } from './signature.service';
import { SignatureStore } from './signature.store';

describe('SignatureStore', () => {
    let store: InstanceType<typeof SignatureStore>;
    let signatureService: Pick<SignatureService, 'get'>;
    let titleService: Pick<Title, 'setTitle'>;

    beforeEach(() => {
        signatureService = { get: vi.fn() };
        titleService = { setTitle: vi.fn() };

        TestBed.configureTestingModule({
            providers: [
                SignatureStore,
                { provide: SignatureService, useValue: signatureService },
                { provide: Title, useValue: titleService },
            ],
        });

        store = TestBed.inject(SignatureStore);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('loads signature drinks after the delay and clears loading when complete', async () => {
        const response = new Subject<Drink[]>();
        const drinks = [{ idDrink: '11007', strDrink: 'Margarita' } as Drink];
        vi.mocked(signatureService.get).mockReturnValue(response);
        vi.useFakeTimers();

        store.get();

        expect(store.loading()).toBe(true);
        expect(titleService.setTitle).toHaveBeenCalledWith('Cocktail App - Signature');
        await vi.advanceTimersByTimeAsync(499);
        expect(signatureService.get).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(1);
        expect(signatureService.get).toHaveBeenCalledOnce();
        response.next(drinks);
        response.complete();

        expect(store.drinks()).toEqual(drinks);
        expect(store.loading()).toBe(false);
    });

    it('records a request error and clears loading', async () => {
        const response = new Subject<Drink[]>();
        vi.mocked(signatureService.get).mockReturnValue(response);
        vi.useFakeTimers();

        store.get();
        await vi.advanceTimersByTimeAsync(500);
        response.error('Request failed');

        expect(store.error()).toBe('Request failed');
        expect(store.loading()).toBe(false);
    });
});
