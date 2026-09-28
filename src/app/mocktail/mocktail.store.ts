import { MocktailService } from '@/app/mocktail/mocktail.service';
import { BaseStoreState, Drink } from '@/models';
import { withLogger } from '@/shared/@store/with-logger';
import { withPagination } from '@/shared/@store/with-pagination';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

const STORE_NAME = "MocktailStore";
interface MocktailState extends BaseStoreState {
    drinks: Drink[]
}

const initialState: MocktailState = {
    drinks: [],
    loading: false,
    error: null
}

export const MocktailStore = signalStore(
    withState(initialState),
    withLogger(STORE_NAME),
    withProps(() => ({
        _mocktailService: inject(MocktailService),
        _titleService: inject(Title)
    })),
    withPagination({ pageSize: 10 }),
    withMethods(((store) => ({
        get: rxMethod<void>(
            pipe(
                tap(() => {
                    patchState(store, { ...initialState, loading: true });
                    store._titleService.setTitle("Cocktail App - Mocktails")
                }),
                switchMap(() => {
                    return store._mocktailService.get().pipe(
                        tapResponse({
                            next: (drinks: Drink[]) => {
                                store.setTotalItems(drinks.length);
                                patchState(store, { drinks })
                            },
                            error: (err: string) => {
                                patchState(store, { drinks: [], error: err });
                                store.setTotalItems(0);
                                console.log(err);
                            },
                            finalize: () => {
                                patchState(store, { loading: false });
                            }
                        })
                    )
                })
            )
        )
    })))
)
