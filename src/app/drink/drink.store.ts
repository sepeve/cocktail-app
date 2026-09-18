import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { Drink, Letter } from '../../models';
import { DrinkService } from './drink.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { withLogger } from '@/shared/@store/with-logger';
import { withPagination } from '@/shared/@store/with-pagination';

const STORE_NAME: string = "DrinkStore";

interface DrinkState {
    drinks: Drink[],
    drink: Drink | null,
    loading: boolean
}

const initialState: DrinkState = {
    drinks: [],
    drink: null,
    loading: false,
}

export const DrinkStore = signalStore(
    withState(initialState),
    withLogger(STORE_NAME),
    withProps(() => ({
        _drinkService: inject(DrinkService)
    })),
    withPagination({ pageSize: 25 }),
    withMethods(((store) => ({
        loadDrinks: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { ...initialState, loading: true })),
                switchMap((name: string) => {
                    return store._drinkService.get(name).pipe(
                        tapResponse({
                            next: (drinks: Drink[]) => {
                                store.setTotalItems(drinks.length);
                                patchState(store, { drinks })
                            },
                            error: (err) => {
                                patchState(store, { drinks: [] });
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
        ),

        loadDrinksByLeter: rxMethod<Letter>(
            pipe(
                tap(() => patchState(store, { ...initialState, loading: true })),
                switchMap((letter: Letter) => {
                    return store._drinkService.getByLetter(letter).pipe(
                        tapResponse({
                            next: (drinks: Drink[]) => {
                                store.setTotalItems(drinks.length);
                                patchState(store, { drinks });
                            },
                            error: (err) => {
                                patchState(store, { drinks: [] });
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
        ),

        loadDrink: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { drink: null, loading: true })),
                switchMap((id: string) => {
                    return store._drinkService.getById(id).pipe(
                        tapResponse({
                            next: (drink: Drink | null) => patchState(store, { drink }),
                            error: (err) => {
                                patchState(store, { drink: null });
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

