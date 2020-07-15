import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState, selectToken } from 'src/app/store';
import { map, flatMap } from 'rxjs/operators';

@Injectable()
export class JWTHelper implements HttpInterceptor {
    constructor(private store: Store<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.pipe(select(selectToken))
            .pipe(flatMap(tokenState => {
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${tokenState.token}`
                });

                let _req = req.clone({ headers });

                return next.handle(_req);
            }));
    }

}