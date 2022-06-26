const { Router } = require('express');
const Story = require('../models/').story;
const User = require('../models/').user;
const Favorite = require('../models').favorite;
const authMiddleware = require('../auth/middleware');

const router = new Router();

// http -v localhost:4000/favorites
router.get('/', async (request, response) => {
  try {
    const allMyFavorites = await Favorite.findAll();
    response.send(allMyFavorites);
  } catch (error) {
    console.log('error from Favorites: ', error.message);
  }
});

// http -v localhost:4000/favorites/myfavorites/1 get all favorites from the specific user
router.get('/myfavorites/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const allMyFavorites = await Favorite.findAll({
      where: { userId: id },
      include: [Story]
    });
    response.send(allMyFavorites);
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

// http -v DELETE :4000/favorites userId=3 storyId=3 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY1NjI0ODMzOSwiZXhwIjoxNjU2MjU1NTM5fQ.HQ_vUVeR7lfDKqikv5sj-VZ4jGaIfNXkFJWPxTx5A7A"
router.delete('/', authMiddleware, async (request, response, next) => {
  try {
    const { userId, storyId } = request.body;
    console.log('data inside the endpoint: ', userId, storyId);
    const storyToDelete = await Favorite.findOne({
      where: { userId: userId, storyId: storyId }
    });

    if (!storyToDelete) {
      return response.status(404).send('Story not found!');
    }

    await storyToDelete.destroy();

    return response.status(204).send('Story terminated');
  } catch (error) {
    console.log('error from the delete endpoint: ', error);
    next(error);
  }
});

module.exports = router;
