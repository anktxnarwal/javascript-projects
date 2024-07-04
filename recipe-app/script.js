const searchBox = document.querySelector("#search-Box");
const searchBtn = document.querySelector(".search-Btn");
const recipeCon = document.querySelector(".recipe-container");

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
    recipeCon.appendChild(recipeDiv);
  });
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchedItem = searchBox.value.trim();
  recipes(searchedItem);
});
