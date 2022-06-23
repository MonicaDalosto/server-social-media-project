const { Router } = require('express');
const Space = require('../models/').space;
const Story = require('../models/').story;

const router = new Router();

// http -v localhost:4000/spaces
router.get('/', async (request, response) => {
  try {
    const allSpaces = await Space.findAll({ include: [Story] });
    console.log('all spaces: ', allSpaces);
    response.send(allSpaces);
  } catch (error) {
    console.log('error from all spaces: ', error.message);
  }
});

module.exports = router;
