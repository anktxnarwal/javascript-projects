const searchBox = document.querySelector("#search-Box");
const searchBtn = document.querySelector(".search-Btn");
const recipeCon = document.querySelector(".recipe-container");
const recipeDetailes = document.querySelector(".recipe-detail-container");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const recipes = async (items) => {
  recipeCon.innerHTML = "Fetching Recipes";
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${items}`
  );

  const response = await data.json();
  recipeCon.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
    <img src='${meal.strMealThumb}'>
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p> Belogns to <span>${meal.strCategory} </span>Category</p>
    `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);
    button.addEventListener("click", () => {
      openRecipePopup(meal);
    });
    recipeCon.appendChild(recipeDiv);
  });
};
const fetchIngredients = (meal) => {
  let ingredientList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientList;
};
const openRecipePopup = (meal) => {
  recipeDetailes.innerHTML = `
  <h2 class="recipe-name">${meal.strMeal}</h2>
  <h3>Ingredients:</h3>
  <ul class="recipe-ingredientList">
  ${fetchIngredients(meal)}
  </ul>
  <div class="recipe-instructions">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
  </div>
  `;

  recipeDetailes.parentElement.style.display = "block";
};
recipeCloseBtn.addEventListener("click", () => {
  recipeDetailes.parentElement.style.display = "none";
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchedItem = searchBox.value.trim();
  recipes(searchedItem);
});
