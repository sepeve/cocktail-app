import { Component, inject, OnInit } from '@angular/core';
import { DefaultLayoutComponent } from '../core/layout/default-layout.component';
import { CoreStore } from '../core/@store/core.store';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    imports: [DefaultLayoutComponent],
})

export class AppComponent implements OnInit {
    coreStore = inject(CoreStore);
    ngOnInit(): void {
        this.coreStore.loadMenu();
    }
}
