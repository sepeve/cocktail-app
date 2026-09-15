import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ColorScheme } from '../../models/enums/color-scheme.enum'
import { withLogger } from '../../shared/@store/with-logger';
import { Menu } from '../../models';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { inject } from '@angular/core';

const STORE_NAME: string = "CoreStore";

interface CoreState {
    colorScheme: ColorScheme;
    isLoading: boolean;
    isSidenavHidden: boolean;
    menu: Array<Menu>;
}

const initialState: CoreState = {
    colorScheme: ColorScheme.Light,
    isLoading: false,
    isSidenavHidden: true,
    menu: []
};

export const CoreStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withLogger(STORE_NAME),
    withMethods(((
        store,
        menuService = inject(MenuService)
    ) => ({
        loadMenu: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap(() => {
                    return menuService.getMenu().pipe(
                        tapResponse({
                            next: (menu: Menu[]) => patchState(store, { menu, isLoading: false }),
                            error: (err) => {
                                patchState(store, { isLoading: false });
                                console.log(err);
                            }
                        })
                    )
                })
            )
        ),
        setLoader(isLoading: boolean): void {
            patchState(store, { isLoading });
        },
        setSidenavOpen(isSidenavHidden: boolean): void {
            patchState(store, { isSidenavHidden });
        },
    })))
)
