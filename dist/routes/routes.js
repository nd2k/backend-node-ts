"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        app.route('/').get((req, res) => {
            res.status(200).send({
                message: 'Get request successful'
            });
        });
        //Create a user
        app.route('/user').post(this.userController.addNewUser);
        // Get all users
        app.route('/user').get(this.userController.getUsers);
        // Get a user
        app.route('/user/:userId').get(this.userController.getUser);
        // // Update a user
        app.route('/user/:userId').put(this.userController.updateUser);
        // // Delete a user
        app.route('/user/:userId').delete(this.userController.deleteUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map