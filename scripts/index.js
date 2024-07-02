/***********************/
/**** DATA STORAGE ****/
/*********************/

/** RECUPERATION DATA **/
import { recipes } from "../data/recipes.js";
/****** STORAGE &  ERADICATION OF DUPLICATE ******/
// Créer une table liste recette actualisé en fonction des options par exclusion des recettes qui n'ont pas les options demandé
// dans un 1er temps let recipesUpdated = recipes puis faire un sorting par exclusion avec condition IF
/** Recuperation of ingredients **/
/** Remove duplicate **/
function removeDuplicate(arrayTotal) {
  let arrayToLowercase = arrayTotal.map((item) => item.toLowerCase());
  return [...new Set(arrayToLowercase)];
}

let ingredientsArray = [];
function getIngredientsData() {
  //à modifier partir d'une list de recette
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsArray.push(ingredient.ingredient);
    });
  });

  ingredientsArray = removeDuplicate(ingredientsArray);
}
getIngredientsData();

/** Recuperation of appareils **/
let appareilsArray = [];
function getAppareilsData() {
  recipes.forEach((recipe) => {
    appareilsArray.push(recipe.appliance);
  });

  appareilsArray = removeDuplicate(appareilsArray);
}
getAppareilsData();

/** Recuperation of USTENSILS **/
let ustensilsArray = [];
function getUstensilsData() {
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensilsArray.push(ustensil);
    });
  });
  ustensilsArray = removeDuplicate(ustensilsArray);
}
getUstensilsData();
/*******************************************************/

/** STORAGE OF SELECTED DATA **/

let selectedItemsArray = [];
let selectedItemsArrayValue = [];
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
  console.log(selectedTag);
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
    displayTag();
  });

  divSelectedItems.appendChild(divSelectedItem);
  divSelectedItem.appendChild(selectedItem);
  divSelectedItem.appendChild(deleteIcon);

  displayAllSelect();
}

function updateRecipesList(selectedTags, textSearch) {
  let filteredRecipes = [];

  recipes.forEach((recipe) => {
    let isCorrect = true;
    if (true === true) {
      // ingredients
      isCorrect = false;
    }
    if (true === true) {
      // appliances
      isCorrect = false;
    }
    if (true === true) {
      // ustensils
    }

    if (isCorrect === true) {
      filteredRecipes.push(recipe);
    }
  });

  // displayRecipes(filteredRecipes);
}

/****************************************************************************/
/******************* INTEGRATION OF RECIPES IN THE DOM *********************/
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
function displayOptionForType(array, selectId, className) {
  const optionsToDisplay = getOnlyTagsNotDisplayed(array);
  let select = document.getElementById(selectId);
  select.innerHTML = "";
  optionsToDisplay.forEach((option) => {
    const optionDOM = document.createElement("option");
    optionDOM.setAttribute('class',className);
    optionDOM.setAttribute("value", option);
    optionDOM.textContent = option;
    select.appendChild(optionDOM);
  });
}

function displayAllSelect() {
  displayOptionForType(ingredientsArray, "ingredientsSelect", 'ingredient');
  displayOptionForType(appareilsArray, "appareilsSelect", 'appareil');
  displayOptionForType(ustensilsArray, "ustensilesSelect", 'ustensile');
}
displayAllSelect();

/**** RECIPES CARDS INTEGRATION ****/
function displayRecipes(recipesList) {
  for (let i = 0; i < recipesList.length; i++) {
    templateRecipeCard(recipesList[i]);
  }
}
displayRecipes(recipes);

/*******************************/
/** FUNCTIONS OF DYNAMISATION **/
/*******************************/

/**** SELECTION OF OPTION ****/

/** SELECTION OF INGREDIENT **//*
function selectedIngredientsUpdate() {
  const ingredientOption = document.getElementById("ingredientsSelect");
  ingredientOption.addEventListener("change", () => {
    console.log(ingredientOption);
    const ingredientSelected = {
      label: "ingredient",
      value: ingredientOption.value,
    };
    console.log(ingredientOption.id)
    selectedItemsArray.push(ingredientSelected);
    displayTag();
  });
}
selectedIngredientsUpdate();

/** SELECTION OF APPAREILS **//*
function selectedAppareilsUpdate() {
  const appareilOption = document.getElementById("appareilsSelect");
  appareilOption.addEventListener("change", () => {
    const appareilSelected = {
      label: "appareil",
      value: appareilOption.value,
    };
    selectedItemsArray.push(appareilSelected);
    displayTag();
  });
}
selectedAppareilsUpdate();

/** SELECTION OF USTENSILS **//*
function selectedUstensilsUpdate() {
  const ustensilOption = document.getElementById("ustensilesSelect");
  ustensilOption.addEventListener("change", () => {
    const ustensilSelected = {
      label: "ustensil",
      value: ustensilOption.value,
    };
    selectedItemsArray.push(ustensilSelected);
    displayTag();
  });
}
selectedUstensilsUpdate();
  /** SELECTION OF INGREDIENT REFACTO 1 **/

  const ingredientOption = document.getElementById("ingredientsSelect");
  const appareilOption = document.getElementById("appareilsSelect");
  const ustensilOption = document.getElementById("ustensilesSelect");
/*
  function selectedItemsUpdate(selectId){
    selectId.addEventListener("change", () => {
      console.log(selectId.lastChild.className)
      if(selectId.id === "ingredientsSelect"){
        const ingredientSelected = {
          label: "ingredient",
          value: ingredientOption.value,
        };
        selectedItemsArray.push(ingredientSelected);
      }
      if(selectId.id === "appareilsSelect"){
        const appareilSelected = {
          label: "appareil",
          value: appareilOption.value,
        };
        selectedItemsArray.push(appareilSelected);
      }
      if(selectId.id === "ustensilesSelect"){
        const ustensilSelected = {
          label: "ustensil",
          value: ustensilOption.value,
        };
        selectedItemsArray.push(ustensilSelected);
      }
      displayTag();
    });
  }
  */
  function selectedItemsUpdate2(selectId){
    selectId.addEventListener("change", () => {
      const optionSelected= {
        label: selectId.lastChild.className,
        value: ingredientOption.value,
      };
      selectedItemsArray.push(optionSelected);
      displayTag();
    });
  }

  function updateAllSelect() {
    selectedItemsUpdate2(ingredientOption);
    selectedItemsUpdate2(appareilOption);
    selectedItemsUpdate2(ustensilOption);
  }
  updateAllSelect();
/*****************************/


let test = document.getElementById("search_icon");
test.addEventListener("click", () => {
  console.log(selectedItemsArray);
  console.log(selectedItemsArrayValue);
});