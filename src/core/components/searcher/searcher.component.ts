import { ZardInputComponent } from '@/shared/components/input';
import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
    selector: 'app-searcher',
    templateUrl: './searcher.component.html',
    imports: [ZardInputComponent, ReactiveFormsModule],
})

export class SearcherComponent implements OnInit {
    private destroyRef = inject(DestroyRef);

    placeholder = input.required<string>();
    reset = input<Subject<void>>();
    search = output<string>();

    searchCtrl: FormControl = new FormControl('');

    ngOnInit() {
        this.searchSubscription();
        if (this.reset()) {
            this.letterChangedSubscription();
        }
    }

    private searchSubscription(): void {
        this.searchCtrl.valueChanges.pipe(
            filter((text: string) => !!text && text.trim().length > 0),
            debounceTime(300),
            distinctUntilChanged()
        )
            .subscribe((value: string) => {
                this.search.emit(value);
            });
    }

    private letterChangedSubscription(): void {
        this.reset()!.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(() => {
            this.searchCtrl.setValue('');
        });
    }
}
