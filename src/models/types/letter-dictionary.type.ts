import { Letter } from '../enums';


export type LetterDictionary = {
    key: keyof typeof Letter;
    value: Letter;
};
