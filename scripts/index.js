/***********************/
/**** DATA STORAGE ****/
/*********************/
  /** RECUPERATION DATA **/
  import { recipes } from "../data/recipes.js";
  /****** STORAGE &  ERADICATION OF DUPLICATE ******/
  
  /** STORAGE OF SELECTED/SORTED DATA **/
  let selectedItemsArray = [];

    /** Remove duplicate **/
      function removeDuplicate(arrayTotal) {
        let arrayToLowercase = arrayTotal.map((item) => item.toLowerCase());
        return [...new Set(arrayToLowercase)];
      }
    /** Recuperation of ingredients **/
      let ingredientsArray = [];
      function getIngredientsData(recipesToDisplay) {
        //à modifier partir d'une list de recette
        recipesToDisplay.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            ingredientsArray.push(ingredient.ingredient);
          });
        });

        ingredientsArray = removeDuplicate(ingredientsArray);
      } getIngredientsData(recipes);
    /** Recuperation of appareils **/
      let appareilsArray = [];
      function getAppareilsData() {
        recipes.forEach((recipe) => {
          appareilsArray.push(recipe.appliance);
        });

        appareilsArray = removeDuplicate(appareilsArray);
      } getAppareilsData();
    /** Recuperation of USTENSILS **/
      let ustensilsArray = [];
      function getUstensilsData() {
        recipes.forEach((recipe) => {
          recipe.ustensils.forEach((ustensil) => {
            ustensilsArray.push(ustensil);
          });
        });
        ustensilsArray = removeDuplicate(ustensilsArray);
      } getUstensilsData();

/************************************************/
/******************* TEMPLATES *****************/
/**********************************************/
  /************************/
  /*** TEMPLATE RECIPES ***/
  /************************/
    function templateRecipeCard(recipe) {
      const recipePicture = `assets/recipes/${recipe.image}`;
      const recipesSection = document.getElementById("recipesSection");
      const article = document.createElement("article");
      article.setAttribute("class", "recipes_card");

      const img = document.createElement("img");
      img.setAttribute("src", recipePicture);
      img.setAttribute("class", "recipePicture");

      const time = document.createElement("p");
      time.setAttribute("class", "time");
      time.textContent = recipe.time + "min";

      const h4 = document.createElement("h4");
      h4.textContent = recipe.name;

      const h5Recette = document.createElement("h5");
      h5Recette.textContent = "RECETTE";

      const p = document.createElement("p");
      p.setAttribute("class", "recipeDescription");
      p.textContent = recipe.description;

      const h5Ingredients = document.createElement("h5");
      h5Ingredients.textContent = "INGREDIENTS";

      const divIngredients = document.createElement("div");
      divIngredients.setAttribute("class", "ingredients");

      //boucle for ingredients//
      let recipeIngredients = recipe.ingredients;

      recipeIngredients.forEach((ingredients) => {
        const divIngredient = document.createElement("div");
        divIngredient.setAttribute("class", "ingredient");

        let ingredient = document.createElement("p");
        ingredient.textContent = ingredients.ingredient;

        const divQtyUnit = document.createElement("div");
        divQtyUnit.setAttribute("class", "quantityAndUnit");
        let quantity = document.createElement("p");
        quantity.textContent = ingredients.quantity;
        let unit = document.createElement("p");
        unit.textContent = ingredients.unit;

        divIngredient.appendChild(ingredient);
        divIngredient.appendChild(divQtyUnit);
        divQtyUnit.appendChild(quantity);
        divQtyUnit.appendChild(unit);
        divIngredients.appendChild(divIngredient);
      });
      //
      article.appendChild(img);
      article.appendChild(time);
      article.appendChild(h4);
      article.appendChild(h5Recette);
      article.appendChild(p);
      article.appendChild(h5Ingredients);
      article.appendChild(divIngredients);
      recipesSection.appendChild(article);
    }
  /***************************/
  /** TEMPLATE SELECTED TAG **/
  /***************************/
    function tamplateTag(selectedTag, index) {
      const divSelectedItems = document.getElementById("selectedItems");

      const divSelectedItem = document.createElement("div");
      divSelectedItem.setAttribute("class", "selectedItemDisplay");

      let selectedItem = document.createElement("p");
      selectedItem.setAttribute("class", selectedTag.label);
      selectedItem.textContent = selectedTag.value;

      const deleteIcon = document.createElement("i");
      deleteIcon.setAttribute("class", "fa-solid fa-xmark fa-lg deleteTag");

      deleteIcon.addEventListener("click", () => {
        selectedItemsArray.splice(index, 1);
        const test = searchByTags(recipes, selectedItemsArray);
        //
        //
        ingredientsArray = []
        getIngredientsData(test)
        displayAllSelect()
        displayTag();
      });

      divSelectedItems.appendChild(divSelectedItem);
      divSelectedItem.appendChild(selectedItem);
      divSelectedItem.appendChild(deleteIcon);

      displayAllSelect();
    }
