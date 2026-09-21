import { Drink } from '@/models';

export function getCocktailIngredients(cocktail: Drink): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}` as keyof Drink];
        if (ingredient?.length) {
            ingredients.push(ingredient);
        }
    }
    return ingredients;
}

export function getCocktailMeasures(cocktail: Drink): string[] {
    const measures: string[] = [];
    for (let i = 1; i <= 15; i++) {
        const measure = cocktail[`strMeasure${i}` as keyof Drink];
        if (measure?.length) {
            measures.push(measure);
        }
    }
    return measures;
}
