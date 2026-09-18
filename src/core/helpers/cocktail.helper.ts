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
