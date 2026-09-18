import { Component, computed, output, Signal } from '@angular/core';
import { Letter, LetterDictionary } from '../../../models';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

@Component({
    selector: 'app-letter-filter',
    templateUrl: './letter-filter.component.html',
    imports: [ZardButtonComponent]
})

export class LetterFilterComponent {

    letters = Letter;
    letterDictionary: Signal<LetterDictionary[]> = computed(() => (Object.entries(Letter) as [keyof typeof Letter, Letter][]).map(
        ([key, value]) => ({ key, value })
    ));
    letterClicked = output<Letter>();
}
