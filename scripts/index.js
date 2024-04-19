/****************************************************************************/    
/******************* INTEGRATION OF RECIPES IN THE DOM *********************/
/**************************************************************************/

async function getRecipes() {
    const Data = await fetch('../data/recipes.js');
    const DataJson = await Data.json();
    return DataJson  
}