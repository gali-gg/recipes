let userActionManager = (function () {
    class UserActionManager {
        addToLikedRecipes (recipeID) {
            let userObj = userLogging.getLoggedUser();
            //check if recipe is not already liked
            if (!this.likesThisRecipe(recipeID)) {
                userObj.likedRecipes.push(recipeID);
                userLogging.updateUser(userObj.userID, userObj);
            }
        }

        removeFromLikedRecipes (recipeID) {
            let userObj = userLogging.getLoggedUser();
            //check if recipe is liked
            if (this.likesThisRecipe(recipeID)) {
                let index = userObj.likedRecipes.findIndex(id => id === recipeID);
                userObj.likedRecipes.splice(index, 1);
                userLogging.updateUser(userObj.userID, userObj);
            }
        }

        likesThisRecipe (recipeID) {
            let userObj = userLogging.getLoggedUser();
            return userObj.likedRecipes.some(id => id === recipeID);
        }

        cookThisRecipe (recipeID) {
            let userObj = userLogging.getLoggedUser();

            let cookedMap = new Map (userObj.cookedRecipes);
            let timesCooked = 0;

            if (cookedMap.has(recipeID)) {
                timesCooked = cookedMap.get(recipeID);
            }
            cookedMap.set(recipeID, ++timesCooked);

            userObj.cookedRecipes = Array.from(cookedMap);
            userLogging.updateUser(userObj.userID, userObj);
        }

        getTitleTimesCookedArr () {
            let userObj = userLogging.getLoggedUser();
            let cookedArr = userObj.cookedRecipes;

            return cookedArr.map(element => {
                let obj = {};

                obj.title = recipeManager.getRecipeNameByID(element[0]);
                obj.timesCooked = element[1];

                return obj;
            });
        }

        changeProfilePicture (url) {
            let userObj = userLogging.getLoggedUser();
            userObj.profilePictureURL = url;

            userLogging.updateUser(userObj.userID, userObj);
        }
    }
    return new UserActionManager();
})();

