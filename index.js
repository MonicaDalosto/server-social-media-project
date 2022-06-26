const express = require('express');
const corsMiddleWare = require('cors');
// Auth middleware: our own code. Checks for the existence of a token in a header called `authentication`.
const authMiddleWare = require('./auth/middleware');
const authRouter = require('./routers/auth');
const spaceRouter = require('./routers/space');
const storyRouter = require('./routers/story');
const favoriteRouter = require('./routers/favorite');
const bidRouter = require('./routers/bid');
const { PORT } = require('./config/constants');

// Create an express app
const app = express();

/**
 * Middlewares
 *
 * It is advisable to configure your middleware before configuring the routes
 * If you configure routes before the middleware, these routes will not use them
 *
 */

// CORS middleware:  * Since our api is hosted on a different domain than our client
// we are are doing "Cross Origin Resource Sharing" (cors)
// Cross origin resource sharing is disabled by express by default
app.use(corsMiddleWare());

// express.json():be able to read request bodies of JSON requests a.k.a. body-parser
const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 * Routes
 *
 * Define your routes and attach our routers here (now that middlewares are configured)
 */

app.use('/auth', authRouter);
app.use('/spaces', spaceRouter);
app.use('/stories', storyRouter);
app.use('/favorites', favoriteRouter);
app.use('/bids', bidRouter);

// POST endpoint which requires a token for testing purposes, can be removed
app.post('/authorized_post_request', authMiddleWare, (request, response) => {
  // accessing user that was added to req by the auth middleware
  const user = request.user;
  // don't send back the password hash
  delete user.dataValues['password'];

  response.json({
    youPosted: {
      ...request.body
    },
    userFoundWithToken: {
      ...user.dataValues
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
