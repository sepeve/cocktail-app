import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { BaseStoreState, Drink, Letter } from '../../models';
import { DrinkService } from './drink.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { withLogger } from '@/shared/@store/with-logger';
import { withPagination } from '@/shared/@store/with-pagination';
import { Title } from '@angular/platform-browser';

const STORE_NAME: string = "DrinkStore";

interface DrinkState extends BaseStoreState {
    drinks: Drink[],
    drink: Drink | null,
}

const initialState: DrinkState = {
    drinks: [],
    drink: null,
    loading: false,
    error: null
}

export const DrinkStore = signalStore(
    withState(initialState),
    withLogger(STORE_NAME),
    withProps(() => ({
        _drinkService: inject(DrinkService),
        _titleService: inject(Title)
    })),
    withPagination({ pageSize: 25 }),
    withMethods(((store) => ({
        get: rxMethod<string>(
            pipe(
                tap(() => {
                    patchState(store, { ...initialState, loading: true });
                    store._titleService.setTitle('Cocktail App - Drinks');
                }),
                switchMap((name: string) => {
                    return store._drinkService.get(name).pipe(
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
        ),

        getByLetter: rxMethod<Letter>(
            pipe(
                tap(() => {
                    patchState(store, { ...initialState, loading: true });
                    store._titleService.setTitle('Cocktail App - Drinks');
                }),
                switchMap((letter: Letter) => {
                    return store._drinkService.getByLetter(letter).pipe(
                        tapResponse({
                            next: (drinks: Drink[]) => {
                                store.setTotalItems(drinks.length);
                                patchState(store, { drinks });
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
        ),

        getById: rxMethod<string>(
            pipe(
                tap(() => {
                    patchState(store, { drink: null, loading: true });
                    store._titleService.setTitle('Loading Drink...');
                }),
                switchMap((id: string) => {
                    return store._drinkService.getById(id).pipe(
                        delay(1000),
                        tapResponse({
                            next: (drink: Drink | null) => {
                                patchState(store, { drink });
                                if (drink) {
                                    store._titleService.setTitle(drink.strDrink);
                                }
                            },
                            error: (err: string) => {
                                patchState(store, { drink: null, error: err });
                                store._titleService.setTitle('Cocktail App - Drink');
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

