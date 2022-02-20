import { JsonResponse, Meal } from '../model/Meal';

export class MealService {
	BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

	searchForMeal(searchTerm: string): Promise<Meal | null> {
		return fetch(this.BASE_URL + searchTerm)
			.then(res => res.json())
			.then((data: JsonResponse) => {

				console.log('-- DATA --', data);

				return data.meals ? data.meals[0] : null;
			});
	}
}