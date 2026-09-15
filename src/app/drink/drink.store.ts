import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Drink } from '../../models';
import { withLogger } from '../../shared/@store/with-logger';
import { DrinkService } from './drink.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

const STORE_NAME: string = "DrinkStore";

interface DrinkState {
    drinks: Drink[],
    drink: Drink | null,
    loading: boolean,
}

const initialState: DrinkState = {
    drinks: [],
    drink: null,
    loading: false,
}

export const DrinkStore = signalStore(
    withState(initialState),
    withLogger(STORE_NAME),
    withMethods(((
        store,
        drinkService = inject(DrinkService)
    ) => ({
        loadDrinks: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { ...initialState, loading: true })),
                switchMap((name: string) => {
                    return drinkService.get(name).pipe(
                        tapResponse({
                            next: (drinks: Drink[]) => patchState(store, { drinks }),
                            error: (err) => {
                                patchState(store, { drinks: [] });
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
                    return drinkService.getById(id).pipe(
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
