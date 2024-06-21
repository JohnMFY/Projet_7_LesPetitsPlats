/***********************/    
/**** DATA STORAGE ****/
/*********************/

/** RECUPERATION DATA **/
    import { recipes } from "../data/recipes.js";
    let i = 0;
/****** STORAGE &  ERADICATION OF DUPLICATE ******/
// Créer une table liste recette actualisé en fonction des options par exclusion des recettes qui n'ont pas les options demandé
// dans un 1er temps let recipesUpdated = recipes puis faire un sorting par exclusion avec condition IF
    /** Recuperation of ingredients **/
        let ingredientsArrayTotal = [];
        let ingredientsArray = [];
        function getIngredientsData(){//à modifier partir d'une list de recette
            recipes.forEach((recipe) => {
                recipe.ingredients.forEach((ingredient) => {
                    ingredientsArrayTotal.push(ingredient.ingredient)
                }) 
            })
        }getIngredientsData()

    /** Recuperation of appareils **/
        let appareilsArrayTotal = [];
        let appareilsArray = [];
        function getAppareilsData(){
            recipes.forEach((recipe) => {
                appareilsArrayTotal.push(recipe.appliance)
            }) 
        }getAppareilsData()

    /** Recuperation of USTENSILS **/
        let ustensilsArrayTotal = [];
        let ustensilsArray = []
        function getUstensilsData(){
            recipes.forEach((recipe) => {
                recipe.ustensils.forEach((ustensil) => {
                    ustensilsArrayTotal.push(ustensil)
                });   
            }); 
        }getUstensilsData()

    /** Remove duplicate **/    
        let ingredientsArrayLowercase = ingredientsArrayTotal.map( ingredient => ingredient.toLowerCase())
        ingredientsArray = ([...new Set(ingredientsArrayLowercase)]);

        let appareilsArrayLowercase = appareilsArrayTotal.map( appareil => appareil.toLowerCase())
        appareilsArray = ([...new Set(appareilsArrayLowercase)]);

        let ustensilsArrayLowercase = ustensilsArrayTotal.map( ustensil => ustensil.toLowerCase())
        ustensilsArray = ([...new Set(ustensilsArrayLowercase)]); 
        
/*******************************************************/ 


/** STORAGE OF SELECTED DATA **/

    let selectedItemsArray = [];
    let selectedItemsArrayValue = [];
    let optionIngredientsUpdate = ingredientsArray;
    let optionAppareilsUpdate = appareilsArray;
    let optionUstensilsUpdate = ustensilsArray;
