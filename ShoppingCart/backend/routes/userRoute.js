import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {

    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser)
      }, 200)
  
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password.' });
    }
  
  })

  router.post('/signin-google-user', async (req, res) => {

    const signinUser = await User.findOne({
      email: req.body.email
    });
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser)
      }, 200)
  
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password.' });
    }
  
  })

  router.get('/check-by-email', async (req, res) => {
    const user = await User.findOne({email: req.query.email});
    if (user) {
      res.send({user: true}, 200)
    } else {
      res.send({user: false}, 404)
    }
  })

  router.post('/register-google-user', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const newUser = await user.save();

    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      }, 200)
    } else {
      res.status(401).send({ msg: 'Invalid User Data.' });
    }
  
  })
  
  router.post('/register', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      }, 200)
    } else {
      res.status(401).send({ msg: 'Invalid User Data.' });
    }
  
  })

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: 'Ruvinda',
      email: 'ruvinda3@gmail.com',
      password: '1234',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router; 