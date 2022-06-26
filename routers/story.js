const { Router } = require('express');
const Story = require('../models/').story;
const User = require('../models/').user;
const Favorite = require('../models').favorite;
const authMiddleware = require('../auth/middleware');

const router = new Router();

// http -v localhost:4000/spaces
router.get('/', async (request, response) => {
  try {
    const allStories = await Story.findAll();
    response.send(allStories);
  } catch (error) {
    console.log('error from all stories: ', error.message);
  }
});

// http -v POST :4000/stories name="Cool Story" content="Some cool story from Codaisseur final assesment on class 59" imageUrl="https://coursereport-production.imgix.net/uploads/school/logo/426/original/codaisseur-square.png?w=200&h=200&dpr=1&q=75" spaceId=1
router.post('/', authMiddleware, async (request, response, next) => {
  try {
    const { name, content, imageUrl, spaceId } = request.body;
    const newStory = await Story.create({
      name,
      content,
      imageUrl,
      spaceId
    });
    response.send(newStory);
  } catch (error) {
    console.log('error from Story router: ', error.message);
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params; // the value is from the thunk;
    const storyToDelete = await Story.findByPk(Number(id));

    if (!storyToDelete) {
      // console.log('Story not found!');
      return response.status(404).send('Story not found!');
    }

    await storyToDelete.destroy();

    return response.status(204).send('Story terminated');
  } catch (error) {
    console.log('error from the delete endpoint: ', error);
    next(error);
  }
});

// The favorites post has been moved to the favorite.js
// http -v POST :4000/stories/favorites userId=2 storyId=6 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1NjE2NjY1OSwiZXhwIjoxNjU2MTczODU5fQ.7wqdHru4D_kyXa-78XM379vRCmb-VkdC1ZYNcE9JZSc"
// router.post('/favorites', authMiddleware, async (request, response, next) => {
//   try {
//     const { userId, storyId } = request.body;
//     const newFavorite = await Favorite.create({
//       userId,
//       storyId
//     });
//     response.send(newFavorite);
//   } catch (error) {
//     console.log('error from favorite router: ', error.message);
//     next(error);
//   }
// });

module.exports = router;
