//set users
if (!localStorage.getItem("users")){
    localStorage.setItem("users", "[]");
    userLogging.createUser("mila", "123");
    userLogging.createUser("baba", "12345");
}

//set recipes and ingredients
if (!localStorage.getItem("recipes")){

    localStorage.setItem("recipes", "[]");
    let newRecipes = [];
    recipes.forEach(obj => {
        let recipe = recipeManager.createRecipe(obj["title"], obj["href"], obj["ingredients"], obj["thumbnail"]);
        newRecipes.push(recipe);
    });

    recipeManager.updateRecipes(newRecipes);

    localStorage.setItem("ingredients", "[]");
    let newIngredients = [];
    newRecipes.forEach(recipe => {
        newIngredients.push(...recipe.ingredientsArr);
    });

    recipeManager.updateIngredients(newIngredients);
}

//manage refresh when looged in
if(localStorage.getItem("loggedUser")){
    mainPage.style.display = "block";
    registerPage.style.display = "none";
    logInPage.style.display = "none";
    printTemplatePages();
} else {
    mainPage.style.display = "none";
    logInPage.style.display = "block";
    registerPage.style.display = "none";
}




