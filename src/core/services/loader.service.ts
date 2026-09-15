import { inject, Injectable } from '@angular/core';
import { CoreStore } from '../@store/core.store';

@Injectable({ providedIn: "root" })
export class LoaderService {

    private requestMap: Set<string> = new Set<string>()
    readonly coreStore = inject(CoreStore);

    showLoading(url: string) {
        if (!url) {
            throw new Error("URL requerida");
        }

        this.requestMap.add(url);
        this.coreStore.setLoader(true);
    }

    hideLoading(url: string) {
        if (!url) {
            throw new Error("URL requerida");
        }

        this.requestMap.delete(url);

        if (this.requestMap.size === 0) {
            this.coreStore.setLoader(false);
        }
    }

    hidelAllLoading() {
        this.requestMap.clear();
        this.coreStore.setLoader(false);
    }
}
