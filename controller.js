//pages---------------------------------------------
let logInPage = getbyId("login-page");
let registerPage = getbyId("register-page");
let mainPage = getbyId("main");
let allRecipesPage = document.getElementById("all-recipes-page");
let favouriteRecipesPage = document.getElementById("favourite-recipes-page");
let createRecipesPage = document.getElementById("create-recipe-page");
let myProfilePage = document.getElementById("my-profile-page");
let errorPage = document.getElementById("error-page");

//forms----------------------------------------------
let loginForm = getbyId("login-form");
let registerForm = getbyId("register-form");
let profileForm = getbyId("update-profile-form");
let createRecipeForm = getbyId("create-recipe-form");

//input fields--------------------------------------------
let loginUsernameField = getbyId("login-username");
let loginPasswordField = getbyId("login-password");
let registerUsernameField = getbyId("register-username");
let regPassword1Field = getbyId("register-password1");
let regPassword2Field = getbyId("register-password2");

let searchField = getbyId("search-recipes");
let recipeTitleField = getbyId("title");
let recipeIngredientsField = getbyId("ingredients");
let recipeLinkField = getbyId("link");
let recipeImageField = getbyId("image");

//buttons-------------------------------------------------
let loginButton = getbyId("login-button");
let logoutButton = getbyId("logout-button");
let registerButton = getbyId("register-button");
let goToRegisterButton = getbyId("registerPage-button");
let goToLoginButton = getbyId("loginPage-button");
let submitRecipeButton = getbyId("submit-recipe");

//information fields-----------------------------------------
let loginError = getbyId("login-error");
let registerError = getbyId("register-error");
let registerSuccess = getbyId("register-success");
let recipeSuccess = getbyId("recipe-message");
let profileUpdateSuccess = getbyId("profile-update-message");

//Handlebars--------------------------------------------------
Handlebars.registerHelper('isLiked', function (uuid) {
    return userActionManager.likesThisRecipe(uuid);
});

let recipeTemplateHTML = getbyId("recipe-template").innerHTML;
let selectTemplateHTML = getbyId("select-template").innerHTML;
let cookedTableHTML = getbyId("cookedRecipes-template").innerHTML;

let templateRecipe = Handlebars.compile(recipeTemplateHTML);
let templateSelect = Handlebars.compile(selectTemplateHTML);
let templateCookedTable = Handlebars.compile(cookedTableHTML);

//event listeners----------------------------------------------
window.addEventListener("hashchange", displayCurrentPage);
window.addEventListener("load", displayCurrentPage);

registerButton.addEventListener("click", function(e){
    e.preventDefault();
    let username = registerUsernameField.value.trim();
    let password1 = regPassword1Field.value.trim();
    let password2 = regPassword2Field.value.trim();
    if (username && password1 && password2) {
        if (!userLogging.existsUsername(username)){
            if (password1 === password2){
                userLogging.createUser(username, password2);
                registerError.style.display = "none";
                registerSuccess.style.display = "block";
                console.log("register succesful!");
                registerForm.reset();
            } else {
                registerError.innerText = "Passwords do not match";
                registerError.style.display = "block";
            }
        }
        else {
            registerSuccess.style.display = "none";
            registerError.innerText = "Username taken!";
            registerError.style.display = "block";
        }
    }
});

loginButton.addEventListener("click", function(e){
    e.preventDefault();
    let username = loginUsernameField.value.trim();
    let password = loginPasswordField.value.trim();
    if (username && password) {
        if (userLogging.validateUser(username, password)){
                userLogging.logUserByID(username+password);
                printTemplatePages();
                mainPage.style.display = "block";
                logInPage.style.display = "none";
                registerPage.style.display = "none";
                console.log("Logged in!");
                loginError.style.display = "none";
                loginForm.reset();
        }
        else {
            loginError.style.display = "block";
        }
    }
});

logoutButton.addEventListener("click", function(){
    userLogging.logOutUser();
    mainPage.style.display = "none";
    logInPage.style.display = "block";
    registerPage.style.display = "none";
    getbyId("profile-picture").src = "guest.png";
    console.log("Logged out!");
});

goToLoginButton.addEventListener("click", function(e) {
    e.preventDefault();
    loginError.style.display = "none";
    loginUsernameField.value = "";
    loginPasswordField.value = "";

    mainPage.style.display = "none";
    logInPage.style.display = "block";
    registerPage.style.display = "none";
});

goToRegisterButton.addEventListener("click", function(e) {
    e.preventDefault();
    registerSuccess.style.display = "none";
    registerError.style.display = "none";
    registerUsernameField.value = "";
    regPassword1Field.value = "";
    regPassword2Field.value = "";

    mainPage.style.display = "none";
    logInPage.style.display = "none";
    registerPage.style.display = "block";
});

profileForm.addEventListener("submit", updateProfile);

createRecipeForm.addEventListener("input", () => {
    let title = recipeTitleField.value.trim();
    let ingredients = recipeIngredientsField.value.trim();
    let link = recipeLinkField.value.trim();
    let photoURL = recipeImageField.value.trim();

    if (title && ingredients && link && photoURL) {
        submitRecipeButton.disabled = false;
    }
});

createRecipeForm.addEventListener("submit", addNewRecipe);

searchField.addEventListener("input", displayFilteredRecipes);

