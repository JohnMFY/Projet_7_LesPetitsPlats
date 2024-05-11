/***********************/    
/**** DATA STORAGE ****/
/*********************/

/** RECUPERATION DATA **/
    import { recipes } from "../data/recipes.js";

/****** STORAGE &  ERADICATION OF DUPLICATE ******/
    /** Recuperation of ingredients and eradication of duplicate **/
        let ingredientsArrayTotal = [];
            recipes.forEach((recipe) => {
                recipe.ingredients.forEach((ingredient) => {
                    ingredientsArrayTotal.push(ingredient.ingredient)
                }) 
            })
            ingredientsArrayTotal = ingredientsArrayTotal.map(function (e) { // put all in lower case to avoid duplicate due to ortographe
                return e.toLowerCase()
            });
        let ingredientsArray = ingredientsArrayTotal.filter((item, index, array)=>{
            return array.indexOf(item) === index;
        });
    /** Recuperation of appareils and eradication of duplicate **/
        let appareilArrayTotal = []
            recipes.forEach((recipe) => {
                appareilArrayTotal.push(recipe.appliance)
            }) 
            appareilArrayTotal = appareilArrayTotal.map(function (e) { 
                return e.toLowerCase()
            });
        let appareilArray = appareilArrayTotal.filter((item, index, array)=>{
            return array.indexOf(item) === index;
        }); 

    /** Recuperation of USTENSILS and eradication of duplicate **/
        let ustensilsArrayTotal = [];
            recipes.forEach((recipe) => {
                recipe.ustensils.forEach((ustensil) => {
                    ustensilsArrayTotal.push(ustensil)
                });   
            }); 
            ustensilsArrayTotal = ustensilsArrayTotal.map(function (e) {    
                return e.toLowerCase()
            });
        let ustensilsArray = ustensilsArrayTotal.filter((item, index, array)=>{
            return array.indexOf(item) === index;
        });
/*******************************************************/ 


/** STORAGE OF SELECTED DATA **/

    let selectedItemsArray = [];


