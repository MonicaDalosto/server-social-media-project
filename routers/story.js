const { Router } = require('express');
const Story = require('../models/').story;
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

module.exports = router;
