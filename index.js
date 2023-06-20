const input = document.querySelector('[data-js="input"]');
const button = document.querySelector(".search-btn");
const randomButton = document.querySelector('[data-js="rnd-button"]');
const output = document.querySelector('[data-js="search-result"]');

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

//button to search for drinks via input
button.addEventListener("click", async () => {
  const response = await fetch(url + input.value);
  const cocktail = await response.json();
  console.log(cocktail);
  const drinks = cocktail.drinks;
  console.log(drinks);
  let html = "";
  drinks.forEach((drink) => {
    html += ` <div class="drink">

  <div class="drink-item">
    <div class="drink-item__image">
      <img src="${drink.strDrinkThumb}" alt="drink text" />
    </div>
    <h2>${drink.strDrink}</h2>
    <div class="drink-item__category">${drink.strCategory}</div>
    <a href="#" class="recipe-button">Make it</a>
  </div>`;
    output.innerHTML = html;
  });
});

//Button to get a random drink
randomButton.addEventListener("click", async () => {
  const response = await fetch(randomUrl);
  const cocktail = await response.json();

  const drink = cocktail.drinks[0];
  let html = ` <div class="drink">

<div class="drink-item">
  <div class="drink-item__image">
    <img src="${drink.strDrinkThumb}" alt="drink text" />
  </div>
  <h2>${drink.strDrink}</h2>
  <div class="drink-item__category">${drink.strCategory}</div>
  <button data-js="recipe-button" class="recipe-button">Make it</button>
</div>`;
  output.innerHTML = html;
  const recipeButton = document.querySelector('[data-js="recipe-button"]');
  recipeButton.addEventListener("click", () => {
    output.innerHTML = "";
    let html2 = `<div class="drink">
    <div class="drink-item__image">
    <h2>${drink.strDrink}</h2>
      <img src="${drink.strDrinkThumb}" alt="drink text" />
      <div class="drink-item__category">${drink.strCategory}</div>
      <p>Ingridients:</p>
      <ul data-js="ingridient-list" class="ingridient-list">
      </ul>
      <p class="instructions">
      ${drink.strInstructions}
      </p>`;
    output.innerHTML = html2;
    const ingrList = document.querySelector('[data-js="ingridient-list"]');
    const ingrArray = [
      drink.strIngredient1,
      drink.strIngredient2,
      drink.strIngredient3,
      drink.strIngredient4,
      drink.strIngredient5,
      drink.strIngredient6,
      drink.strIngredient7,
      drink.strIngredient8,
      drink.strIngredient9,
      drink.strIngredient10,
      drink.strIngredient11,
      drink.strIngredient12,
      drink.strIngredient13,
      drink.strIngredient14,
      drink.strIngredient15,
    ];
    console.log(ingrArray);
    ingrArray
      .filter((ingr) => ingr != null)
      .forEach((ingr) => {
        const listElement = document.createElement("li");
        listElement.textContent = ingr;
        ingrList.append(listElement);
      });
  });
});
console.log(randomButton);