/************************************************/    
/******************* TEMPLATES *****************/
/**********************************************/

    /************************/
    /*** TEMPLATE RECIPES ***/
    /************************/
        function displayRecipeCard(){
            const recipePicture = `assets/recipes/${recipes[i].image}`;
            const recipesSection = document.getElementById('recipesSection');
            const article = document.createElement( 'article' );
            article.setAttribute('class', 'recipes_card');

            const img = document.createElement('img');
            img.setAttribute('src', recipePicture);
            img.setAttribute('class', 'recipePicture');

            const time = document.createElement('p')
            time.setAttribute('class', 'time')
            time.textContent = recipes[i].time +'min'

            const h4 = document.createElement('h4');
            h4.textContent = recipes[i].name;

            const h5Recette = document.createElement('h5');
            h5Recette.textContent = 'RECETTE';

            const p = document.createElement('p');
            p.setAttribute('class','recipeDescription')
            p.textContent = recipes[i].description;

            const h5Ingredients = document.createElement('h5');
            h5Ingredients.textContent = 'INGREDIENTS';

            const divIngredients = document.createElement('div');
            divIngredients.setAttribute('class', 'ingredients');
            
            //boucle for ingredients//
                let recipeIngredients = recipes[i].ingredients;

                recipeIngredients.forEach((ingredients) =>{
                    const divIngredient = document.createElement('div');
                    divIngredient.setAttribute('class', 'ingredient');

                    let ingredient = document.createElement('p');
                    ingredient.textContent = ingredients.ingredient;

                    const divQtyUnit = document.createElement('div');
                    divQtyUnit.setAttribute('class', 'quantityAndUnit')
                    let quantity = document.createElement('p');
                    quantity.textContent = ingredients.quantity;
                    let unit = document.createElement('p');
                    unit.textContent = ingredients.unit;

                    divIngredient.appendChild(ingredient);
                    divIngredient.appendChild(divQtyUnit);
                    divQtyUnit.appendChild(quantity);
                    divQtyUnit.appendChild(unit);
                    divIngredients.appendChild(divIngredient);
                })
            //
            article.appendChild(img);
            article.appendChild(time)
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
        function displaySelectedTag(){
            const divSelectedItems = document.getElementById('selectedItems')

            const divSelectedItem = document.createElement('div')
            divSelectedItem.setAttribute('class', 'selectedItemDisplay')
                
            let selectedItem = document.createElement('p')
            selectedItem.setAttribute('class','itemValue')
            selectedItem.textContent = selectedItemsArray[i].value

            const deleteIcon = document.createElement('i')
            deleteIcon.setAttribute('class', 'fa-solid fa-xmark deleteTag')

            divSelectedItems.appendChild(divSelectedItem)
            divSelectedItem.appendChild(selectedItem)
            divSelectedItem.appendChild(deleteIcon)
        }

/****************************************************************************/    
/******************* INTEGRATION OF RECIPES IN THE DOM *********************/
/**************************************************************************/

/**** INGREDIENTS OPTION INTEGRATION ****/
    let ingredientsSelect = document.getElementById('ingredientsSelect')
    let i;
    for( i = 0 ; i < ingredientsArray.length; i++){
        const optionIngredient = document.createElement('option');
        optionIngredient.setAttribute('value', ingredientsArray[i]);
        optionIngredient.setAttribute('class', 'ingredientsOption')
        optionIngredient.textContent = ingredientsArray[i];
        ingredientsSelect.appendChild(optionIngredient)
    }
/**** APPAREILS OPTION INTEGRATION ****/
    let appareilsSelect = document.getElementById('appareilsSelect')
    for( i = 0 ; i < appareilArray.length; i++){
        const optionAppareil = document.createElement('option');
        optionAppareil.setAttribute('value', appareilArray[i]);
        optionAppareil.setAttribute('class', 'appareilsOption')
        optionAppareil.textContent = appareilArray[i];
        appareilsSelect.appendChild(optionAppareil)
    }

/**** USTENSILES OPTION INTEGRATION ****/
    let ustensilesSelect = document.getElementById('ustensilesSelect')
    for( i = 0 ; i < ustensilsArray.length; i++){
        const optionUstensil = document.createElement('option');
        optionUstensil.setAttribute('value', ustensilsArray[i]);
        optionUstensil.setAttribute('class', 'ustensilsOption')
        optionUstensil.textContent = ustensilsArray[i];
        ustensilesSelect.appendChild(optionUstensil)
    }

/**** RECIPES CARDS INTEGRATION ****/
    for(i = 0; i < recipes.length; i++){
        displayRecipeCard()
    }

/**** SELECTED TAG INTEGRATION ****/
    function tagInDom(){
        const selectedItems = document.getElementById('selectedItems');
        selectedItems.innerHTML = '';
        console.log(selectedItemsArray);

        for( i = 0 ; i < selectedItemsArray.length; i++){
            
            displaySelectedTag()
        }
    }
/**** SELECTED TAG SUPPRESSION ****/ 
/*
    function removeTag(){
        let deleteBtn = document.querySelectorAll('.deleteTag')
        deleteBtn.addEventListener('click', () => {
            console.log('ok btn delete')
        })
    }
*/
  /*******************************/
 /** FUNCTIONS OF DYNAMISATION **/
/*******************************/

    /**** SELECTION OF OPTION ****/

        /** SELECTION OF INGREDIENT **/
            function selectedOptionIngredients(){
                const ingredientOption = document.getElementById('ingredientsSelect') 
                ingredientOption.addEventListener('change', () => {
                    const ingredientOptionSelected = {
                        label: "ingredient",
                        value: ingredientOption.value 
                    }
                    selectedItemsArray.push(ingredientOptionSelected);
                    tagInDom()       
                });
            }selectedOptionIngredients()

        /** SELECTION OF APPAREILS **/
            function selectedOptionAppareils(){
                const appareilOption = document.getElementById('appareilsSelect')
                appareilOption.addEventListener('change', () => {
                    const appareilOptionSelected = {
                        label: "appareil",
                        value: appareilOption.value 
                    }
                    selectedItemsArray.push(appareilOptionSelected);
                    tagInDom()
                });
            }selectedOptionAppareils()

        /** SELECTION OF USTENSILS **/
            function selectedOptionUstensils(){
                const ustensilOption = document.getElementById('ustensilesSelect')
                ustensilOption.addEventListener('change', () => {
                    const ustensilOptionSelected = {
                        label: "ustensil",
                        value: ustensilOption.value 
                    }
                    selectedItemsArray.push(ustensilOptionSelected)
                    tagInDom()
                });
            }selectedOptionUstensils()

    /*****************************/