/**********************************************/

/***************************/
/**  UPDATE RECIPES LIST  **/
/***************************/

/** SEARCH BY TAGS **/
  function searchByTags(recipesList, selectedItemsArray) {
    return recipesList.filter((recipe) => {
      let isOk = true;
      selectedItemsArray.forEach((item) => {
        if (item.label === "Ingredient") {
          let isIngredientFound = false;
          recipe.ingredients.forEach((ingredient) => {
            if (
              ingredient.ingredient.toLowerCase() === item.value.toLowerCase()
            ) {
              isIngredientFound = true;
            }
          });
          if (isIngredientFound === false) {
            isOk = false;
          }
        }

        if (item.label === "Appareil") {
          if (item.value.toLowerCase() !== recipe.appliance.toLocaleLowerCase()) {
            isOk = false;
          }
        }

        if (item.label === "Ustensile") {
          if (!recipe.ustensils.includes(item.value.toLocaleLowerCase())) {
            isOk = false;
          }
        }
      });
      return isOk;
    });
  }

/** SEARCH BY TEXT **/
  function searchByText(recipesFiltered, textSearch) {
    if (textSearch.length < 3) {
      return recipesFiltered;
    }
    return recipesFiltered.filter((recipe) => {
      let isTextFound = false;
      // ....
      if (
        recipe.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
      ) {
        isTextFound = true;
      }
      if (
        recipe.description
          .toLocaleLowerCase()
          .includes(textSearch.toLocaleLowerCase())
      ) {
        isTextFound = true;
      }

      return isTextFound;
    });
  }

/** UPDATE RECIPES LIST WITH TAGS AND TEXT **/
  function updateRecipesList(selectedItemsArray, textSearch) {
    const filteredRecipesByTags = searchByTags(recipes, selectedItemsArray);
    const filteredRecipesByText = searchByText(filteredRecipesByTags, textSearch); // recipes total
    console.log(filteredRecipesByText);

    let numberOfRecipes = filteredRecipesByText.length;
    updateRecipesNumber(numberOfRecipes);
    let filteredRecipes = filteredRecipesByText
  
    return filteredRecipes;
  }
  
/** TEXT SEARCH CLICK EVENT **/
  let searchBtn = document.getElementById("search_icon");
  searchBtn.addEventListener("click", () => { 
    const textValue = document.getElementById("search_input").value;
    updateRecipesList(selectedItemsArray, textValue);
    const recipesFiltered = updateRecipesList(selectedItemsArray, textValue);
    ingredientsArray = []
    console.log('1st' + ingredientsArray)
    getIngredientsData(recipesFiltered)
    //
    //
    console.log('2nd' + ingredientsArray)
    displayAllSelect()
    
  });
/****************************/
/** UPDATE RECIPES NUMBER **/
/**************************/  

  const displayedRecipesNumber = document.getElementById('recipes_number')
  function updateRecipesNumber(updatedNumberRecipes){
    if(updatedNumberRecipes > 1){
      displayedRecipesNumber.innerHTML = updatedNumberRecipes +" recettes"
    }else{
      displayedRecipesNumber.innerHTML = updatedNumberRecipes +" recette"
    }
  }
  