/************************************************/    
/******************* TEMPLATES *****************/
/**********************************************/

    /************************/
    /*** TEMPLATE RECIPES ***/
    /************************/
        function templateRecipeCard(){
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
        function tamplateTag(i){
            const divSelectedItems = document.getElementById('selectedItems')

            const divSelectedItem = document.createElement('div')
            divSelectedItem.setAttribute('class', 'selectedItemDisplay')

            let selectedItem = document.createElement('p')
            selectedItem.setAttribute('class',selectedItemsArray[i].label)
            selectedItem.textContent = selectedItemsArray[i].value

            const deleteIcon = document.createElement('i')
            deleteIcon.setAttribute('class', 'fa-solid fa-xmark fa-lg deleteTag')
        
                deleteIcon.addEventListener('click', () => { 
                    if(selectedItemsArray[i].label === "ingredient"){
                        optionIngredientsUpdate.push(selectedItemsArray[i].value)
                    }if(selectedItemsArray[i].label === "appareil"){
                        optionAppareilsUpdate.push(selectedItemsArray[i].value)
                    }if(selectedItemsArray[i].label === "ustensil"){
                        optionUstensilsUpdate.push(selectedItemsArray[i].value)
                    }
                    selectedItemsArrayValue = selectedItemsArrayValue.filter(num => !selectedItemsArrayValue.includes(num))
                    selectedItemsArray.splice(i,1)
                    displayTag()       
                })

            divSelectedItems.appendChild(divSelectedItem)
            divSelectedItem.appendChild(selectedItem)
            divSelectedItem.appendChild(deleteIcon)
        }
       
/****************************************************************************/    
/******************* INTEGRATION OF RECIPES IN THE DOM *********************/
/**************************************************************************/

/**** SELECTED TAG INTEGRATION ****/
    function displayTag(){
        const selectedItems = document.getElementById('selectedItems');
        selectedItems.innerHTML = '';
        for( i = 0 ; i < selectedItemsArray.length; i++){    
            tamplateTag(i);
            selectedItemsArrayValue.push(selectedItemsArray[i].value)
            selectedItemsArrayValue = ([...new Set(selectedItemsArrayValue)]);
        }
            optionIngredientsUpdate = ingredientsArray.filter(num => !selectedItemsArrayValue.includes(num))
            optionAppareilsUpdate = appareilsArray.filter(num => !selectedItemsArrayValue.includes(num))
            optionUstensilsUpdate = ustensilsArray.filter(num => !selectedItemsArrayValue.includes(num))
    }  

/**** INGREDIENTS OPTION INTEGRATION ****/
    function displayOptionIngredients(){
        let ingredientsSelect = document.getElementById('ingredientsSelect')
        for( i = 0 ; i < optionIngredientsUpdate.length; i++){
            const optionIngredient = document.createElement('option');
            optionIngredient.setAttribute('value', optionIngredientsUpdate[i]);
            optionIngredient.setAttribute('class', 'ingredientsOption')
            optionIngredient.textContent = optionIngredientsUpdate[i];
            ingredientsSelect.appendChild(optionIngredient)
        }
        displayTag()
    }displayOptionIngredients()

/**** APPAREILS OPTION INTEGRATION ****/
    function displayOptionAppareils(){
        let appareilsSelect = document.getElementById('appareilsSelect')
        for( i = 0 ; i < optionAppareilsUpdate.length; i++){
            const optionAppareil = document.createElement('option');
            optionAppareil.setAttribute('value', optionAppareilsUpdate[i]);
            optionAppareil.setAttribute('class', 'appareilsOption')
            optionAppareil.textContent = optionAppareilsUpdate[i];
            appareilsSelect.appendChild(optionAppareil)
        }
    }displayOptionAppareils()

/**** USTENSILES OPTION INTEGRATION ****/
    function displayOptionUstensils(){
        let ustensilesSelect = document.getElementById('ustensilesSelect')
        for( i = 0 ; i < optionUstensilsUpdate.length; i++){
            const optionUstensil = document.createElement('option');
            optionUstensil.setAttribute('value', optionUstensilsUpdate[i]);
            optionUstensil.setAttribute('class', 'ustensilsOption')
            optionUstensil.textContent = optionUstensilsUpdate[i];
            ustensilesSelect.appendChild(optionUstensil)
        }
    }displayOptionUstensils()

/**** RECIPES CARDS INTEGRATION ****/
    function displayRecipes(){
        for(i = 0; i < recipes.length; i++){
            templateRecipeCard()
        }
    }displayRecipes()


  /*******************************/
 /** FUNCTIONS OF DYNAMISATION **/
/*******************************/
        
    /**** SELECTION OF OPTION ****/

        /** SELECTION OF INGREDIENT **/
            function selectedIngredientsUpdate(){
                const ingredientOption = document.getElementById('ingredientsSelect') 
                ingredientOption.addEventListener('change', () => {
                    const ingredientSelected = {
                        label: "ingredient",
                        value: ingredientOption.value 
                    }
                    selectedItemsArray.push(ingredientSelected);
                    displayTag() 
                });
            }selectedIngredientsUpdate()

        /** SELECTION OF APPAREILS **/
            function selectedAppareilsUpdate(){
                const appareilOption = document.getElementById('appareilsSelect')
                appareilOption.addEventListener('change', () => {
                    const appareilSelected = {
                        label: "appareil",
                        value: appareilOption.value 
                    }
                    selectedItemsArray.push(appareilSelected);
                    displayTag()
                });
            }selectedAppareilsUpdate()

        /** SELECTION OF USTENSILS **/
            function selectedUstensilsUpdate(){
                const ustensilOption = document.getElementById('ustensilesSelect')
                ustensilOption.addEventListener('change', () => {
                    const ustensilSelected = {
                        label: "ustensil",
                        value: ustensilOption.value 
                    }
                    selectedItemsArray.push(ustensilSelected)
                    displayTag()
                });
            }selectedUstensilsUpdate()

    /*****************************/

    let test = document.getElementById('search_icon')
    test.addEventListener('click', () => {
        console.log(optionIngredientsUpdate)
        console.log(optionAppareilsUpdate)
        console.log(optionUstensilsUpdate)
        console.log(selectedItemsArray)
        console.log(selectedItemsArrayValue)
    }) 
