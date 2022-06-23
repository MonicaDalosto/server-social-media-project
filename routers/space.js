const { Router } = require('express');
const Space = require('../models/').space;
const Story = require('../models/').story;

const router = new Router();

// http -v localhost:4000/spaces
router.get('/', async (request, response) => {
  try {
    const allSpaces = await Space.findAll();
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
// http -v POST :4000/spaces title="Monica's space" description=null userId=3
router.post('/', async (request, response, next) => {
  try {
    const { name, id } = request.body; // send the name and userId on thunks to create the mySpace:
    const newSpace = await Space.create({
      title: `${name}'s space`,
      description: null,
      userId: id
    });
    response.send(newSpace);
  } catch (error) {
    console.log('error from mySpace: ', error.message);
    next(error);
  }
});

module.exports = router;