/****************************************************************************/
/*******************      INTEGRATION IN THE DOM       *********************/
/**************************************************************************/
  /**** SELECTED TAG INTEGRATION ****/
  function displayTag() {
    const selectedItems = document.getElementById("selectedItems");
    selectedItems.innerHTML = "";
    for (let i = 0; i < selectedItemsArray.length; i++) {
      tamplateTag(selectedItemsArray[i], i);
    }
    updateRecipesList(selectedItemsArray, "");
    displayAllSelect();

  }
  function getOnlyTagsNotDisplayed(baseArray) {
    return baseArray.filter((value) => {
      let found = false;
      selectedItemsArray.forEach((selectedTag) => {
        if (selectedTag.value === value) {
          found = true;
        }
      });
      return !found;
    });
  }
  /**** INGREDIENTS OPTION INTEGRATION ****/
  function displayOptionForType(array, selectId, className, boxSearchId, inputId) {
    const optionsToDisplay = getOnlyTagsNotDisplayed(array);
    const select = document.getElementById(selectId);
    select.innerHTML = "";

    let optionTitle = document.createElement("option");
    optionTitle.setAttribute('value', " ")
    optionTitle.setAttribute('selected', '')
    optionTitle.setAttribute('hidden', '')
    optionTitle.textContent = className
    select.appendChild(optionTitle)
/*
    let divInput = document.createElement('div')
    divInput.setAttribute('class', 'search_input_option')
    divInput.setAttribute('id', boxSearchId)
    let input = document.createElement('input')
    input.setAttribute('type', 'search')
    input.setAttribute('id', inputId)
    let spanIcon = document.createElement('span')
    spanIcon.setAttribute('class',"search_icon_option")
    let icon = document.createElement('i')
    icon.setAttribute('class', "fa-solid fa-magnifying-glass fa")
    divInput.appendChild(input)
    divInput.appendChild(spanIcon)
    spanIcon.appendChild(icon)
    select.appendChild(divInput)
*/
    optionsToDisplay.forEach((option) => {
      const optionDOM = document.createElement("option");
      optionDOM.setAttribute('class',className);
      optionDOM.setAttribute("value", option);
      optionDOM.textContent = option;
      select.appendChild(optionDOM);
    });
  }

  function displayAllSelect() {
    displayOptionForType(ingredientsArray, "ingredientsSelect", 'Ingredient',"ingredientsOptions_searchBox","ingredientsOptions_search");
    displayOptionForType(appareilsArray, "appareilsSelect", 'Appareil',"appareilsOptions_searchBox","appareilsOptions_search");
    displayOptionForType(ustensilsArray, "ustensilesSelect", 'Ustensile',"ustensilesOptions_searchBox","ustensilesOptions_search");
  } displayAllSelect();

  /**** RECIPES CARDS INTEGRATION ****/
  function displayRecipes(recipesList) {
    for (let i = 0; i < recipesList.length; i++) {
      templateRecipeCard(recipesList[i]);
    }
  } displayRecipes(recipes);

/*******************************/
/** FUNCTIONS OF DYNAMISATION **/
/*******************************/
  /**** SELECTION OF OPTION ****/
    const ingredientOption = document.getElementById("ingredientsSelect");
    const appareilOption = document.getElementById("appareilsSelect");
    const ustensilOption = document.getElementById("ustensilesSelect");
    function selectedItemsUpdate(selectId){
      selectId.addEventListener("change", () => {
        const optionSelected= {
          label: selectId.lastChild.className,
          value: selectId.value,
        };
        selectedItemsArray.push(optionSelected);
        displayTag();
        const test = searchByTags(recipes, selectedItemsArray);
        //
        //
        ingredientsArray = []
        getIngredientsData(test)
        displayAllSelect()
      });
    }
    function updateAllSelect() {
      selectedItemsUpdate(ingredientOption);
      selectedItemsUpdate(appareilOption);
      selectedItemsUpdate(ustensilOption);
    } updateAllSelect();
  /*****************************/

/***********************************************************************/ 
/*
let ustensilesList = document.getElementById('ustensilesList');
let ustensiles = document.querySelectorAll(".ustensile");

function itemSelection(itemsList, items){
  itemsList.addEventListener("click", () => {
    items.forEach((item) => {
      item.onclick = function() {
        console.log(this.className +' '+ this.value);
      }
    })  
  })
}
itemSelection(ustensilesList, ustensiles)

let ustensilesSearch = document.getElementById("ustensilesOptions_search");
ustensilesSearch.onkeyup = function(){
  let input = ustensilesSearch.value;
  if(input.length === 0 ){
    console.log(ustensilsArray)
    return ustensilsArray
  }
  else{
    console.log(input)
    let searchResult = ustensilsArray.filter((ustensilsArray) => ustensilsArray.includes(input))
    console.log(searchResult)
  }
}
*/