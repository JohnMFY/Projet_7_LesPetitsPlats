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

    let selectedIngredients = [];
    let selectedAppareils = [];
    let selectedUstensils = [];


    //onClick on option = selectedOption.push
    //onClick on the cross(deleteOption) = selectedOption.pull(array, XXXX)

  /************************/
 /*** TEMPLATE RECIPES ***/
/************************/
    function recipeCard() {
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
    recipeCard()
}

  /*******************************/
 /** FUNCTIONS OF DYNAMISATION **/
/*******************************/

    /**** SELECTION OF OPTION ****/

        const selectedOptionDiv = document.getElementById('selectedItems') //div for DOM insertion

        /** SELECTION OF INGREDIENT **/
        function selectedOptionIngredients(){
            let ingredientsOption = document.querySelectorAll('.ingredientsOption')
            ingredientsOption.forEach(ingredientOption =>{
                //console.log(ingredientOption);
                ingredientOption.addEventListener('click', () => {
                    console.log('ok ingredient option ' + ingredientOption.value)
                });
            })
        }selectedOptionIngredients()
        /** SELECTION OF APPAREILS **/
        function selectedOptionAppareils(){
            let appareilsOption = document.querySelectorAll('.appareilsOption')
            appareilsOption.forEach(appareilOption =>{
                //console.log(appareilOption);
                appareilOption.addEventListener('click', () => {
                    console.log('ok appareil option '+ appareilOption.value)
                });
            })
        }selectedOptionAppareils()
        /** SELECTION OF USTENSILS **/
        function selectedOptionUstensils(){
            let ustensilsOption = document.querySelectorAll('.ustensilsOption')
            ustensilsOption.forEach(ustensilOption =>{
                //console.log(appareilOption);
                ustensilOption.addEventListener('click', () => {
                    console.log('ok appareil option '+ ustensilOption.value)
                });
            })
        }selectedOptionUstensils()
    /*****************************/