const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const cocktailList = document.querySelector(".drink");
const recipeModal = document.querySelector(".recipe-modal");
const recipeDetialContent = document.querySelector(".recipe-detail-content");
const closeButton = document.getElementById("recipe-close-btn");
const welcome = document.querySelector(".welcome");
const searchResult = document.querySelector(".search-result");

//event listeners
searchBtn.addEventListener("click", getDrinkList);
searchInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    event.preventDefault(); // Verhindert das Standardverhalten (z.B. Formularübermittlung)
    getDrinkList();
  }
});
cocktailList.addEventListener("click", getRecipe);
closeButton.addEventListener("click", () => {
  recipeModal.classList.remove("recipe-show");
  console.log("test");
});

//get drink list by search input
async function getDrinkList() {
  //get search input (value), and remove spaces on start and end (trim())
  let searchInput = document.getElementById("search-input").value.trim();

  try {
    //fetch the data from api
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`
    );
    //wait on response and get json
    const data = await response.json();

    //set empty html variable
    let html = "";

    //check data have drinks
    if (data.drinks) {
      //or response.ok
      //hide welcome
      welcome.classList.remove("show-welcome");
      //iterate over drinks array
      data.drinks.forEach((drink) => {
        //fill variable with modified html and data
        html += `
            <!-- drink item -->
          <div class="drink-item" data-id="${drink.idDrink}">
            <div class="drink-item__image">
              <img src="${drink.strDrinkThumb}" alt="drink text" />
            </div>
            <h2>${drink.strDrink}</h2>
            <div class="drink-item__category">${drink.strCategory}</div>
            <a href="#" class="recipe-button">Make it</a>
          </div>
          <!-- end drink item -->
            `;
      });
    } else {
      //log in console when no drinks found
      welcome.classList.remove("show-welcome");
      
      const notfound = document.createElement("div");
      notfound.classList.add("not-found");
      notfound.innerHTML = `<h2>Sorry! No recipe found.</h2><img src="/assets/img/mojito-cuate.png" alt="No recipe found">`;
      searchResult.append(notfound);
    }
    //insert html
    cocktailList.innerHTML = html;
  } catch (error) {
    //log in console when give error
    console.log(error);
  }
}

//get cocktail recipe by data-id
async function getRecipe(event) {
  event.preventDefault();

  //check event.target contains recipe-btn
  if (event.target.classList.contains("recipe-button")) {
    //for debugging
    // console.log(event.target);
    // console.log(event.target.parentElement);
    // console.log(event.target.parentElement.parentElement);
    // console.log(event.target.parentElement.dataset);

    //define variable to get parent element from button
    let drinkItem = event.target.parentElement;

    //call API with drink ID
    const recipeRes = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkItem.dataset.id}`
    );
    //get json data from response
    const recipeData = await recipeRes.json();

    //insert data to modal
    drinkRecipeModal(recipeData.drinks);
  }
}

//create modal recipe box
function drinkRecipeModal(drink) {
  //debugging
  // console.log(drink);
  // console.log(drink[0].idDrink);

  recipeModal.classList.add("recipe-show");
  //create Ingredient list
  let list = "";
  for (let i = 1; i <= 15; i++) {
    if (
      drink[0]["strIngredient" + i] != null &&
      drink[0]["strMeasure" + i] != null
    ) {
      list += `
      <li>${drink[0]["strIngredient" + i]}: ${drink[0]["strMeasure" + i]}</li>`;
    }
  }

  let html = `
  <h2>${drink[0].strDrink}</h2>
  <div class="recipe-instructions">
  <div class="one-fourth">
    <img src="${drink[0].strDrinkThumb}" alt="recipe">
  </div>
  <div class="three-fourth">
    <p class="recipe-modal__instructions">${drink[0].strInstructions}</p>
    <h3>Ingredients:</h3>
    <ul class="recipe-modal__ingredients">${list}</ul>
  </div>
  </div>`;
  recipeDetialContent.innerHTML = html;
  recipeModal.classList.add("recipe-show");
}
