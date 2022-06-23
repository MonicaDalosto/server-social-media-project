const { Router } = require('express');
const Space = require('../models/').space;
const Story = require('../models/').story;

const router = new Router();

// http -v localhost:4000/spaces
router.get('/', async (request, response) => {
  try {
    const allSpaces = await Space.findAll();
    console.log('all spaces: ', allSpaces);
    response.send(allSpaces);
  } catch (error) {
    console.log('error from all spaces: ', error.message);
  }
});

router.get('/details/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const spaceById = await Space.findByPk(id, { include: [Story] });
    response.send(spaceById);
  } catch (error) {
    console.log('error from space by id: ', error.message);
    next(error);
  }
});

module.exports = router;
