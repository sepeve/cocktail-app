import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { AppConfigService } from '../services';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';

export function loaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const urlsToExclude = ["/public"];
    const appConfig = inject(AppConfigService);
    const { url } = req;

    if (urlsToExclude.some((x) => url.indexOf(x) >= 0) || url.endsWith(".svg") || !url.includes(appConfig.apiURL)) {
        return next(req);
    }

    const loaderService = inject(LoaderService);
    loaderService.showLoading(url);
    return next(req).pipe(
        catchError((e) => {
            loaderService.hideLoading(url);
            throw new Error(e);
        }),
        tap((evt: any) => {
            if (evt instanceof HttpResponse) {
                loaderService.hideLoading(url);
            }
        })
    )

}