//functions--------------------------------------------------------
function displayCurrentPage () {
    let pageName = location.hash;

    switch(pageName) {
        case "#all-recipes-page" : {
            allRecipesPage.style.display = "block";
            favouriteRecipesPage.style.display = "none";
            createRecipesPage.style.display = "none";
            myProfilePage.style.display = "none";
            errorPage.style.display = "none";
            break;
        }
        case "#favourite-recipes-page" : {
            allRecipesPage.style.display = "none";
            favouriteRecipesPage.style.display = "block";
            createRecipesPage.style.display = "none";
            myProfilePage.style.display = "none";
            errorPage.style.display = "none";
            break;
        }
        case "#create-recipe-page" : {
            allRecipesPage.style.display = "none";
            favouriteRecipesPage.style.display = "none";
            createRecipesPage.style.display = "block";
            myProfilePage.style.display = "none";
            errorPage.style.display = "none";
            break;
        }
        case "#my-profile-page" : {
            allRecipesPage.style.display = "none";
            favouriteRecipesPage.style.display = "none";
            createRecipesPage.style.display = "none";
            myProfilePage.style.display = "block";
            errorPage.style.display = "none";
            // showProfilePage(user.cookedRecipesMap);
            break;
        }
        case "#create-recipes-page" : {
            allRecipesPage.style.display = "none";
            favouriteRecipesPage.style.display = "none";
            createRecipesPage.style.display = "none";
            myProfilePage.style.display = "none";
            errorPage.style.display = "none";
            break;
        }
        case "#error-page" : {
            allRecipesPage.style.display = "none";
            favouriteRecipesPage.style.display = "none";
            createRecipesPage.style.display = "none";
            myProfilePage.style.display = "none";
            errorPage.style.display = "block";
            break;
        }
        case "" : {
            allRecipesPage.style.display = "block";
            favouriteRecipesPage.style.display = "none";
            createRecipesPage.style.display = "none";
            myProfilePage.style.display = "none";
            errorPage.style.display = "none";
            break;
        }
        default : {
            allRecipesPage.style.display = "none";
            favouriteRecipesPage.style.display = "none";
            createRecipesPage.style.display = "none";
            myProfilePage.style.display = "none";
            errorPage.style.display = "block";
            break;
        }
    }
}

function printTemplatePages () {
    let user = userLogging.getLoggedUser();

    let ingredients = recipeManager.getAllIngredients();
    ingredients.sort((a, b) => a.localeCompare(b));

    let select = getbyId("select-container");
    select.innerHTML = templateSelect(ingredients);

    let container = getbyId("all-recipes-container");
    container.innerHTML = templateRecipe(recipeManager.getAllRecipes());

    let likedRecipes = recipeManager.getRecipes(user.likedRecipes)
    if (likedRecipes.length > 0) {
        favouriteRecipesPage.firstElementChild.innerHTML = templateRecipe(likedRecipes);
    } else {
        favouriteRecipesPage.firstElementChild.innerHTML = "<h3>You don't have any favourite recipes yet.</h3>";
    }

    getbyId("recipes-table").innerHTML = templateCookedTable(userActionManager.getTitleTimesCookedArr());
    getbyId("profile-picture").src = user.profilePictureURL;
}

function likeRecipe(recipeUUID) {
    console.log(recipeUUID);
    userActionManager.addToLikedRecipes(recipeUUID);

    printTemplatePages();
}

function unlikeRecipe (recipeUUID) {
    userActionManager.removeFromLikedRecipes(recipeUUID);
    printTemplatePages();
}

function cookRecipe (recipeUUID) {
    userActionManager.cookThisRecipe(recipeUUID);
    printTemplatePages();
}

function showUnlikeMessage(id) {
    let message = getbyId(id+"unlike");

    message.style.visibility = "visible";
    setTimeout(() => {
        message.style.visibility = "hidden";
    }, 1000);
}

function showLikeMessage(id) {
    let message = getbyId(id+"like");

    message.style.visibility = "visible";
    setTimeout(() => {
        message.style.visibility = "hidden";
    }, 1000);
}

function showCookMessage(id) {
    let message = getbyId(id+"cook");

    message.style.visibility = "visible";
    setTimeout(() => {
        message.style.visibility = "hidden";
    }, 1000);
}

function filterSelect () {
    let ingredient = getbyId("select-ingredient").value;
    if(ingredient) {
        let filteredRecipes = recipeManager.filterRecipesByIngredient(ingredient);
        // console.log(filteredRecipes);
        getbyId("all-recipes-container").innerHTML = templateRecipe(filteredRecipes);
    } else {
        printTemplatePages();
    }
}

function displayFilteredRecipes() {
    let text = searchField.value.trim();
    let container = getbyId("all-recipes-container");

    if(text) {
        let filtered = recipeManager.filterRecipesByName(text);
        container.innerHTML = templateRecipe(filtered);
    }
    else {
        container.innerHTML = templateRecipe(recipeManager.getAllRecipes());
    }
}

function addNewRecipe() {
    let title = recipeTitleField.value.trim();
    let ingredients = recipeIngredientsField.value.trim();
    let link = recipeLinkField.value.trim();
    let photoURL = recipeImageField.value.trim();

    let newRecipe = recipeManager.createRecipe(title, link, ingredients, photoURL);
    recipeManager.updateRecipes([newRecipe]);
    recipeManager.updateIngredients(newRecipe.ingredientsArr);
    getbyId("recipe-message").style.display = "block";
    printTemplatePages();

    createRecipeForm.reset();

    recipeSuccess.style.display = "block";
    setTimeout(() => {
        recipeSuccess.style.display = "none";
    }, 2500);
}

function updateProfile() {
    let newPhotoUrl = getbyId("new-picture").value.trim();
    userActionManager.changeProfilePicture(newPhotoUrl);
    printTemplatePages();

    profileForm.reset();

    profileUpdateSuccess.style.display = "block";
    setTimeout(() => {
        profileUpdateSuccess.style.display = "none";
    }, 2500);
}

//the end :)