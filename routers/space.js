const { Router } = require('express');
const Space = require('../models/').space;
const Story = require('../models/').story;
const authMiddleware = require('../auth/middleware');

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

// http -v PUT :4000/spaces/4 title="Funny Stories" description="Just some funny stories of my life" backgroundColor="#422929" color="#eee2e2"
router.put('/:id', authMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params; // receive the space id from the thunks
    const { title, description, backgroundColor, color } = request.body;

    const mySpace = await Space.findByPk(id);

    const mySpaceUpdated = await mySpace.update({
      title,
      description,
      backgroundColor,
      color
    });
    response.send(mySpaceUpdated);
  } catch (error) {
    console.log('error from Updating my Space endPoint: ', error.message);
    next(error);
  }
});

module.exports = router;
