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
        recipesToDisplay.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            ingredientsArray.push(ingredient.ingredient);
          });
        });
        ingredientsArray = removeDuplicate(ingredientsArray);
      } getIngredientsData(recipes);
    /** Recuperation of appareils **/
      let appareilsArray = [];
      function getAppareilsData(recipesToDisplay) {
        recipesToDisplay.forEach((recipe) => {
          appareilsArray.push(recipe.appliance);
        });
        appareilsArray = removeDuplicate(appareilsArray);
      } getAppareilsData(recipes);
    /** Recuperation of USTENSILS **/
      let ustensilsArray = [];
      function getUstensilsData(recipesToDisplay) {
        recipesToDisplay.forEach((recipe) => {
          recipe.ustensils.forEach((ustensil) => {
            ustensilsArray.push(ustensil);
          });
        });
        ustensilsArray = removeDuplicate(ustensilsArray);
      } getUstensilsData(recipes);

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
        updateDom()
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

    /* UPDATE THE OPTION */
    const recipesFiltered = updateRecipesList(selectedItemsArray, textValue);
    ingredientsArray = []
    getIngredientsData(recipesFiltered)
    appareilsArray = []
    getAppareilsData(recipesFiltered)
    ustensilsArray = []
    getUstensilsData(recipesFiltered)
    displayAllSelect() 
    recipesSection.innerHTML = ''
    displayRecipes(recipesFiltered)  
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
/*
    let optionTitle = document.createElement("li");
    optionTitle.setAttribute('value', " ")
    optionTitle.setAttribute('selected', '')
    optionTitle.setAttribute('hidden', '')
    optionTitle.textContent = className
    select.appendChild(optionTitle)

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
      const optionDOM = document.createElement("li");
      optionDOM.setAttribute('class',className);
      optionDOM.setAttribute("value", option);
      optionDOM.textContent = option;
      select.appendChild(optionDOM);
    });
  }

  function displayAllSelect() {
  //  displayOptionForType(ingredientsArray, "ingredientsSelect", 'Ingredient',"ingredientsOptions_searchBox","ingredientsOptions_search");
  //  displayOptionForType(appareilsArray, "appareilsSelect", 'Appareil',"appareilsOptions_searchBox","appareilsOptions_search");
  //  displayOptionForType(ustensilsArray, "ustensilesSelect", 'Ustensile',"ustensilesOptions_searchBox","ustensilesOptions_search");
    displayOptionForType(ingredientsArray, "ingredientsList", 'Ingredient',"ingredientsOptions_searchBox","ingredientsOptions_search");
    displayOptionForType(appareilsArray, "appareilsList", 'Appareil',"appareilsOptions_searchBox","appareilsOptions_search");
    displayOptionForType(ustensilsArray, "ustensilesList", 'Ustensile',"ustensilesOptions_searchBox","ustensilesOptions_search")
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
    const ingredientOption = document.getElementById("ingredientsList");
    let ingredientsDisplayed = document.querySelectorAll('.Ingredient')
    const appareilOption = document.getElementById("appareilsList")
    let appareilsDisplayed = document.querySelectorAll('.Appareil')
    const ustensilOption = document.getElementById("ustensilesList");
    let ustensilsDisplayed = document.querySelectorAll('.Ustensile')
    /*
    function selectedItemsUpdate(selectId){
      selectId.addEventListener("click", () => {
        const optionSelected= {
          label: selectId.lastChild.className,
          value: selectId.value,
        };
        selectedItemsArray.push(optionSelected);
        updateDom()
      });
    }*/
        function itemSelection(optionsList){
          optionsList.forEach((option) => {
            option.addEventListener('click', () =>{
                const optionSelected= {
                  label: option.className ,
                  value: option.innerHTML,
                };
                selectedItemsArray.push(optionSelected);
                updateDom()
            })  
          })
        }
    function updateDom(){
      const textValue = document.getElementById("search_input").value;
      const recipesFiltered = updateRecipesList(selectedItemsArray, textValue);
      ingredientsArray = [];
      getIngredientsData(recipesFiltered);
      appareilsArray = [];
      getAppareilsData(recipesFiltered);
      ustensilsArray = [];
      getUstensilsData(recipesFiltered);
      displayTag();
      recipesSection.innerHTML = ''
      displayRecipes(recipesFiltered)
    }
    function updateAllSelect() {/*
      selectedItemsUpdate(ingredientOption);
      selectedItemsUpdate(appareilOption);
      selectedItemsUpdate(ustensilOption);*/
      itemSelection(ingredientOption.childNodes,ingredientsDisplayed)
      itemSelection(appareilOption.childNodes,appareilsDisplayed)
      itemSelection(ustensilOption.childNodes,ustensilsDisplayed)

    } updateAllSelect();
  /*****************************/

/***********************************************************************/ 

function optionListSearch(searchInput, optionArray){
  searchInput.onkeyup = function(){
    let input = searchInput.value;
    if(input.length === 0 ){
      console.log(optionArray)
      return optionArray
    }
    else{
      console.log(input)
      let searchResult = optionArray.filter((optionArray) => optionArray.includes(input))
      console.log(searchResult)
    }
  }
}
function allOptionListSearch(){
  let ingredientsSearch = document.getElementById("ingredientsOptions_search");
  optionListSearch(ingredientsSearch, ingredientsArray)
  let appareilsSearch = document.getElementById("appareilsOptions_search");
  optionListSearch(appareilsSearch, appareilsArray)
  let ustensilesSearch = document.getElementById("ustensilesOptions_search");
  optionListSearch(ustensilesSearch, ustensilsArray)
}allOptionListSearch()
