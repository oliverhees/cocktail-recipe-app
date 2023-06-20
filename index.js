const searchBtn = document.getElementById("search-btn");
const cocktailList = document.querySelector(".drink");

//event listeners
searchBtn.addEventListener("click", getDrinkList);

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
      console.log("Nothing found");
    }
    //insert html
    cocktailList.innerHTML = html;
  } catch (error) {
    //log in console when give error
    console.log(error);
  }
}
