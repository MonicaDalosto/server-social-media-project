const { Router } = require('express');
const Story = require('../models/').story;
const User = require('../models/').user;
const Favorite = require('../models').favorite;
const authMiddleware = require('../auth/middleware');

const router = new Router();

// http -v localhost:4000/favorites
router.get('/', async (request, response) => {
  try {
    response.send('Hello from Favorites');
  } catch (error) {
    console.log('error from Favorites: ', error.message);
  }
});

// http -v POST :4000/favorites userId=2 storyId=6 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1NjE2NjY1OSwiZXhwIjoxNjU2MTczODU5fQ.7wqdHru4D_kyXa-78XM379vRCmb-VkdC1ZYNcE9JZSc"
// http -v POST :4000/favorites userId=3 storyId=4 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY1NjIyNTI1NSwiZXhwIjoxNjU2MjMyNDU1fQ.j2GcnZ13c7U7_a3IC5gDOxy5_86gJL_pDFu9TmWL_rM"
router.post('/', authMiddleware, async (request, response, next) => {
  try {
    const { userId, storyId } = request.body;
    const newFavorite = await Favorite.create({
      userId,
      storyId
    });
    response.send(newFavorite);
  } catch (error) {
    console.log('error from favorite router: ', error.message);
    next(error);
  }
});

module.exports = router;
