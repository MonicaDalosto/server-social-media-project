const bcrypt = require('bcrypt');
const { Router } = require('express');
const { toJWT } = require('../auth/jwt');
const authMiddleware = require('../auth/middleware');
const User = require('../models/').user;
const Space = require('../models/').space;
const Story = require('../models/').story;
const Favorite = require('../models/').favorite;
const { SALT_ROUNDS } = require('../config/constants');

const router = new Router();

router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .send({ message: 'Please provide both email and password' });
    }

    //  Feature 4: when the login occur the endpoint will send all the information about the user, includes Space
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return response.status(400).send({
        message: 'User with that email not found or password incorrect'
      });
    }

    delete user.dataValues['password']; // don't send back the password hash
    const token = toJWT({ userId: user.id });

    const { id } = user.dataValues;

    const mySpace = await Space.findOne({
      where: { userId: id },
      include: [Story]
    });

    const myFavorites = await Favorite.findAll({
      where: { userId: id },
      include: [Story]
    });

    const fullUser = { ...user.dataValues, mySpace, myFavorites };

    return response.status(200).send({ token, user: fullUser });
    // return response.status(200).send({ token, user: user.dataValues }); // previous code from the template;
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ message: 'Something went wrong, sorry' });
  }
});

router.post('/signup', async (request, response) => {
  const { email, password, name } = request.body;
  if (!email || !password || !name) {
    return response
      .status(400)
      .send('Please provide an email, password and a name');
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name
    });

    delete newUser.dataValues['password']; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    response.status(201).json({ token, user: newUser.dataValues });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return response
        .status(400)
        .send({ message: 'There is an existing account with this email' });
    }

    return response
      .status(400)
      .send({ message: 'Something went wrong, sorry' });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get('/me', authMiddleware, async (request, response) => {
  // don't send back the password hash
  delete request.user.dataValues['password'];

  const { id } = request.user.dataValues;

  const mySpace = await Space.findOne({
    where: { userId: id },
    include: [Story]
  });

  const myFavorites = await Favorite.findAll({
    where: { userId: id },
    include: [Story]
  });

  const fullUser = { ...request.user.dataValues, mySpace, myFavorites };

  // const fullUser = { ...request.user.dataValues, mySpace };

  // response.status(200).send({ ...request.user.dataValues }); // previous code from template
  response.status(200).send(fullUser);
});

module.exports = router;
