import { JsonResponse, Meal } from './model/Meal';
import './style.css';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const content = document.getElementById('content');

const searchInput = document.getElementById('search-input');

searchInput?.addEventListener('keyup', (event) => {
	console.log('-- INPUT EVENT --', event);

	const searchTerm = (event.target as HTMLInputElement)?.value;
	if (event.code === 'Enter' && searchTerm) {
		searchForMeal(searchTerm);
	}
});

function searchForMeal(searchTerm: string): void {
	fetch(BASE_URL + searchTerm)
		.then((res) => res.json())
		.then((data: JsonResponse) => {
			console.log('-- DATA --', data);

			const meal = data.meals ? data.meals[0] : null;

			displayMeal(meal);
		});
}

function displayMeal(meal: Meal | null) {
	let innerHTML: string;

	if (!meal) {
		innerHTML = '<h3>No meal found. Please try again.</h3>';
	} else {
		innerHTML = `
                <div class="left">
                    <h1 class="meal-name">${ meal.strMeal }</h1>
                    <img src=${ meal.strMealThumb } alt='Meal Image' class='img'>
                    <p><span>Category: </span>${ meal.strCategory }</p>
                    <p><span>Area: </span>${ meal.strArea }</p>
                </div>
                <div class="right">
                    <h2>How To Cook</h3>
                    <p>${ meal.strInstructions }</p>
                </div>
            `;
	}

	if (content) {
		content.innerHTML = innerHTML;
	}
}
