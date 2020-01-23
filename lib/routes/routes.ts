import { Request, Response, Application } from 'express';
import { UserController } from '../controllers/user.controller'

export class Routes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'Get request successful'
      })
    })

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