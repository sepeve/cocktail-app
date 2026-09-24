import { LatestService } from '@/app/latest/latest.service';
import { BaseStoreState, Drink } from '@/models';
import { withLogger } from '@/shared/@store/with-logger';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, pipe, switchMap, tap } from 'rxjs';

const STORE_NAME = "LatestStore";
interface LatestState extends BaseStoreState {
    drinks: Drink[]
}

const initialState: LatestState = {
    drinks: [],
    loading: false,
    error: null
}


export const LatestStore = signalStore(
    withState(initialState),
    withLogger(STORE_NAME),
    withProps(() => ({
        _latestService: inject(LatestService),
        _titleService: inject(Title)
    })),
    withMethods((store) => ({
        get: rxMethod<void>(
            pipe(
                tap(() => {
                    patchState(store, { loading: true });
                    store._titleService.setTitle('Cocktail App - Signature');
                }),
                delay(500),
                switchMap(() => store._latestService.get().pipe(
                    tapResponse({
                        next: (drinks: Drink[]) => patchState(store, { drinks }),
                        error: (error: string) => {
                            console.log(error);
                            patchState(store, { error });
                        },
                        finalize: () => patchState(store, { loading: false })
                    })
                ))
            )
        )
    }))
);
