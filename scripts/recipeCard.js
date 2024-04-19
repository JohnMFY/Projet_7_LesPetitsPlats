/**************************************************************************/
/************************ TEMPLATE RECIPES *******************************/
/************************************************************************/

function recipeTemplate(data) {
    const {id, image, name, servings, ingredients, time, description, appliance, ustensils} = data;

    function getRecipeCard() {

        const article = document.createElement( 'article' );
        article.setAttribute('class', 'recipes_card');

        const img = document.createElement('img');
        img.setAttribute('src', image);

        const h4 = document.createElement('h4');
        h4.textContent = name;

        const h5Recette = document.createElement('h5');
        h5Recette.textContent = 'RECETTE';

        const p = document.createElement('p');
        p.textContent = description;

        const h5Ingredients = document.createElement('h5');
        h5Ingredients.textContent = 'INGREDIENTS';

        const divIngredients = document.createElement('div')
        divIngredients.setAttribute('class', 'ingredients')

        return (article);
        

    }
    return {getRecipeCard}
}