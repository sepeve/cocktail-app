import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { Pagination } from '../../../models/interfaces/core/pagination.model';

export interface PaginationState {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export function withPagination(initial: Partial<PaginationState> = {}) {
    const defaultState: PaginationState = {
        pageIndex: 0,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
        ...initial,
    };

    return signalStoreFeature(
        withState<PaginationState>(defaultState),
        withComputed((store) => ({
            totalPages: () => Math.max(1, Math.ceil(store.totalItems() / store.pageSize())),
            hasNextPage: () => store.pageIndex() < Math.ceil(store.totalItems() / store.pageSize()) - 1,
            hasPrevPage: () => store.pageIndex() > 0,
            offset: () => store.pageIndex() * store.pageSize()
        })),
        withMethods((store) => ({
            setPage(pageIndex: number) {
                if (pageIndex < 0) return;
                patchState(store, { pageIndex });
            },
            setPageSize(pageSize: number) {
                if (pageSize <= 0) return;
                patchState(store, { pageSize, pageIndex: 0 });
            },
            setTotalItems(totalItems: number) {
                patchState(store, { ...defaultState, totalItems: Math.max(0, totalItems) });
            },
            nextPage() {
                if (store.hasNextPage()) {
                    patchState(store, { pageIndex: store.pageIndex() + 1 });
                }
            },
            prevPage() {
                if (store.hasPrevPage()) {
                    patchState(store, { pageIndex: store.pageIndex() - 1 });
                }
            }
        }))
    )
}
