import { Component, input } from '@angular/core';

@Component({
    selector: "app-loader",
    templateUrl: "./loader.component.html",
    styleUrl: "./loader.component.css"
})

export class LoaderComponent {

    isLoading = input<boolean>();
}
