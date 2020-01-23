import User from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';


export class UserController {
  
  public addNewUser (req: Request, res: Response) {
    const { lastName, firstName, email, password, password2, imageUrl } = req.body;
    let newUser = new User({ lastName, firstName, email, password, imageUrl });

    let errors = [];

    // Check required fields
    if (!firstName || !lastName || !email || !password || !password2) {
      errors.push({ message: 'Please, fill in all mandatory fields'});
      res.send(errors);
    }

    if (password !== password2) {
      errors.push({ message: 'Passwords do not match' });
      res.send(errors);
    }

    if (password.length < 4) {
      errors.push({ message: 'Password must be at least 4 charaters' });
      res.send(errors);
    }

    else {
      // Validation passes
      // Check for existing user
      User.find({ email: email }).then((user: any) => {
        if (user) {
          errors.push({ message: `User's email already exists`});
          // res.send(errors);
          res.send(user)
        } else {
          bcrypt.genSalt(10, (err: any, salt: any) => {
            bcrypt.hash(newUser.password, salt, (error: any, hash
              : any) => {
              if (error) throw error;
              newUser.password = hash;
              newUser.save((error: any, user: any) => {
                if (error) {
                  res.send(error);
                } else {
                  res.json(user);
                }
              });
            })
          })
        }
      })
    }
  }

  public getUsers (req: Request, res: Response) {
    User.find({}, (error: any, user: any) => {
      if(error) {
        res.send(error);
      } else {
        res.json(user);
      }
    });
  }

  public getUser (req: Request, res: Response) {
    User.findById(req.params.userId, (error: any, user: any) => {
      if (error) {
        res.send(error);
      } else {
        res.json(user);
      }
    });
  }

  public updateUser (req: Request, res: Response) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (error: any, user: any) => {
      if (error) {
        res.send(error);
      } else {
        res.json(user);
      }
    });
  }

  public deleteUser (req: Request, res: Response) {
    User.remove({ _id: req.params.userId }, (error: any, user: any) => {
      if (error) {
        res.send(error);
      } else {
        res.json({
          message: 'User is successfully deleted'
        });
      }
    });
  }
}