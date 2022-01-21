let recipeManager = (function () {
    class Recipe {
        constructor(title, urlAddress, ingredients, photo, uuid = uuidv4()) {
            this.uuid = uuid;
            this.title = title;
            this.urlAddress =  urlAddress;
            this.ingredients = ingredients;
            this.photo = "https://images.weserv.nl/?url=" + photo;
            this.ingredientsArr = ingredients.split(",").map(element => element.trim());
        }
    }

    class RecipesManager {

        getAllRecipes () {
            return JSON.parse(localStorage.getItem("recipes"));
        }

        getAllIngredients () {
            return JSON.parse(localStorage.getItem("ingredients"));
        }

        updateIngredients (ingredients) {
            let allIngredients = this.getAllIngredients();
            ingredients.forEach(ingredient => {
                if (!allIngredients.includes(ingredient)){
                    allIngredients.push(ingredient);
                }
            });
            this.setLocalStorage("ingredients", allIngredients);
        }

        updateRecipes (recipes) {
            let allRecipes = this.getAllRecipes();
            let newRecipes = [...recipes, ...allRecipes];
            this.setLocalStorage("recipes", newRecipes);
        }

        setLocalStorage (key, arr) {
            localStorage.setItem(key, JSON.stringify(arr));
        }

        filterRecipesByName (text) {
            let allrecipes = this.getAllRecipes();
            text = text.toLowerCase().trim();
            if(text) {
                let filtered = allrecipes.filter(recipe => recipe.title.toLowerCase().includes(text));
                return filtered;
            }
        }

        filterRecipesByIngredient (ingredient) {
            let allrecipes = this.getAllRecipes();
            let filtered = allrecipes.filter(recipe => recipe.ingredients.includes(ingredient));
            return filtered;
        }

        createRecipe (title, urlAddress, ingredients, photoURL) {
            let recipe = new Recipe(title, urlAddress, ingredients, photoURL);
            return recipe;
        }

        getRecipeNameByID (recipeID) {
            let allrecipes = this.getAllRecipes();
            if (allrecipes.some(recipe => recipe.uuid === recipeID)){
                let recipe = allrecipes.find(recipe => recipe.uuid === recipeID);

                return recipe.title;
            }
        }

        getRecipes (recipeIDsArr) {
            let allrecipes = this.getAllRecipes();
            return recipeIDsArr.map(recipeID => allrecipes.find(recipe => recipe.uuid === recipeID));
        }
    }
    return new RecipesManager();
})();




