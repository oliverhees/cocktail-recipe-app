const input = document.querySelector('[data-js="input"]');
const button = document.querySelector(".search-btn");
const randomButton = document.querySelector('[data-js="rnd-button"]');
const output = document.querySelector('[data-js="search-result"]');

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

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
randomButton.addEventListener("click", async () => {
  const response = await fetch(randomUrl);
  const cocktail = await response.json();

  const drink = cocktail.drinks[0];
  console.log(drink);
  let html = ` <div class="drink">

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
console.log(randomButton);
