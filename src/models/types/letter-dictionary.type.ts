import { Letter } from '../enums';

export interface LetterDictionary {
    key: keyof typeof Letter;
    value: Letter;
}
