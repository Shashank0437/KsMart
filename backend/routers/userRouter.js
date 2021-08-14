import express from 'express';
const bcrypt=require('bcrypt');
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken ,isAuth} from '../utils.js';

const router = new express.Router;
router.get("/createadmin", expressAsyncHandler(async (req, res) => {
  try {
    const user = new User({
      name: 'Kumar Shashank',
      email: 'kshashank23012000@gmail.com',
      phone: 8210218664,
      password: 'KsMart',
      repassword: 'KsMart',
      isAdmin: true,
    });
    const createdUser = await user.save();
    res.send(createdUser);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}));

router.post('/signin', expressAsyncHandler(async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email
  });
  const isMatch = await bcrypt.compare(req.body.password, signinUser.password);

 
    if (!signinUser || !isMatch) {
      res.status(401).send({
        message: 'Invalid Email or Password. Please Retry !!'
      });
    } else {
      res.send({
        _id: signinUser._id,
        name: signinUser.name,
        email: signinUser.email,
        phone: signinUser.phone,
        repassword:signinUser.repassword,
        isAdmin: signinUser.isAdmin,
        token: generateToken(signinUser)
      })
    }
}));


router.post('/finduser/:id', expressAsyncHandler(async (req, res) => {
  const getuser = await User.findById(req.params.id);
  res.send(getuser);
}));


router.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      repassword: req.body.repassword,

    });
    const createdUser = await user.save();
    if (!createdUser) {
      res.status(401).send({
        message: 'Invalid User Data',
      });
    } else {
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        repassword: req.body.repassword,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    }
  })
);


router.put(
  '/:id',isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send({
        message: 'User Not Found',
      });
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.password = req.body.password || user.password;
      user.repassword = req.body.repassword || user.repassword;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);
export default router;
