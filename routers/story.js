const { Router } = require('express');
const Story = require('../models/').story;

const router = new Router();

// http -v localhost:4000/spaces
router.get('/', async (request, response) => {
  try {
    const allStories = await Story.findAll();
    console.log('all spaces: ', allStories);
    response.send(allStories);
  } catch (error) {
    console.log('error from all stories: ', error.message);
  }
});

module.exports = router;
