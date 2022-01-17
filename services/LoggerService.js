//this is my fancy singleton for all the logging and unlogging :P
let userLogging = (function () {
    class User {
        constructor(username, password, likedRecipes = [], cookedRecipes = [], profilePictureURL = "guest.png" ) {
            this.userID = username + password;
            this.username = username;
            this.password = password;
            this.likedRecipes = likedRecipes;
            this.cookedRecipes = cookedRecipes;
            this.profilePictureURL = profilePictureURL;
        }
    }

    class LoggingManager {
        getAllUsers () {
            return JSON.parse(localStorage.getItem("users"));
        }

        createUser (username, password){
            let users = this.getAllUsers();
            let user = new User (username.trim(), password.trim());
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
        }

        validateUser (username, password) {
            let users = this.getAllUsers();
            let userID = username.trim() + password.trim();
            return users.some(user => user.userID === userID);
        }

        existsUsername(username) {
            let users = this.getAllUsers();
            return users.some(user => user.username === username.trim());
        }

        getLoggedUser() {
            let userID = localStorage.getItem("loggedUser");
            let users = this.getAllUsers();
            return users.find(user => user.userID === userID.trim());
        }

        logUserByID (userID) {
            localStorage.setItem("loggedUser", userID);
            return this.getLoggedUser();
        }

        logOutUser () {
            localStorage.removeItem("loggedUser");
        }

        updateUser (userID, userObj) {
            let users = this.getAllUsers();
            let index = users.findIndex(user => user.userID === userID);

            if (index > -1) {
                users.splice(index, 1, userObj);
                localStorage.setItem("users", JSON.stringify(users));
            }
        }
    }

    return new LoggingManager();

})();
